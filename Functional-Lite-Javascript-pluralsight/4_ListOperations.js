function isNot(fn) { return function negated(...args) { return !fn(...args); }; }
function doubleIt(x) { return x * 2; }
function isOdd(x) { return x % 2 === 1; }
function mult(x, y) { return x * y; }

// Transforming data
[1, 2, 3, 4, 5].map(doubleIt); // [2, 4, 6, 8, 10]

// Exclusion
[1, 2, 3, 4, 5].filter(isOdd); // [1, 3, 5]

// Composition
function compose(arr, fn, initial) {
    var result = initial;
    for (const v of arr) result = fn(result, v);
    return result;
}

compose([1, 2, 3, 4, 5], mult, 1); // 120
let total = [1, 2, 3, 4, 5].reduce(mult, 1); // 120

// Iteration
[1, 2, 3, 4, 5].forEach(console.log); // 1 2 3 4 5

// Exercise
// function foo() { return 42; }
// function bar() { return 10; }
function add(x, y) { return x + y; }
function add2(fn1, fn2) { return add(fn1(), fn2()); }
// -> add(foo(), bar()) -> 52

function foo(v) { return function() { return v; }; }
add2(foo(42), foo(10)); // 52


const arr = [1, 2, 3, 4, 5];

function addLoop(arr) {
    let total = 0;
    for (const v of arr) total = add2(foo(total), foo(v));
    return total;
}

function addRecursion(arr) { 
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) return add2(foo(arr[0]), foo(arr[1]));

    // return add2(foo(arr[0]), foo(addRecursion(arr.slice(1))));
    return addRecursion([ add2(foo(arr[0]), foo(arr[1])), ...arr.slice(2) ]);
}

function addComposition(arr) {
    return arr
        .map(foo)
        .reduce(function (prev, next) {
            return function () {
                return add2(prev, next);
            }

        }, foo(0))();

}

addLoop(arr); // 15
addRecursion(arr); // 15
addComposition(arr); // 15


