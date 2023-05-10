// 2. Define businessToHTML here:

const businessToHTML = (businessObject) => {
    console.log(businessObject);
    let price = '';
    if(businessObject.price){
        price = `Price: ${businessObject.price}`;
    }

    const output = `
    <h1>${businessObject.name}</h1>
    <p>${businessObject.display_address}</p>
    <p>Rating: ${businessObject.rating}</p>
    <p>${price}</p>
    <p>Number of Reviews: ${businessObject.review_count}</p>
    <img src="${businessObject.image_url}">`;

    return output;
}











/****************/
/* Testing Code */
/****************/

const businessObjPriceDefined = {
    id: "d8Vg0DxRY-s2a8xnZ6ratw",
    name: "Chestnut",
    rating: 4.5,
    image_url:
        "https://s3-media3.fl.yelpcdn.com/bphoto/TprWlxsHLqjZfCRgDmqimA/o.jpg",
    display_address: "48 Biltmore Ave, Asheville, NC 28801",
    coordinates: { latitude: 35.5931657, longitude: -82.550943 },
    price: "$$",
    review_count: 1257,
};

const businessObjPriceNotDefined = {
    id: "d8Vg0DxRY-s2a8xnZ6ratw",
    name: "Chestnut",
    rating: 4.5,
    image_url:
        "https://s3-media3.fl.yelpcdn.com/bphoto/TprWlxsHLqjZfCRgDmqimA/o.jpg",
    display_address: "48 Biltmore Ave, Asheville, NC 28801",
    coordinates: { latitude: 35.5931657, longitude: -82.550943 },
    review_count: 1257,
};

// uncomment this line when you've finished with Q2A:
 console.log("HTML representation of a business:", businessToHTML(businessObjPriceDefined));
 console.log("HTML representation of a business (no price):", businessToHTML(businessObjPriceNotDefined));