import React, { useState } from 'react'
import PropTypes from 'prop-types';
import {formatDistance} from 'date-fns'
import { Link } from 'react-router-dom';
import AddComment from './AddComment';

const Comments = ({comments:allComments, docId, posted,commentInput}) => {
    const [allCommentsShown, setAllCommentsShown] = useState(false)
    const [comments, setComments] = useState(allComments)
    let commentsShown = allCommentsShown ? (comments.length) : 3
    return (
        <>
        <div className="p-4 pt-1 pb-4">
            {comments.length > 3 && (
                <p className="text-sm text-gray-base mb-1 cursor-pointer" onClick={()=>setAllCommentsShown(!allCommentsShown)}>{allCommentsShown ? 'Less' : 'View All comments'}</p>
            )}
            {comments.slice(0,commentsShown).map((item)=>(
                <p key={`${item.comment}-${item.displayName}`} className="mb-1">
                    <Link to={`/p/${item.displayName}`}>
                       <span className="mr-1 font-bold">{item.displayName}</span>
                    </Link>
                    <span>{item.comment}</span>
                </p>
            ))}
            <p className="text-gray-base uppercase text-xs mt-2">{formatDistance(posted, new Date())} ago</p>
        </div>
        <AddComment
         docId={docId}
         comments={comments}
         setComments={setComments}
         commentInput={commentInput}
        />
        </>
    )
}

export default Comments


Comments.propTypes = {
    docId:PropTypes.string.isRequired,
    posted:PropTypes.string.isRequired,
    commentInput:PropTypes.object.isRequired,
    comments:PropTypes.array.isRequired
}