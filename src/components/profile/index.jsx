import React, { useContext, useEffect, useReducer } from 'react'
import { getUserPhotosByUserId } from '../../services/firebase'
import Header from './header'
import PropTypes from 'prop-types'
import Photos from './Photos'
import UserContext from '../../context/user'

export const initialState = {
    profile:{},
    photosCollection:[],
    followerCount:0,
}

export const reducer = (state, newState) =>({...state, ...newState})

const UserProflie = ({user}) => {

    const {user:{uid:userId = ''}} = useContext(UserContext)

    
    const [{profile, photosCollection, followerCount}, dispatch] = useReducer(reducer, initialState)

    useEffect(()=>{
            async function getProfileInfoAndPhotos(){
                const photos = await getUserPhotosByUserId(user.userId, userId)
                dispatch({profile:user, photosCollection:photos, followerCount:user.followers?.length})
                
            }
                 getProfileInfoAndPhotos()        
    },[user.username])
     
    return (
        <div>
            <Header 
            profile={profile} 
            photosCount={photosCollection ? photosCollection.length : 0}
            followerCount={followerCount}
            setFollowerCount={dispatch}/>
            <Photos photos={photosCollection}/>
        </div>
    )
}

export default UserProflie


UserProflie.propTypes = {
    user:PropTypes.shape({
        dateCreated:PropTypes.number.isRequired,
        emailAddress:PropTypes.string.isRequired,
        followers:PropTypes.array.isRequired,
        following:PropTypes.array.isRequired,
        fullName:PropTypes.string.isRequired,
        userId:PropTypes.string.isRequired,
        username:PropTypes.string.isRequired
    }).isRequired
}