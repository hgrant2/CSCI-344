// 1. Define getBusinesses here:
//      Sample endpoint: 
//      https://www.apitutor.org/yelp/simple/v3/businesses/search?q=tacos&location=Asheville+NC&limit=6

const getBusinesses = async (location, search_term, num_results) => {
    const rootURL = 'https://www.apitutor.org/yelp/simple/v3/businesses/search';
    const endpoint = `${rootURL}?q=${search_term}&location=${location}&limit=${num_results}`;
    const response = await fetch(endpoint);
    const jsonData = await response.json();
   
    //console.log(jsonData);
    console.log(`Matches for ${search_term} at ${location} with a limit of ${num_results}`);

    return jsonData;
}










/****************/
/* Testing Code */
/****************/

// Helper functions:
const pauseToBePolite = async () => {
    console.log('Pausing for half a second to be polite (and also because Yelp throttles requests)...');
    await new Promise(r => setTimeout(r, 500));
}

const testGetBusinesses = async () => {
    await pauseToBePolite();
    console.log('Should display 3 pizza restaurants in Asheville:', await getBusinesses('Asheville, NC', 'pizza', 3));
    
    await pauseToBePolite();
    console.log('Should display 10 thai restaurants in San Francisco:', await getBusinesses('San Francisco, CS', 'thai', 10));
}

// uncomment this line when you've finished with Q1:
testGetBusinesses();


