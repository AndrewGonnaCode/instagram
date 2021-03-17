import React, { useEffect, useReducer, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserByUserId } from '../../services/firebase'
import Actions from '../post/actions'
import AddComment from '../post/AddComment'

const PopUp = ({activePhoto, closePhoto}) => {

    const [comments, setComments] = useState(activePhoto.comments)
    const [author, setAuthor] = useState({})
    const inputRef = useRef(null)
    
    const handleFocus = () =>{
        inputRef.current.focus()
    }


    useEffect(()=>{
        async function getPhotoAuthor(){
            const [response] = await getUserByUserId(activePhoto.userId)
            setAuthor(response)
        } 
        if(activePhoto){
            getPhotoAuthor()
        }
       
    },[])

    return (
        <div className="absolute top-0 left-0 h-screen w-screen bg-black-faded grid place-items-center z-20">
            <div className="container flex  mx-auto max-w-screen-lg h-2/3">
            <img src={activePhoto.imageSrc} alt="" className="w-2/3 h-full object-cover"/>
               <div className="bg-gray-50 w-1/3 h-full">
                      <div className="flex flex-col h-full">
                          <div className="w-full flex align-items p-4 border-b border-gray-primary">
                          <Link to={`/p/${author?.username}`}>
                                <img className="w-14 h-14 object-cover rounded-full" src={`/images/avatars/${author?.username}.jpg`} alt=""/>
                         </Link>
                            <p className="mb-1 ml-4">
                                <span className="mr-1 font-bold">{author?.username}</span>
                                <span>{activePhoto.caption}</span>
                             </p>
                          </div>
                          <div className="flex flex-col border-b border-gray-primary flex-1">
                              {comments?.map(({comment, displayName})=>(
                                  <div className="w-full flex align-items p-4 ">
                                     <Link to={`/p/${displayName.toLowerCase()}`}>
                                         <img className="w-10 h-10 object-cover rounded-full" src={`/images/avatars/${displayName}.jpg`} alt=""/>
                                     </Link>
                                     <p className="mb-1 ml-4">
                                        <span className="mr-1 font-bold">{displayName}</span>
                                        <span>{comment}</span>
                                    </p>
                                  </div>
                              ))}
                          </div>
                          <Actions totalLikes={activePhoto.likes.length} handleFocus={handleFocus} docId={activePhoto.docId} likedPhoto={activePhoto.userLikedPhoto}/>
                          <AddComment docId={activePhoto.docId} comments={comments} commentInput={inputRef} setComments={setComments}/>
                      </div>
               </div>
            </div>
            <svg onClick={closePhoto} className="absolute w-8 text-white right-10 top-10 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
               <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
           </svg>
        </div>
    )
}

export default PopUp
