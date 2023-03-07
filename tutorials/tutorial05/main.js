// Part 1: Set up the helper functions:
// 1. Implement two filter functions (which should return either true or false):
//      * filterClassFull: to filter out the closed courses (if applicable)
//      * filterTermMatched: to only match courses relevant to the search term
// 2. Implement the dataToHTML function, which takes a course object as an
//    argument and returns an HTML string that represents the course.

// Part 2: Within the showData function, use the array's filter, map, join
//         methods, and any relevant DOM methods, to build the interface.
// 1. Use the array's built in "filter" method, which takes a filter
//    function as an argument and returns an array of objects that 
//    match the criteria.
//          * Note that you can chain filter functions together.
// 2. Use the array's built in "map" method to generate an array of 
//    HTML strings.
// 3. Join the array of strings on the empty string or new line character
//    to create one large HTML string.
// 4. Clear out the existing courses in the DOM and insert
//    the HTML string into the DOM.

const search = ev => {
    ev.preventDefault(); // overrides default button action

    // Get user's preferences:
    const searchTerm = document.querySelector('#search_term').value;
    const openOnly = document.querySelector('#is_open').checked;
    
    // Pass the user's preferences into the showData function
    showData(searchTerm, openOnly);
}

// Part 1.1a
const filterClassFull = course => {
    // modify this
    return true;
}

// Part 1.1b
const filterTermMatched = course => {
    const searchTerm = document.querySelector('#search_term').value.toLowerCase();
    const instructorName = course.Instructors[0].Name;
    
    if (
        course.Title.toLowerCase().includes(searchTerm) ||
        instructorName.toLowerCase().includes(searchTerm)
    ) {
        return true;
    } else {
        return false;
    }
}

// Part 1.2
const dataToHTML = course => {
    // modify this

    const instructor = course.Instructors[0].Name;
    const seatsAva = course.EnrollmentMax - course.EnrollmentCurrent;

    

    return `<section class="course">
        <h2>${course.Code}: ${course.Title}</h2>
        <p>
            <i class="fa-solid fa-circle-check"></i> 
            Open  &bull; 10174 &bull; Seats Available: ${seatsAva}
        </p>
        <p>
            ${course.Days} &bull; ${course.Location.FullLocation} &bull; ${course.Hours} credit hour(s)
        </p>
        <p><strong>${instructor}</strong></p>
    </section>
    `;
}

class CoolArray extends Array{

     mapChase(functionToApplyToEachItemOfTheArray){
        const copy = [];
        for(const item of this) {
            const result = functionToApplyToEachItemOfTheArray(item);
            copy.push(result);
        }
        return copy;
     }
}

function doubleNumber(num){
    return 2*num;
}

function squareNumber(num){
    return num*num;
}

const testArray = new CoolArray(1,2,4,7,9,11);
console.log(testArray.length);
console.log(testArray.mapChase(doubleNumber));
console.log(testArray.mapChase(squareNumber));


// Part 2
const showData = (searchTerm, openOnly) => {
    console.log(searchTerm, openOnly);
    console.log(data); // imported from course-data.js
    // Your code here:

    // 1. filter by search term
    // 2. filter by open or close
    // 3. take the matched courses and conervert them all to an HTMLarray
    // 4. join array of strings into megastring
    // 5. insert megastring into the DOM

    //behind the scene filter "filter" method is invoking the "filterTermMatched"
    //funtion on every item in the array.
    const dataThatMatchesQuery = data.filter(filterTermMatched);
    console.log("list of matches:", dataThatMatchesQuery)
    const onlyShowOpenClassesIfSpecified = dataThatMatchesQuery.filter(filterClassFull);
    console.log("list of open and matches", onlyShowOpenClassesIfSpecified);
    const listOfHTMLChunks = onlyShowOpenClassesIfSpecified.map(dataToHTML);
    console.log("List of Strings:", listOfHTMLChunks);
    const megastring = listOfHTMLChunks.join('\n');
    console.log("megaString:", megastring);
    
    document.querySelector('.courses').innerHTML= "";
     document.querySelector('.courses').insertAdjacentHTML('beforeend', megastring);
    //             filterTermMatched
    //         ).filter(
    //             filterClassFull
    //         ).map(
    //             dataToHTML
    //         ).join('')
    //     );
}