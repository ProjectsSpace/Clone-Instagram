import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { db } from '../configs/firebase'
import firebase from 'firebase'

const useStyles = makeStyles(() => ({
  comment__box: {
    display:'flex',
    alignItems: 'center',
    padding: '0 20px 10px'
  },
  comment__input: {
    flex:'1',
    paddingRight:'5px',
  },
  commnet__button: {
    flex: '0',
  }
}))

function CommentField({postID}) {
    const classes = useStyles()

    const [comment,setComment] = useState('')
    const [displayName,setDisplayName] = useState('')

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            setDisplayName(user?.displayName)
        } else {
            // No user is signed in.
        }
    })

    function postComment (e) {
        e.preventDefault()

        comment && db.collection('posts')
            .doc(postID)
            .collection('comments')
            .add({
                text: comment,
                username: displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        setComment('')
    }

    return (
        <form className={classes.comment__box}>
            <TextField value={comment} placeholder="Comment" onChange={(e) => setComment(e.target.value)} className={classes.comment__input} id="standard-basic"/>
            <Button color="primary" type="submit" onClick={postComment} className={classes.comment__button} variant="outlined">Comment</Button>
        </form>
    )
}

export default CommentField
