import React from 'react';
import {getHeaders} from './utils';
import { useState } from "react";

export default function Suggestion({suggestion, token}) {

    const [singleSuggestion, setSingleSuggestion] = useState(suggestion);


    // async function requerySuggestion() {
    //     // get a fresh copy of the post
    //         const response = await fetch(`/api/posts/${suggestion.id}`, {
    //         method: "GET",
    //         headers: getHeaders(token)
    //     });
    //     const data = await response.json();
    //     console.log(data);
    //     // to make the screen redraw after requerying the post,
    //     // we need to set a state variable:
    //     setSingleStory(data);
    // }
   
    if(!Suggestion){
        return (
            <div>no suggestion</div>
        )
    }
    // JSX representation of a Post
    return (
        <section>
            <img src={suggestion.thumb_url} className='pic'/>
            <div>
                <p className='username'>{suggestion.username}</p>
                <p>suggested for you</p>
            </div>
            <button className='button'>Follow</button>
            
        </section>
        // <div>is this running</div>
    )  
}