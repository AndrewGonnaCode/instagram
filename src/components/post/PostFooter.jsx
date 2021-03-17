import React from 'react'
import PropTypes from 'prop-types';

const PostFooter = ({username, caption}) => {
    return (
        <div className="p-4 pt-2 pb-0 mb-4">
            <span className="mr-1 font-bold">{username}</span>
            <span>{caption}</span>
        </div>
    )
}

export default PostFooter

PostFooter.propTypes = {
    username: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
}