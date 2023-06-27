//displays all of the suggestions
import React from 'react';
import {getHeaders} from './utils';
import { useState } from "react";

export default function Suggestion({suggestion, token}) {

    const [following, setFollowing] = useState(null);

    let followId = null;
    const suggestionId = suggestion.id;

    async function followUnfollow() {
        if (following) {
            console.log('unfollow!')
            const response = await fetch(`/api/following/${following}`, {
                method: "DELETE",
                headers: getHeaders(token)
            });
            const data = await response.json();
            console.log(data);
            requeryFollowButton();
        } else {
            // code to like a post:
            console.log('follow!')
            const postData = {
                "user_id": suggestionId
            };
            const response = await fetch("/api/following", {
                method: "POST",
                headers: getHeaders(token),
                body: JSON.stringify(postData)
            });
            const data = await response.json();
            console.log(data);
            followId = data.id
            requeryFollowButton();
        }
    }

    async function requeryFollowButton() {
        if(following){
            setFollowing(null);
        }else{
            setFollowing(followId);
        }
    }
   
    if(!Suggestion){
        return (
            <div>no suggestion</div>
        )
    }
    // JSX representation of a Post

    if(following){
        return (
            <section>
                    <img src={suggestion.thumb_url} className='pic'/>
                    <div>
                        <p className='username'>{suggestion.username}</p>
                        <p>suggested for you</p>
                    </div>
                    <button className='button' onClick={followUnfollow}>Unfollow</button>
                    
                </section>
            // <div>is this running</div>
        ) 
    }else{
        return (
            <section>
                <img src={suggestion.thumb_url} className='pic'/>
                <div>
                    <p className='username'>{suggestion.username}</p>
                    <p>suggested for you</p>
                </div>
                <button className='button' onClick={followUnfollow}>Follow</button>
                
            </section>
            // <div>is this running</div>
        )  
    }
}