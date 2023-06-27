//bookmarks or unbookmarks post
import React from 'react';
import {getHeaders} from './utils';


export default function BookmarkButton({post, token, requeryPost}) {
    // some logic at the top:
    const bookmarkId = post.current_user_bookmark_id;
    const postId = post.id;

    async function bookmarkUnbookmark() {
        console.log(bookmarkId, postId);
        // if it's bookmarked, unbookmark it, else bookmark it
        if (bookmarkId) {
            console.log('unbookmark!')
            const response = await fetch(`/api/bookmarks/${bookmarkId}`, {
                method: "DELETE",
                headers: getHeaders(token)
            });
            const data = await response.json();
            console.log(data);
            requeryPost();
        } else {
            // code to like a post:
            console.log('bookmark!')
            const postData = {
                "post_id": postId
            };
            const response = await fetch("/api/bookmarks/", {
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
    if(bookmarkId){
        return (
            <button className="icon-button" aria-label="bookmark button" aria-checked="true" onClick={bookmarkUnbookmark}>
                <i class="fa-solid fa-bookmark"></i>
            </button>
        )
    }else{
        return (
            <button className="icon-button" aria-label="bookmark button" aria-checked="false" onClick={bookmarkUnbookmark}>
                <i class="far fa-bookmark"></i>
            </button>
        )
        }

}