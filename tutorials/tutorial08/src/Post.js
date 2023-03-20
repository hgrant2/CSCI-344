// the job of this component is to display a post 
// and to allow user to interact with it
import React from 'react';

import { useState, useEffect } from "react";
import {getHeaders} from './utils';

export default function Post({post}) {
   
    return (
        <section key={post.id}>
            <img src={post.image_url} />
            <div className='card'>{post.caption}</div>
        </section>
    )
         
}