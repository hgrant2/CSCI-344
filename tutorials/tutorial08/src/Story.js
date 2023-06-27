import React from 'react';
import {getHeaders} from './utils';

import { useState } from "react";

export default function Story({story, token}) {

    // const [singleStory, setSingleStory] = useState(story);


    // async function requeryStory() {
    //     // get a fresh copy of the post
    //         const response = await fetch(`/api/posts/${story.id}`, {
    //         method: "GET",
    //         headers: getHeaders(token)
    //     });
    //     const data = await response.json();
    //     console.log(data);
    //     // to make the screen redraw after requerying the post,
    //     // we need to set a state variable:
    //     setSingleStory(data);
    // }
   
    if(!story){
        return (
            <div>help</div>
        )
    }
    // JSX representation of a Post
    return (
        <div>
            <img src={story.user.thumb_url} className='pic'/>
            <p>{story.user.username}</p>
        </div> 
        // <div>is this running</div>
    )  
}