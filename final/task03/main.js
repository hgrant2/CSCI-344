// your code here:

 window.getBusinesses = async (location, search_term, num_results) => {
    const rootURL = 'https://www.apitutor.org/yelp/simple/v3/businesses/search';
    const endpoint = `${rootURL}?q=${search_term}&location=${location}&limit=${num_results}`;
    const response = await fetch(endpoint);
    const jsonData = await response.json();
   
    console.log(jsonData);
    console.log(`Matches for ${search_term} at ${location} with a limit of ${num_results}`);

    
    return jsonData;
}

const businessToHTML = (businessObject) => {
    console.log(businessObject);
    let price = '';
    if(businessObject.price){
        price = `Price: ${businessObject.price}`;
    }

    const output = `
    <p>showing ${index + 1} of 5</p>
    <h1>${businessObject.name}</h1>
    <p>${businessObject.display_address}</p>
    <p>Rating: ${businessObject.rating}</p>
    <p>${price}</p>
    <p>Number of Reviews: ${businessObject.review_count}</p>
    <img src="${businessObject.image_url}">`;

    return output;
}

list_of_bussinesses = null;

const showResults = async (ev) => {
    console.log("clicked the search button");
    const location = document.querySelector('#location').value;
    console.log("are we getting the location ", location)
    const search_term = document.querySelector('#term').value;
    const limit = '5';
    console.log("Location, search term, and Limit: " + location + " " + search_term + " " + limit);

    list_of_bussinesses = await getBusinesses(location, search_term, limit);
    console.log("printing list of bussinesses ",list_of_bussinesses);

    stringOfHTML = businessToHTML(list_of_bussinesses[0]);
    console.log(stringOfHTML);

    document.querySelector('#results').innerHTML = stringOfHTML;
}
length = 5
let index = 0;

function next() {
    console.log("the next button has been clicked!");
    console.log("index is " + index);
    index += 1;
    console.log("The index is changed from the next button: " + index); 
    if(index < 5){
        stringOfHTML = businessToHTML(list_of_bussinesses[index]);
        document.querySelector("#results").innerHTML = stringOfHTML;
    }else{
        index = 0;
        stringOfHTML = businessToHTML(list_of_bussinesses[index]);
        document.querySelector("#results").innerHTML = stringOfHTML;
    }
  }
  
  
  function previous() {
    console.log("the previous button has been clicked!");
    console.log("index is " + index);
    index -= 1;
    console.log("The index is changed from the previous button: " + index);
    if(index < length && index >= 0){
        stringOfHTML = businessToHTML(list_of_bussinesses[index]);
        document.querySelector("#results").innerHTML = stringOfHTML;
    }else{
        index = length - 1;
        stringOfHTML = businessToHTML(list_of_bussinesses[index]);
        document.querySelector("#results").innerHTML = stringOfHTML;
  
      
    }
  
  }