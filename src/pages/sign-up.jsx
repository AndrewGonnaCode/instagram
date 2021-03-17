import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import FirebaseContext from '../context/firebase'
import * as ROUTES from '../constants/routes'
import { doesUsernameExist } from '../services/firebase'

const Signup = () => {

    const history = useHistory()
    const [emailAddress, setEmailAddress] = useState('')
    const {firebase} = useContext(FirebaseContext)
    const [username, setUserName] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const isInvalid = password === '' || emailAddress === ''

    const handleSignup = async(e) =>{
        e.preventDefault()
        const userNameExists = await doesUsernameExist(username)
        if(!userNameExists.length){
        try {
            const createdUserResult = await firebase.auth()
            .createUserWithEmailAndPassword(emailAddress, password)

            await createdUserResult.user.updateProfile({
                displayName:username
            })
            await firebase.firestore().collection('users')
            .add({
                userId:createdUserResult.user.uid,
                username:username.toLowerCase(),
                fullName,
                emailAddress:emailAddress.toLowerCase(),
                following:[],
                followers:[],
                dateCreated:Date.now()
            })
            history.push(ROUTES.DASHBOARD)
        } catch (error) {
            setEmailAddress('')
            setPassword('')
            setFullName('')
            setError(error.message)
        }
    }else{
       setError('That username is already taken, please try another.')
    }
    }

    useEffect(()=>{
       document.title = 'Login - Sign-Up'
    },[])

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                 <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram"/>
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col bg-white items-center p-4 border border-gray-primary mb-4 rounded">
                <h1 className="flex justify-center w-full">
                    <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4"/>
                </h1>
                {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
                <form onSubmit={handleSignup} method="POST">
                <input 
                type="text"
                aria-label="Enter your userName"
                placeholder="Username"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({target})=>setUserName(target.value)}
                value={username}
                />
                <input 
                type="text"
                aria-label="Enter your fullName"
                placeholder="Full Name"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({target})=>setFullName(target.value)}
                value={fullName}
                />
                <input 
                type="text"
                aria-label="Enter your email address"
                placeholder="Email address"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({target})=>setEmailAddress(target.value)}
                value={emailAddress}
                />
                <input 
                type="password"
                aria-label="Enter your password"
                placeholder="Password"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({target})=>setPassword(target.value)}
                value={password}
                />
                <button
                 disabled={isInvalid}
                 type="submit"
                 className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}
                >Sign Up</button>
            </form>
            </div>
            <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
                <p className="text-sm">Have an account?{" "}
                 <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">Log In</Link>
                </p>
            </div>
            </div>
        </div>
    )
}

export default Signup
