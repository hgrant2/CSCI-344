class SuperArray extends Array {

    map1(callback) {
        // TODO
        const newArray = new SuperArray();
        // const newArray = [];
        for (let i = 0; i < this.length; i++){
            //first arg is the current element in the array
            //second is the position
            //third is the array itself
            newArray.push(
                 callback(this[i], i, this)
            )
        }
        return newArray;
    }

    filter1(callback) {
        // TODO
        const newArray = new SuperArray();
        //if it matches, add to the array copy
        for(let i = 0; i < this.length; i++){
            if(callback(this[i])) {
                newArray.push(this[i]);
            }
        }
        return newArray;
    }

    reduce1(callback) {
        // TODO
    }

}

// function dataTransform(item) {
//     return item ** 3;
// }



const myArray = new SuperArray(1, 2, 3, 4, 5);
// const newArray = myArray.map1(dataTransform);
// console.log(newArray);

function isEven(item, idx, originallyArray){
    return item % 2 == 0;
}


console.log("Actual:", myArray.filter(item => item > 2));
console.log("Expected:", [3, 4, 5]);

console.log("Actual:", myArray.filter1(isEven));
console.log("Expected:", [2, 4]);
