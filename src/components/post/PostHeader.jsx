import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const PostHeader = ({username}) => {
    return (
        <div className="flex border-b border-gray-primary h-4 p-4 py-8">
        <div className="flex items-center">
            <Link to={`/p/${username}`} className="flex items-center">
               <img src={`/images/avatars/${username}.jpg`} alt="" className="rounded-full w-8 h-8 mr-3 flex object-cover"/>
            </Link>
            <p className="font-bold">{username}</p>
        </div>
        </div>
    )
}

export default PostHeader


PostHeader.propTypes = {
    username:PropTypes.string.isRequired
}