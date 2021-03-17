import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useUser from '../../hooks/use-user'
import {isUserFollowingProfile, toggleFollow} from '../../services/firebase'
import Skeleton from 'react-loading-skeleton'
import LoggedInUserContext from '../../context/logged-in-user'
import UserContext from '../../context/user'

const Header = ({
    photosCount, 
    followerCount, 
    profile:{
        docId:profileDocId,
        userId:profileUserId,
        fullName, 
        following, 
        followers, 
        username:profileUsername}, 
    setFollowerCount}) => {
    
    const {user:loggedInUser} = useContext(UserContext)
    const [isFollowingProfile, setIsFollowingProfile] = useState(false)
    const {user} = useUser(loggedInUser?.uid)
    const activeBtnFollow = user?.username && user?.username !== profileUsername

    
    const handleToggleFollow = async() =>{
        setIsFollowingProfile((isFollowingProfile)=>!isFollowingProfile)
        setFollowerCount({
            followerCount:isFollowingProfile ? followerCount -1 : followerCount + 1
        })
        await toggleFollow(isFollowingProfile,user.docId,profileDocId,profileUserId, user.userId)
    }

    useEffect(()=>{
          const isLoggeInUserFollowingProfile = async () =>{
              const isFollowing = await isUserFollowingProfile(user.username, profileUserId)
              setIsFollowingProfile(!!isFollowing)
          }
    
          if(user?.username && profileUserId){
            isLoggeInUserFollowingProfile()
        }
        },[user?.username, profileUserId])

    return (
        <div className="grid grid-cols-3 mx-auto max-w-screen-lg gap-4 justify-between">
            <div className="container flex justify-center">
            {profileUsername ? (
          <img
            className="rounded-full h-40 w-40 flex object-cover"
            alt={`${fullName} profile picture`}
            src={`/images/avatars/${profileUsername}.jpg`}
          />
        ) : (
          <img
            className="rounded-full h-40 w-40 flex"
            alt={"Andrew Barabanow's profile picture"}
            src="/images/avatars/andrew.jpg"
          />
        )}
        </div>
            <div className="flex items-center justify-content flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">{profileUsername}</p>
                    {activeBtnFollow &&( 
                         <button className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                        type="button"
                        onClick={handleToggleFollow}
                         >
                            {isFollowingProfile ? 'Unfollow' : 'Follow'}
                        </button>)}
                </div>
                <div className="container flex mt-4">
                    {!followers || !following ? (
                        <Skeleton count={1} width={677} height={24}/>
                    ):(
                        <>
                        <p className="mr-10">
                            <span className="font-bold">{photosCount}</span> photos
                        </p>
                        <p className="mr-10">
                            <span className="font-bold">{followerCount}</span>{" "} 
                            {followerCount === 1 ? 'follower':'followers'}
                        </p>
                        <p className="mr-10">
                            <span className="font-bold">{following.length}</span> followings
                        </p>
                        </>
                    )}
                </div>
                <div className="container mt-4">
                    <p className="font-medium">
                        {!fullName ? <Skeleton count={1} height={24}/> : fullName}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Header


Header.propTypes = {
   photosCount:PropTypes.number.isRequired,
   followerCount:PropTypes.number.isRequired,
   setFollowerCount:PropTypes.func.isRequired,
   profile:PropTypes.shape({
       docId:PropTypes.string,
       userId:PropTypes.string,
       fullName:PropTypes.string,
       following:PropTypes.array,
       followers:PropTypes.array
   }).isRequired
}