// The job of Profile is to show the image and username
// of the person who is logged into the system:
// TODO: assume the the user is passed into this component as a prop:


import React from 'react';

export default function Profile({profile}) {
    // some logic here:
    console.log(profile);


    // return some JSX
    if (!profile) {
        return(
            <div></div>
        );
    }
    return (
        <aside>
            <header>
                <img src={profile.thumb_url} className='pic'/>
                <h2>{profile.username}</h2>
            </header>
        </aside>    
    )
}