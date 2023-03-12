import {getAccessToken} from './utilities.js';
const rootURL = 'https://photo-app-secured.herokuapp.com';


//TODO
//finish post to html
//fix suggestions p tag not showing at the top

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
//     <section>
//     <img src="https://picsum.photos/30/30?q=11" class="pic" />
//     <div>
//         <p class="username">amandahudson</p>
//         <p>suggested for you</p>
//     </div>
//     <button class="button">follow</button>
// </section>

return `<section>
            <img src="${suggestion.thumb_url}" class="pic" />
            <div>
                <p class="username">${suggestion.username}</p>
                <p>suggested for you</p>
             </div>
            <button class="button">follow</button>
         </section>`;

}


const showPosts = async (token) => {
    console.log('now testing code to show post');
    const endpoint = `${rootURL}/api/posts`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log('Posts:', data);
}

const postToHtml = post => {
    return `<section>
    
    
    </section>`;
}


const initPage = async () => {
    // first log in (we will build on this after Spring Break):
    const token = await getAccessToken(rootURL, 'webdev', 'password');

    // then use the access token provided to access data on the user's behalf
    showStories(token);
    //showPosts(token);
    showRightPanel(token);
    showSuggestions(token);
}

initPage();
