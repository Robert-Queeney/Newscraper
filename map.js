// var array1 = [1, 4, 9, 16];

// // pass a function to map
// const map1 = array1.map(x => x * 2);

// console.log(map1);
// // expected output: Array [2, 8, 18, 32]

var array1 = [1, 4, 9, 16];
let array2 = []

let arrayPush = () => {
    for (i = 0; i < array1.length; i++) {
        array2.push(array1[i] * 2); 
    } 
   
}  
arrayPush(); 
console.log(array2)