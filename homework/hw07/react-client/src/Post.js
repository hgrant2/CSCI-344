// Job of this component is to display a post
// and to allow users to interact with the post

import React from 'react';
import LikeButton from './LikeButton';
import {getHeaders} from './utils';

import { useState } from "react";
import BookmarkButton from './BookmarkButton';
import Comments from './Comments';
import AddComment from './AddComment';

export default function Post({post, token}) {

    const [actualPost, setActualPost] = useState(post);


    async function requeryPost() {
        // get a fresh copy of the post
            const response = await fetch(`/api/posts/${post.id}`, {
            method: "GET",
            headers: getHeaders(token)
        });
        const data = await response.json();
        console.log(data);
        // to make the screen redraw after requerying the post,
        // we need to set a state variable:
        setActualPost(data);
    }

    
   
    // JSX representation of a Post
    return (
        <section className="card">
            <div className='header'>
                <h3>{actualPost.user.username}</h3>
                <button className='icon-button'>{<i class="fas fa-ellipsis-h"></i>}</button>
            </div>
            <img src={actualPost.image_url} alt={actualPost.caption} />
            <div className='info'>
                <div className='buttons'>
                    <div>
                        <LikeButton 
                        post={actualPost} 
                        token={token} 
                        requeryPost={requeryPost}/>
                        <button class="icon-button"><i class="far fa-comment"></i></button>
                        <button class="icon-button"><i class="far fa-paper-plane"></i></button>
                    </div>
                    <div>
                    <BookmarkButton 
                        post={actualPost} 
                        token={token} 
                        requeryPost={requeryPost}/>                    
                    </div>
                </div>
                <p className='likes'><strong>{actualPost.likes.length} likes</strong></p>
                <div className='caption'>
                    <p>
                        <strong>{actualPost.user.username}</strong>
                        {actualPost.caption}
                    </p>
                </div>
                <div className='comments'>
                <Comments 
                        post={actualPost} 
                        token={token} 
                        requeryPost={requeryPost}/>

                </div>
            </div>
            <AddComment 
                post={actualPost} 
                token={token} 
                requeryPost={requeryPost}/>
                
        </section> 
    )  
}