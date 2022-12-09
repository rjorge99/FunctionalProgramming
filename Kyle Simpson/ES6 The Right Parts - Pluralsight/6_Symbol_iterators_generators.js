// Symbols
// use as property name for an object

var x = Symbol();
// var x = Symbol('description'); // with description

var obj = {};
obj[x] = 'secret';
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol()]

// Well-known Symbols
Symbol.iterator
Symbol.toStringTag
Symbol.hasInstance
Symbol.isConcatSpreadable

// Iterators
var arr = [1, 2, 3];
var it = arr[Symbol.iterator]();
console.log(it.next()); // { value: 1, done: false }
console.log(it.next()); // { value: 2, done: false }
console.log(it.next()); // { value: 3, done: false }

for (const value of arr[Symbol.iterator]())
    console.log(value); // 1 2 3

for (const value of arr)
    console.log(value); // 1 2 3

// ... spread, uses the iterator

// Custom iterator
// Manual way
var obj = {
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    start: 4,
    end: 13,
    [Symbol.iterator]() {
        var idx = this.start, en = this.end;

        return {
            next: () => {
                if (idx < en) {
                    var v = this.values[idx++];
                    return { value: v, done: false };
                }
                return { done: true };
            }
        }
    }
}

var c = [...obj];
console.log(c); // [ 5, 6, 7, 8, 9, 10, 11, 12, 13 ]

// Generator
function* main() {
    console.log('Hello');
    yield 9;
    console.log('world');
    return 10;
}
 
var it = main();
console.log(it.next()); // { value: 9, done: false }
console.log(it.next()); // { value: 10, done: true }

for (const val of main()) 
    console.log(val); // 9 -> throws away the 10, requires a yield instead of a return

function* main() {
    for(var i=0; i<5; i++) yield i;
}

for (const v of main()) 
    console.log(v); // 0 1 2 3 4
    
function* uniqueId() {
    while (true) yield Math.random();
}

var numbers = uniqueId();
console.log(numbers.next().value);
console.log(numbers.next().value);
console.log(numbers.next().value);
console.log(numbers.next().value);


var numbers = { 
    *[Symbol.iterator]({ start = 0, end = 100, step = 1} = {}) {
        for (; start <= end; start += step) 
            yield start;
    }
}

for (const v of numbers[Symbol.iterator]()) 
    console.log(v); // print 0 to 100

for (const v of numbers[Symbol.iterator]({ start: 6, end: 30, step: 4})) 
    console.log(v); 

// Ranges
// [...8] -> [0, 1, 2, 3, 4, 5, 6, 7, 8]
Number.prototype[Symbol.iterator] = function* () {
    for (var i = 0; i <= this; i++) yield i;
}

for (const v of [...8])
    console.log(v); // 0 1 2 3 4 5 6 7 8
