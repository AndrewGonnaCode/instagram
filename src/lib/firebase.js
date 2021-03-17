import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const config = {
    apiKey: "AIzaSyBZn9AMZ4CSi5rRbolf8Sb_bdfwbO3_Db8",
    authDomain: "instagram-clone-efbba.firebaseapp.com",
    projectId: "instagram-clone-efbba",
    storageBucket: "instagram-clone-efbba.appspot.com",
    messagingSenderId: "12827542875",
    appId: "1:12827542875:web:d5bb61441fb2f34646867e"
}

const firebase = Firebase.initializeApp(config)
const {FieldValue} = Firebase.firestore;



export {firebase, FieldValue}