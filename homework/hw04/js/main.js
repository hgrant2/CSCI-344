import {getAccessToken} from './utilities.js';
const rootURL = 'https://photo-app-secured.herokuapp.com';

let token ;


//TODO
// I was working on the following and unfollowing.
// as of right now I believe I access this in suggestions.
// find a way to say the following data so I know how to access it.


/**
 * Helper function to replace a DOM element.
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild
 * 
 *  Arguments: 
 *     1. selector: the selector you want to target (string)
 *     2. newHTML:  the HTML you want to replace
 */
window.targetElementAndReplace = (selector, newHTML) => { 
	const div = document.createElement('div'); 
	div.innerHTML = newHTML;
	const newEl = div.firstElementChild; 
    const oldEl = document.querySelector(selector);
    oldEl.parentElement.replaceChild(newEl, oldEl);
}


const showStories = async (token) => {
    const endpoint = `${rootURL}/api/stories`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log('Stories:', data);
    const htmlChunk = data.map(storyToHtml).join('');
    document.querySelector('.stories').innerHTML = htmlChunk;
}

const storyToHtml = story => {
    return `<div>
        <img src="${story.user.thumb_url}" class="pic" />
        <p>${story.user.username}</p>
    </div>
    `
}

const showRightPanel = async (token) => {
    const endpoint = `${rootURL}/api/profile`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log('Right Panel:', data);
   const htmlChunk = `<img src="${data.thumb_url}" class="pic" />
   <h2>${data.username}</h2>`;
    document.querySelector('aside header').innerHTML = htmlChunk;
}

const showSuggestions = async (token) => {
    const endpoint = `${rootURL}/api/suggestions`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log('Suggestions Panel:', data);
    const htmlChunk = data.map(suggestionsToHtml).join(``);
    document.querySelector('.suggestions').innerHTML = htmlChunk;
}

const suggestionsToHtml = suggestion => {
return `<section id="suggestion_${suggestion.id}">
            <img src="${suggestion.thumb_url}" class="pic" />
            <div>
                <p class="username">${suggestion.username}</p>
                <p>suggested for you</p>
             </div>
            ${getFollowButton(suggestion)}
         </section>`;

}

const getFollowButton = suggestion => {
    console.log("suggestions: " + suggestion);
    console.log("what is suggestion id: " + suggestion.id)
    if (suggestion) {
        return `
            <button id="suggestionButton_${suggestion.id}" class="button" aria-label="follow button" aria-checked="false" onclick="startFollowing(${suggestion.id})">
                follow
            </button>
        `;
    } else {
        return `
            <button class="button" aria-label="follow button" aria-checked="true" onclick="unfollow(${suggestion.id})">
                unfollow
            </button>
        `;
    }  
}


  window.startFollowing = async (suggestion_id) => {
    console.log("Now trying to follow user");
    console.log("the id of the user we are trying to follow: " + suggestion_id)

    // define the endpoint:
    const endpoint = `${rootURL}/api/following`;
    const postData = {
        "user_id": suggestion_id
    };

    // Create the follow:
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(postData)
    })
    const data = await response.json();
    console.log(data);
    console.log(data.id + " data.id")
    let id_created = data.id
    requeryRedrawForSuggestionsButtonJustFollowed(suggestion_id,id_created);
}

window.unfollow = async (suggestion_id, id_created) => {
    console.log("now trying to unfollow user")
    // define the endpoint:
    const endpoint = `${rootURL}/api/following/${id_created}`;

    // unfollow :
    const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log(data);
    requeryRedrawForSuggestionsButtonJustUnfollowed(suggestion_id);
}

const getBookmarkButton = post => {
    if (post.current_user_bookmark_id) {
        return `
            <button class="icon-button" aria-label="bookmark button" aria-checked="true" onclick="unbookmarkPost(${post.current_user_bookmark_id}, ${post.id})">
                <i class="fa-solid fa-bookmark"></i>
            </button>
        `;
    } else {
        return `
            <button class="icon-button" aria-label="bookmark button" aria-checked="false" onclick="bookmarkPost(${post.id})">
                <i class="far fa-bookmark"></i>
            </button>
        `;
    }  
}

  window.bookmarkPost = async (postId) => {
    console.log("Now trying to bookmark post");

    // define the endpoint:
    const endpoint = `${rootURL}/api/bookmarks/`;
    const postData = {
        "post_id": postId
    };

    // Create the bookmark:
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(postData)
    })
    const data = await response.json();
    console.log(data);
    requeryRedraw(postId);
}

window.unbookmarkPost = async (bookmarkId, postId) => {
    // define the endpoint:
    const endpoint = `${rootURL}/api/bookmarks/${bookmarkId}`;

    // Create the bookmark:
    const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log(data);
    requeryRedraw(postId);
}


const getLikeButton = post => {
    if (post.current_user_like_id) {
        return `
            <button class="icon-button-liked" aria-label="like button" aria-checked="true" onclick="unlikePost(${post.current_user_like_id}, ${post.id})">
                <i class="fa-solid fa-heart"></i>
            </button>
        `;
    } else {
        return `
            <button class="icon-button" aria-label="like button" aria-checked="false" onclick="likePost(${post.id})">
                <i class="far fa-heart"></i>
            </button>
        `;
    }  
}


  window.likePost = async (postId) => {
    console.log("Now trying to like post");

    // define the endpoint:
    const endpoint = `${rootURL}/api/posts/likes`;
    const postData = {
        "post_id": postId
    };

    // Create the like:
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(postData)
    })
    const data = await response.json();
    console.log(data);
    requeryRedraw(postId);
}

window.unlikePost = async (likeId, postId) => {
    // define the endpoint:
    const endpoint = `${rootURL}/api/posts/likes/${likeId}`;

    // Create the like:
    const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log(data);
    requeryRedraw(postId);
}

window.addComment = async (postId) => {
    const text_id = `#text_${postId}`;
    console.log(text_id)
    let textValue = document.querySelector(text_id).value;
    console.log(textValue);

    const endpoint = `${rootURL}/api/comments`;
    const postData = {
        "post_id":postId,
        "text": textValue
    };

     // Create the comment:
     const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(postData)
    })
    const data = await response.json();
    console.log(data);
    requeryRedraw(postId);



}


    async function showPosts(token) {
        console.log('now testing code to show post');
        const endpoint = `${rootURL}/api/posts`;
        const response = await fetch(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json();
        console.log('Posts:', data);
        const htmlChunk = data.map(postToHtml).join(``);
        document.querySelector('.posts').innerHTML = htmlChunk;
    }

async function requeryPost(post_id) {
    // get a fresh copy of the post
        const response = await fetch(`${rootURL}/api/posts/${post_id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    const data = await response.json();
    console.log(data);
    return data;
    // to make the screen redraw after requerying the post,
    // we need to set a state variable:
}

 window.requeryRedraw = async (postId) => {
    const endpoint = `${rootURL}/api/posts/${postId}`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log(data);
    const htmlString = postToHtml(data);
    targetElementAndReplace(`#post_${postId}`, htmlString);
}

window.requeryRedrawForSuggestionsButtonJustFollowed = async (suggestion_id, id_created) => {
    
    const data = `
            <button id="suggestionButton_${suggestion_id}" class="button" onclick="unfollow(${suggestion_id},${id_created})">
                unfollow
            </button>
        `
    console.log(data);
    // const htmlString = suggestionsToHtml(data);
    targetElementAndReplace(`#suggestionButton_${suggestion_id}`, data);
}

window.requeryRedrawForSuggestionsButtonJustUnfollowed = async (suggestion_id) => {
    
    const data = `
            <button id="suggestionButton_${suggestion_id}" class="button" onclick="startFollowing(${suggestion_id})">
                follow
            </button>
        `
    console.log(data);
    // const htmlString = suggestionsToHtml(data);
    targetElementAndReplace(`#suggestionButton_${suggestion_id}`, data);
}


let modalElement = document.querySelector('.modal-bg');
console.log(modalElement);

 window.openModal = async (ev, post_id) => {
    console.log('open!');
    console.log(post_id);
    const post = await requeryPost(post_id);
    console.log(post);

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
            // console.log(commentHTML);
        }


    document.querySelector('.modal-body').innerHTML = ` <!-- Uses a background image -->
    <div class="image" style="background-image: url('${post.image_url}');"></div>
    <section class="the-comments">
        ${commentHTML}
    </section>`;
    modalElement.classList.remove('hidden');
    modalElement.setAttribute('aria-hidden', 'false');
   // document.querySelector('.close').focus();
}

 window.closeModal = ev => {
    console.log('close!');
    modalElement.classList.add('hidden');
    modalElement.setAttribute('aria-hidden', 'false');
    document.querySelector('.open').focus();
};


// function ensures that if the tabbing gets to the end of the 
// modal, it will loop back up to the beginning of the modal:
document.addEventListener('focus', function(event) {
    console.log('focus');
    modalElement = document.querySelector('.modal-bg');
    console.log(modalElement + "Modal element");
    if (modalElement.getAttribute('aria-hidden') === 'false' && !modalElement.contains(event.target)) {
        console.log('back to top!');
        event.stopPropagation();
        document.querySelector('.close').focus();
    }
}, true);

var commentIdCount = 0;

// const commentsToHtml = comment => {

// }


const postToHtml = post => {
    //things I need to get before making html
    /**
     * 1. if liked
     * 2. if bookmarked
     * 3. how many comments there are
     */
  
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
            // console.log(commentHTML);
        }
    

        // var likeButton = '';

        // if(post.current_user_like_id != null){
        //      likeButton = `<button class="icon-button-liked"><i class="fa-solid fa-heart"></i></button>`;
        // }else{
        //      likeButton = `<button class="icon-button"><i class="far fa-heart"></i></button>`;
        // }

    //     var bookmarkButton = '';
    //     if(post.current_user_bookmark_id != null){
    //         bookmarkButton = `<button class="icon-button"><i class="fa-solid fa-bookmark"></i></button>`;
    //    }else{
    //         bookmarkButton = `<button class="icon-button"><i class="far fa-bookmark"></i></button>`;
    //    }
        
       var commentSection = '';
       if(post.comments.length > 1){ //if there is more than 1 comment this will add the modal
        commentIdCount += 1;
        commentSection = `
        <div class="modal-bg hidden" aria-hidden="true" role="dialog">
        <section class="modal">
            <button class="close" aria-label="Close the modal window" onclick="closeModal(event);">Close</button>
            <div class="modal-body">
                <!-- Uses a background image -->
                <div class="image" style="background-image: url('${post.image_url}');"></div>
                <section class="the-comments">
                    ${commentHTML}
                </section>
            </div>
        </section>
    </div>

        <button id="${commentIdCount}" class="view-comment-button" onclick="openModal(event, ${post.id});"><strong>view all ${post.comments.length} comments</strong></button> 
        <p>
                <strong>${post.comments[0].user.username}</strong> 
                ${post.comments[0].text}
            </p>
            <p class="timestamp">${post.display_time}</p>
        `
       }else if(post.comments.length == 1){
        commentSection = ` 
        <p>
                <strong>${post.comments[0].user.username}</strong> 
                ${post.comments[0].text}
            </p>
            <p class="timestamp">${post.display_time}</p>
        `
       }
    
    return `<section id="post_${post.id}" class="card">
    <div class="header">
        <h3>${post.user.username}</h3>
        <button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
    </div>
    <img src="${post.image_url}" alt="placeholder image" width="300" height="300">
    <div class="info">
        <div class="buttons">
            <div>
                ${getLikeButton(post)}
                <button class="icon-button"><i class="far fa-comment"></i></button>
                <button class="icon-button"><i class="far fa-paper-plane"></i></button>
            </div>
            <div>
             ${getBookmarkButton(post)}
            </div>
        </div>
        <p class="likes"><strong>${post.likes.length} likes</strong></p>
        <div class="caption">
            <p>
                <strong>${post.user.username}</strong> 
                ${post.caption}
            </p>
        </div>
        <div class="comments">
            ${commentSection}
        </div>
    </div>
    <div class="add-comment">
        <div class="input-holder">
            <i class="far fa-smile"></i>
            <input type="text" id="text_${post.id}" placeholder="Add a comment...">
        </div>
        <button class="button" onclick="addComment(${post.id})">Post</button>
    </div>
</section>`;
}


const initPage = async () => {
    // first log in (we will build on this after Spring Break):
     token = await getAccessToken(rootURL, 'haley', 'haley_password');

    // then use the access token provided to access data on the user's behalf
    showStories(token);
    showPosts(token);
    showRightPanel(token);
    showSuggestions(token);

}

initPage();
