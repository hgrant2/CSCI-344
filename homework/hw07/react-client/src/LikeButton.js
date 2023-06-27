//likes and unlikes post
import React from 'react';
import {getHeaders} from './utils';


export default function LikeButton({post, token, requeryPost}) {
    // some logic at the top:
    const likeId = post.current_user_like_id;
    const postId = post.id;

    async function likeUnlike() {
        console.log(likeId, postId);
        // if it's liked, unlike it, else like it
        if (likeId) {
            console.log('unlike!')
            const response = await fetch(`/api/posts/likes/${likeId}`, {
                method: "DELETE",
                headers: getHeaders(token)
            });
            const data = await response.json();
            console.log(data);
            requeryPost();
        } else {
            // code to like a post:
            console.log('like!')
            const postData = {
                "post_id": postId
            };
            const response = await fetch("/api/posts/likes/", {
                method: "POST",
                headers: getHeaders(token),
                body: JSON.stringify(postData)
            });
            const data = await response.json();
            console.log(data);
            requeryPost();
        }
    }

    // return some JSX:
    // return (
    //     <button className='icon-button' onClick={likeUnlike}>{likeId ? <i class="fa-solid fa-heart"></i> : <i class="far fa-heart"></i>}</button>
    // )
    if(likeId){
        return (
            <button className="icon-button-liked" aria-label="like button" aria-checked="true" onClick={likeUnlike}>
                <i class="fa-solid fa-heart"></i>
            </button>
        )
    }else{
        return (
            <button className="icon-button" aria-label="like button" aria-checked="false" onClick={likeUnlike}>
                <i class="far fa-heart"></i>
            </button>
        )
        }

}