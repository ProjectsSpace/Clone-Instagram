import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'

function Post(props) {
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
            
            <h4 className="post_cap">
                <strong>{props.username}</strong>: &nbsp;
                {props.caption}
            </h4>
        </div>
    )
}

export default Post
