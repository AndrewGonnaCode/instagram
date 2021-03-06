import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../../services/firebase'


const SuggestedProfile = ({profileDocId, username, profileId, userId, loggedInUserDocId}) => {
    const [followed, setFollowed] = useState(false)

    async function handleFollowUser(){
        setFollowed(true)
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false)
        await updateFollowedUserFollowers(profileDocId, userId, false)
    }

    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img src={`/images/avatars/${username}.jpg`} alt="" className="rounded-full w-8 flex mr-3"/>
                <Link to={`/p/${username}`}>
                   <p className="font-bold text-sm">{username}</p>
                </Link>
            </div>
            <button onClick={()=>handleFollowUser()} type="button" className="text-xs font-bold text-blue-medium">
                Follow
            </button>
        </div>
    ):null
}

export default SuggestedProfile

SuggestedProfile.propTypes = {
    profileDocId:PropTypes.string.isRequired,
    username:PropTypes.string.isRequired,
    profileId:PropTypes.string.isRequired,
    userId:PropTypes.string.isRequired,
    loggedInUserDocId:PropTypes.string.isRequired
}