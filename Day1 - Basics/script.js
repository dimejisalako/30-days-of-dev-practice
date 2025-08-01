console.log("Javascript is Working")

//sorting numbers in ascending order
//const numbers 

let numbers = [23,45,77,121,67]; //random numbers
numbers.sort ((a,b) => a - b) //items in this case are sorted as strings
console.log(numbers);


//sorting in descending order
numbers.sort ((a,b) => b -a) //items in this case are sorted as strings
console.log(numbers);


//sorting alphabetically

let fruits =['orange', 'guava', 'pear','grape', 'dragon-fruit',];
fruits.sort();
console.log(fruits);

//descending
fruits.sort((a, b) => b.localeCompare(a));
console.log(fruits);

//sorting mixed arrays

let mixedArray = ['Boy', 23, '#', '*', '&', 'House', 'Gun', 43];
let sorted = [...mixedArray].sort();
console.log('sorted', sorted)

// Push a new item
mixedArray.push('NewItem');
console.log('After push:', mixedArray);

