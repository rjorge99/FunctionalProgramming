var str = "sotnaeuh";
var arr = [1, 2, 3];

var it1 = str[Symbol.iterator](); // function that returns an iterator
var it2 = arr[Symbol.iterator](); 

console.log(it1.next()); // { value: "s", done: false }
console.log(it1.next()); // { value: "o", done: false }

console.log(it2.next()); // { value: 1, done: false }
console.log(it2.next()); // { value: 2, done: false }

for (const v of str) console.log(v); // s o t n a e u h
for (const v of arr) console.log(v); // 1 2 3

var letters = [ ...str ]; // [ "s", "o", "t", "n", "a", "e", "u", "h" ]

var obj = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol.iterator](){
        var keys = Object.keys(this),
            index = 0;
        return { 
            next: () => {
                if(index < keys.length) return { value: this[keys[index++]], done: false };
                return { done: true };
            }
        }
    }
}

var vals = [ ...obj ]; // [ 1, 2, 3 ]
for (const v of vals) console.log(v); // 1 2 3
    

// Generators
function* main() {
    yield 1;
    yield 2;
}

var it = main();
console.log(it.next()); // { value: 1, done: false }
console.log(it.next()); // { value: 2, done: false }


for (const v of main()) console.log(v); // 1 2


    

var obj = {
    a: 1,
    b: 2,
    c: 3,
    *[Symbol.iterator](){
        for (const key of Object.keys(this)) yield this[key];
    }
}

for (const v of obj[Symbol.iterator]()) console.log(v); // 1 2 3;


// Exercice
var numbers = {
    *[Symbol.iterator]({ start = 0, end = 100, step = 1 } = {}) {
        for (; i <= end; i += step) yield start;
    }
}

// print 0 ... 100 by 1s
for (const num of numbers[Symbol.iterator]()) console.log(num);
    
// print 6 ... 30 by 4s
for (const num of numbers[Symbol.iterator]({ start: 6, end: 30, step: 4})) console.log(num);


// Ranges
// [ ...8 ] -> [ 1, 2, 3, 4, 5, 6, 7, 8 ]
Number.prototype[Symbol.iterator] = function* () { 
    for(let i = 1; i <= this; i++) yield i;
}
    

console.log(first(8)); // [ 1, 2, 3, 4, 5, 6, 7, 8 ]