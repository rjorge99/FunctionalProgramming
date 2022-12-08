'use strict';
// ******** Utilities ********
const isOdd = (x) => x % 2 === 1;
const sum = (x, y) => x + y;
const mult = (x, y) => x * y;
const listSum = (list) => list.reduce(sum, 0);
const listProduct = (list) => list.reduce(mult, 1);
function curry(arity, fn) {
    return (function nextCurried(prevArgs) {
        return function curried(nextArg) {
            var args = prevArgs.concat([nextArg]);
            if (args.length >= arity) {
                return fn(...args);
            } else {
                return nextCurried(args);
            }
        };
    })([]);
}
function compose(...fns) {
    return function composed(arg) {
        return fns.reduceRight((result, fn) => fn(result), arg);
    };
}
function pipe(...fns) {
    return compose(...fns.reverse());
}
function binary(fn) {
    return function two(arg1, arg2) {
        return fn(arg1, arg2);
    };
}
// inception!
curry = curry(2, curry);

var nums = {
    first: [3, 5, 2, 4, 9, 1, 12, 3],
    second: [5, 7, 7, 9, 10, 4, 2],
    third: [1, 1, 3, 2]
};

// List represents the value of each property in the object, in this case the list of numbers.
var filteredNums = filterObj(function (list) {
    return isOdd(listSum(list));
}, nums); // { first: [3, 5, 2, 4, 9, 1, 12, 3],  third: [1, 1, 3, 2] }

var filteredNumsProducts = mapObj(function (list) {
    return listProduct(list);
}, filteredNums); // { first: 38880, third: 6 }

reduceObj(
    function (acc, v) {
        return acc + v;
    },
    0,
    filteredNumsProducts
); // 38886

function mapObj(mapperFn, o) {
    var newObj = {};
    var keys = Object.keys(o);
    for (let key of keys) {
        newObj[key] = mapperFn(o[key]);
    }
    return newObj;
}

// ******** Solution ********
function filterObj(predicateFn, o) {
    var newObj = {};
    for (const key of Object.keys(o)) if (predicateFn(o[key])) newObj[key] = o[key];
    return newObj;
}

function reduceObj(reducerFn, initialValue, o) {
    var result = initialValue;
    for (const key of Object.keys(o)) result = reducerFn(result, o[key]);
    return result;
}

// ******** Free Points Version ********
// Part 1
var filteredNums = filterObj(compose(isOdd, listSum), nums);
var filteredNumsProducts = mapObj(listProduct, filteredNums);
const r = reduceObj(sum, 0, filteredNumsProducts); // 38886

// Part 2
// Option 1
// pipe(
//     curry(2, filterObj)(compose(isOdd, listSum)),
//     curry(2, mapObj)(listProduct),
//     curry(3, reduceObj)(sum)(0)
// )(nums); // 38886

// Using curry = curry(2, curry);
// Option 2
pipe(
    curry(2)(filterObj)(compose(isOdd, listSum)),
    curry(2)(mapObj)(listProduct),
    curry(3)(reduceObj)(sum)(0)
)(nums); // 38886

[
    curry(2)(filterObj)(compose(isOdd, listSum)),
    curry(2)(mapObj)(listProduct),
    curry(3)(reduceObj)(sum)(0)
].reduce(function (acc, fn) {
    return fn(acc);
}, nums); // 38886

const resp = [
    curry(2)(filterObj)(compose(isOdd, listSum)),
    curry(2)(mapObj)(listProduct),
    curry(3)(reduceObj)(sum)(0)
].reduce(binary(pipe))(nums); // 38886
