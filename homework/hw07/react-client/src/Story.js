//displays singular stories
import React from 'react';
import {getHeaders} from './utils';

import { useState } from "react";

export default function Story({story, token}) {

   
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