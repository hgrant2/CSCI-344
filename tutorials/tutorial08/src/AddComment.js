//adds comments to post
import React, { useState } from 'react';
import {getHeaders} from './utils';


export default function AddComments({post, token, requeryPost}) {
    // some logic at the top:
    const [message, setMessage] = useState('')
    const postId = post.id;

    async function addComment() {
            console.log("current message in the input ", message)
            //add the comment
            const postData = {
                "post_id": postId,
                "text" : message
            };
            const response = await fetch("/api/comments/", {
                method: "POST",
                headers: getHeaders(token),
                body: JSON.stringify(postData)
            });
            const data = await response.json();
            console.log(data);

            requeryPost();
        }
    
    
        return (
        <div className='add-comment'>    
            <div className='input-holder'>
                    <i class="far fa-smile"></i>
                    {/* <input type="text" placeholder="Add a comment..."></input> */}
                    <textarea 
                    placeholder='Add Comment...'
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    ></textarea>

                </div>
                <button className='button' onClick={addComment}>Post</button>
        </div>
        )
        

}