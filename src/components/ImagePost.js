import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

import firebase from 'firebase'
import {storage,db} from '../configs/firebase'
import { LinearProgress } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  image__upload: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px'
  },
  input__holder: {
    width: '600px',
    padding: '20px',
    background: '#fafafa',
    boxShadow: '5px 5px 10px #e7e7e7, -5px -5px 10px #f5f5f5',
    borderRadius: '10px',
  },
  caption__upload: {
      width:"100%",
      marginBottom:'15px',

  },
  file__upload: {
      width:"100%",
      marginBottom:'15px'
  },
  button__upload: {
      width:"100%"
  },
}))

function ImagePost({displayName}) {
    const classes = useStyles()
    const [caption,setCaption] = useState('')
    const [progress,setProgress] = useState(0)
    const [image,setImage] = useState(null)
    const [showProgressBar, setShowProgressBar] = useState(false)

    function fileUpload(e) {
        setShowProgressBar(true)
        if(e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    function handleCaption (e) {
        setCaption(e.target.value)
    }

    function handlePost() {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        
        // getting the upload status while the image is uploading
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            (error) => {
                // error function
                console.log(error)
            },
            () => {
                // completion function
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imgUrl: url,
                            username: displayName
                        })

                        setProgress(0)
                        setCaption('')
                        setImage(null)
                        setShowProgressBar(false)
                    })
            }
        )   
    }

    return (
        <div className={classes.image__upload}>
            <div className={classes.input__holder}>
                {showProgressBar && <LinearProgress variant="determinate" value={progress} max="100" />}
                <TextField className={classes.caption__upload} onChange={handleCaption} value={caption} id="standard-basic" label="Enter Caption" />
                <Input className={classes.file__upload} onChange={fileUpload} type="file" />
                <Button className={classes.button__upload} onClick={handlePost} variant="contained" color="primary"> Post Image </Button>
            </div>
        </div>
    )
}

export default ImagePost
