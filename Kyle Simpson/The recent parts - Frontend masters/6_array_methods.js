var arr = [{ a: 1 }, { a: 2 }];

// find -> return the object
var objFound = arr.find(v => v.a === 2);
console.log(objFound); // { a: 2 }
console.log(arr.indexOf(objFound)); // 1

let objIndex = arr.findIndex(v => v.a === 2);
console.log(objIndex); // 1


// includes -> return true or false
console.log(arr.includes(objFound)); // true


var nestedArray = [1, [2, 3], [[]], [4, [5]]];

//flat -> return a new array with all sub-array elements concatenated into it recursively up to the specified depth.
nestedArray.flat(0); // [1, [2, 3], [[]], [4, [5]]]  does nothing
nestedArray.flat(1); // [1, 2, 3, [], 4, [5]] only one level
nestedArray.flat(2); // [1, 2, 3, 4, 5] two levels

//flatMap -> return a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level.
[1,2,3].map(v => [v * 2, String(v * 2)]); // [[2, "2"], [4, "4"], [6, "6"]]
[1,2,3].map(v => [v * 2, String(v * 2)]).flat(); // [2, "2", 4, "4", 6, "6"]
[1,2,3].flatMap(v => [v * 2, String(v * 2)]); // [2, "2", 4, "4", 6, "6"]

[1, 2, 3, 4, 5, 6].flatMap(v => { 
    if (v % 2 === 0) return [v, v * 2];
    return [];
}) // [2, 4, 4, 8, 6, 12] -> add or remove items

