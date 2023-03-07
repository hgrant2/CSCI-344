// Q1. Your code here:
function addNums(arr){
    starter = 0;
    for(const element of arr){
        starter += element;
    }
    return starter;
}




// When you have implemented your solution, 
// uncomment out the following code to test it:
console.log('\n\n**********\nQuestion 1\n**********');
console.log("Expected: 6, Actual:", addNums([1, 2, 3]));
console.log("Expected: 221, Actual:", addNums([1, 4, 77, 12, 88, 33, 6]));




// Q2. Your code here:
// const start = 0;
// const addNums1 = array.reduce((add, current) => add + current, start);

function addNums1(theArray){
    return theArray.reduce((accumulator, currentValue) => accumulator + currentValue);
    //reduce uses the value of the last return, so
    // if using reduce and we do 1+2 it will return 3
    // 3 is the added to the next index of the array and so on
}



// When you have implemented your solution, 
// uncomment out the following code to test it:
 console.log('\n\n**********\nQuestion 2\n**********');
 console.log("Expected: 6, Actual:", addNums1([1, 2, 3]));
 console.log("Expected: 221, Actual:", addNums1([1, 4, 77, 12, 88, 33, 6]));

//  Q3. Your code goes here

function filterNumbers(Arr){
    return Arr.filter(number => (number % 5) == 0);
}




//test for implementation 
console.log('\n\n**********\nQuestion 3\n**********');
console.log("Expected: [ 25, 10, 25 ], Actual:", filterNumbers([23, 25, 2, 10, 17, 3, 25]));
console.log("Expected:[ 0, 5, 10, 0, 5 ], Actual:", filterNumbers([0, 5, 6, 7, 8, 9, 10, 0, 16, 5]));

// Q4, Your code goes here

function getNamesOfExecutives(Arr){
    return Arr.filter(person => person.role == "executive").map(person => person.name);
}





// test for implementation

const list1 = [
    { role: "assistant", name: "Larry", salary: 34000 },
    { role: "executive", name: "Curly", salary: 340000  },
    { role: "associate", name: "Kayla", salary: 58000  },
    { role: "executive", name: "Monique", salary: 580000  },
    { role: "assistant", name: "Fred", salary: 38000 },
    { role: "associate", name: "Isiah", salary: 78000 }
 ]
 
 
 const list2 = [
    { role: "associate", name: "Juana", salary: 70500 },
    { role: "assistant", name: "Maria", salary: 28000 },
    { role: "assistant", name: "Frank", salary: 18000 }
 ]
 console.log('\n\n**********\nQuestion 4\n**********');
 console.log("Expected: [ 'Curly', 'Monique' ], Actual:", getNamesOfExecutives(list1));
 console.log("Expected: [ ], Actual:", getNamesOfExecutives(list2));
 
 