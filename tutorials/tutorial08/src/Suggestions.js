// The job of Suggestions is to display suggestions
//also follows and unfollows users

import React from 'react';
import { useState, useEffect } from "react";
import {getHeaders} from './utils';
import Suggestion from './Suggestion';

export default function Suggestions({token}) {
    // some logic here:
    const [suggestions, setSuggestions] = useState(null);

    useEffect(() => {
        async function fetchSuggestions() {
            const response = await fetch('/api/suggestions', {
                headers: getHeaders(token)
            });
            const data = await response.json();
            setSuggestions(data)
        }
        fetchSuggestions();
    }, [token]);


    if(!suggestions){
        return(
            <div>where my suggestions at</div>
        )
    }
    console.log("suggestions: ", suggestions)

    // return some JSX
    // return (
    //     <div className="suggestions">
    //         <div>
    //             Suggestions go here...
    //         </div>
    //     </div>
    // )

    return(
        <div className='suggestions'> 
            { 
            suggestions.map(suggestion =>  <Suggestion key={suggestion.id} suggestion={suggestion} token={token}/> )
            }
        </div>
    )
}