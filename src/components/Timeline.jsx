import React, { useContext } from 'react'
import Skeleton from 'react-loading-skeleton'
import LoggedInUserContext from '../context/logged-in-user'
import usePhotos from '../hooks/use-photos'
import Post from './post'

const Timeline = () => {
    const {user} = useContext(LoggedInUserContext)
    const {photos} = usePhotos(user)
    return (
        <div className="container col-span-2">
            {!photos ? (            
                      <Skeleton count={4} width={640} height={500} className="mb-4"/>                             
            ):photos?.length > 0 ? (
                photos.map((content)=><Post key={content.docId} content={content}/>)
            ):<p className="text-center text-2xl">Follow people to see photos</p>}
        </div>
    )
}

export default Timeline
