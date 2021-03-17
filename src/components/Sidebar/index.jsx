import React, { useContext } from 'react'
import Suggestions from './Suggestions'
import User from './User'
import LoggedInUserContext from '../../context/logged-in-user'

const Sidebar = () => {
    const {user:{fullName, username, userId, following, docId=""}={}} = useContext(LoggedInUserContext)
    return (
        <div p="p-4">
            <User fullName={fullName} username={username} />
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/>
        </div>
    )
}

export default Sidebar
