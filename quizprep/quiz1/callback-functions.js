// Your code here.

const fetchAndShowTweets = async (term, callback) => {
    const baseURL = 'https://www.apitutor.org/twitter/simple/1.1/search/tweets.json';
    const URL = `${baseURL}?q=${term}`;
    const response = await fetch(URL);
    const data = await response.json();

    console.log(data);

    callback(data);

}

const printTwitterUsers= listOfTweets => {
    listOfTweets.forEach(tweet => {
        console.log(tweet.screen_name);        
    });
}

const printTwitterRetweet= listOfTweets => {
    listOfTweets.forEach(tweet => {
        console.log(tweet.retweet_count);        
    });
}


fetchAndShowTweets('dogs',printTwitterUsers);

// const fetchAndShowTweets = async (searchTerm, callback) => {
//     //retrieve the tweets of interest..
//      const baseURL = 'https://www.apitutor.org/twitter/simple/1.1/search/tweets.json';
//      const URL = `${baseURL}?q=${term}`;
//     const response = await fetch(URL);
//     const data = await response.json();

//     callback(data);

//     //when they return invoke callback function with the return data
//     //(list of tweets) as an argument
// }