//displays comments in correct format based on num of comments on post
import React from 'react';
import {getHeaders} from './utils';


export default function commentSection({post, token, requeryPost}) {
    // some logic at the top:
    const commentNum = post.comments.length;


    let commentHTML = ``;
        for(let i = 0; i < commentNum; i++){
            const comment = ` 
            <div class="row">
                <p>
                    <strong>${post.comments[i].user.username}</strong> 
                    ${post.comments[i].text}
                </p>
                <p class="timestamp">${post.display_time}</p>
            </div>`;

            commentHTML = commentHTML.concat(comment);
        }

    if(commentNum == 1){
        return(
            <div className='row'>
                <p>
                    <strong>
                        {post.comments[0].user.username}
                    </strong>
                    {post.comments[0].text}
                </p>
            </div>
        )
    }

    if(commentNum > 1){
        return (
            <div>
                <button className='view-comment-button'><strong>view all {commentNum} comments</strong></button>
                <div className='row'>
                    <p>
                        <strong>
                            {post.comments[commentNum-1].user.username}
                        </strong>
                        {post.comments[commentNum-1].text}
                    </p>
                </div>
                <p class="timestamp">{post.display_time}</p>
            </div>
        )
    }
    // return some JSX:
    return (
            <div></div>
        )
    

}