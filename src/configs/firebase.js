import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCz0eJboWPI1t4zRHVfXEoBSeFgti0GRx0",
  authDomain: "clone-instagram-fc25e.firebaseapp.com",
  projectId: "clone-instagram-fc25e",
  storageBucket: "clone-instagram-fc25e.appspot.com",
  messagingSenderId: "64924702720",
  appId: "1:64924702720:web:3e1a98a14300872184a0e5",
  measurementId: "G-5DRPS5C2Q7"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {db,auth,storage}




