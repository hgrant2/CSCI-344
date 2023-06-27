// The job of Stories is to display stories.

import React from 'react';
import { useState, useEffect } from "react";
import {getHeaders} from './utils';
import Story from './Story';

export default function Stories({token}) {
    // logic here
    const [stories, setStories] = useState(null);

    useEffect(() => {
        async function fetchStories() {
            const response = await fetch('/api/stories', {
                headers: getHeaders(token)
            });
            const data = await response.json();
            setStories(data)
        }
        fetchStories();
    }, [token]);


    if(!stories){
        return(
            <div>this no beuno</div>
        )
    }

    if (stories.length === 0) {
        return <div id="stories"></div>
    }

    console.log("stories: ",stories)
    // return some JSX
    // return (
    //     <header className="stories">
    //         Stories go here...
    //     </header>
    // )

    return (
        stories.map(story =>  <Story key={story.id} story={story} token={token}/> )
    )     
}