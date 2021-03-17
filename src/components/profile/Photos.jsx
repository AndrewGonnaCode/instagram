import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import PopUp from './PopUp'



const Photos = ({photos}) => {

    const [isPhotoShown, setIsPhotoShown] = useState(false)
    const [activePhoto, setActivePhoto] = useState({})

      function showPhoto(photoDetails){
        setActivePhoto(photoDetails)
        setIsPhotoShown(true)
    }

    const closePhoto = () =>{
        setIsPhotoShown(false)
    }
     

    return (
        <div className="h-16 border-t border-gray-primary mt-12 pt-4">
            <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
                {!photos ? (
                    <>
                      <Skeleton count={12} width={320} height={400}/>
                    </>
                ): photos.length > 0 ? (
                    photos.map((photo)=>(
                        <>
                        <div key={photo.docId} className="relative group"  onClick={()=>showPhoto(photo)}>
                           <img src={photo.imageSrc} alt={photo.caption}/>
                           <div className="absolute bottom-0 left-0  z-10 w-full h-full justify-evenly items-center bg-black-faded group-hover:flex cursor-pointer hidden">
                               <p className="flex items-center text-white font-bold">
                               <svg className="w-8 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                               </svg>
                               {photo.likes.length}
                               </p>
                               <p className="flex items-center font-bold text-white">
                                   <p>
                                   <svg  className="w-8 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                       <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
                                  </svg>
                                   </p>
                               {photo.comments.length}
                               </p>
                           </div>
                        </div>
                        {isPhotoShown && <PopUp activePhoto={activePhoto} closePhoto={closePhoto}/>}
                        </>
                    ))
                ):null}
            </div>
            {!photos || photos.length === 0 && <p className="text-center text-2xl">No Posts Yet</p>}
        </div>
    )
}

export default Photos
