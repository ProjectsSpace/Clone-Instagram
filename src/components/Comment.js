import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    post__comments: {
        padding:'10px 20px'
    },
    comment__username: {
        paddingRight:'5px'
    }
}))

function Comment(props) {

    const classes = useStyles()

    return (
        <div className={classes.post__comments}>
            <p>
                <strong className={classes.comment__username}>{props.username}</strong>
                {props.text}
            </p>
        </div>
    )
}

export default Comment
