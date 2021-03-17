import React, { useContext, useState } from 'react'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'
import PropTypes from 'prop-types';

const AddComment = ({docId, comments, setComments, commentInput}) => {
    const [comment, setComment] = useState('')
    const {firebase, FieldValue} = useContext(FirebaseContext)
    const {user:{displayName}} = useContext(UserContext)

    const handleSubmit = e => {
        e.preventDefault()
        setComments([...comments,{displayName, comment}])
        setComment('')
        return firebase
        .firestore()
        .collection('photos')
        .doc(docId)
        .update({
            comments:FieldValue.arrayUnion({displayName, comment})
        })
    }

    return (
        <div className="border-t border-gray-primary">
            <form className="flex justify-between pl-0 pr-5" method="POST" onSubmit={(e)=>comment.length >=1 ? handleSubmit(e) : e.preventDefault()}>
                <input 
                type="text" 
                aria-label="Add a comment" 
                autoComplete="off" 
                className="text-sm text-gray-base w-full outline-none mr-3 py-5 px-4"
                name="add-comment" 
                placeholder="Add a comment..." 
                value={comment} 
                onChange={({target})=>setComment(target.value)}
                ref={commentInput}
                />
                <button className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
                  type="button"
                  disabled={comment.length < 1}
                  onClick={handleSubmit}
                >
                    Post
                </button>
            </form>
        </div>
    )
}

export default AddComment

// AddComment.propTypes = {
//     docId: PropTypes.string.isRequired,
//     comments:PropTypes.array.isRequried,
//     setComments:PropTypes.func.isRequired,
//     commentInput:PropTypes.object.isRequired
// }