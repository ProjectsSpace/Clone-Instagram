import React, { useEffect, useState } from 'react'
import {db} from '../configs/firebase'
import firebase from 'firebase'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'
import CommentField from './CommentField'
import Comment from './Comment'

function Post(props) {
    const [comments,setComments] = useState([])
    const [userLogged,setUserLogged] = useState('')

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          setUserLogged(user)
      } else {
          // No user is signed in.
      }
    })

    useEffect(() => {
        let unsubscribe;
        if (props.postID) {
            unsubscribe = db
                .collection('posts')
                .doc(props.postID)
                .collection('comments')
                .orderBy('timestamp','desc')
                .onSnapshot(snapshot => {
                    setComments(snapshot.docs.map(doc => doc.data()))
                })
        }

        return () => {
            unsubscribe()
        }
    },[props.postID])

    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                    alt={props.username}
                    src="/static/images/avatar/3.jpg" 
                />
                <h3>{props.username}</h3>
            </div>

            <img 
                className="post__image" 
                src={props.imgUrl} 
                alt=""
            />
            
            <p className="post_cap">
                <strong>{props.username}</strong>: &nbsp;
                {props.caption}
            </p>

            <div className="comments__box">
                {
                    comments.map(comment => (
                        <Comment 
                            key={comment.id} 
                            username={comment.username} 
                            text={comment.text}
                        />
                    ))
                }
            </div>

            {userLogged && <CommentField postID={props.postID}/>}

        </div>
    )
}

export default Post
