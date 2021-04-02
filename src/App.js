import React,{useEffect, useState} from 'react'
import firebase from 'firebase'
import {db} from './configs/firebase'
import './App.css'

import Header from './components/Header'
import ImagePost from './components/ImagePost'
import Post from './components/Post'

function App() {

  const [posts,setPosts] = useState([])
  const [displayName,setDisplayName] = useState('')

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          setDisplayName(user?.displayName)
      } else {
          // No user is signed in.
      }
    })

  // Getting data from database to the state
  useEffect(() => {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data(),
      })))
    })
  },[])

  return (
    <div className="app">
      <Header />

      {
        displayName ? <ImagePost displayName={displayName} /> :
        <h3 style={{textAlign:'center',padding:'20px 10px'}}>Login to post</h3>
      }

      {/* Looping through posts */}
      {
        posts.map(({id,post}) => (
          <Post 
            key={id}
            postID={id}
            username= {post.username}
            caption= {post.caption}
            imgUrl= {post.imgUrl}
          />
        ))
      }
      {/* ./Looping through posts */}
 
    </div>
  )
}

export default App
