// Utility helpers
// const unary = (fn) => (arg) => fn(arg);
// const identity = (v) => v;
// const constant = (v) => () => v;
// const spreadArgs = (fn) => (argsArr) => fn(...argsArr); //  in libraries like Ramda it’s commonly called apply(..).
// const gatherArgs = (fn) => (...argsArr) => fn(argsArr); // In Ramda, this utility is referred to as unapply(..)
// const partial = (fn, ...presetArgs) => (...laterArgs) => fn(...presetArgs, ...laterArgs);
// const reverseArgs = (fn) => (...args) => fn(...args.reverse());
// const curry = (fn, arity = fn.length, nextCurried) =>
//     (nextCurried = (prevArgs) => (nextArg) => {
//         var args = [...prevArgs, nextArg];
//         if (args.length >= arity) {
//             return fn(...args);
//         } else {
//             return nextCurried(args);
//         }
//     })([]);
// const uncurry =
//     (fn) =>
//     (...args) => {
//         var ret = fn;
//         for (let arg of args) {
//             ret = ret(arg);
//         }
//         return ret;
//     };
// const not =
//     (predicate) =>
//     (...args) =>
//         !predicate(...args);
// const when =
//     (predicate, fn) =>
//     (...args) =>
//         predicate(...args) ? fn(...args) : undefined;

// --------------------------------------------------------------------------------------------------------------------
// The utility will send multiple arguments to that function. But you may only want the function to receive a single argument.
// All for one
function unary(fn) {
    return function oneArg(arg) {
        return fn(arg);
    };
}
// That’s usually not a big deal, unless you’re trying to use something as a mapper function that will behave incorrectly if it’s passed too many arguments
console.log(['1', '2', '3'].map(parseInt)); // [1, NaN, NaN]
console.log(['1', '2', '3'].map(unary(parseInt))); // [1, 2, 3]

// --------------------------------------------------------------------------------------------------------------------
// Speaking of functions with only one argument, another common base utility in the FP toolbelt is a function that takes one argument and does nothing but return the value untouched
// One on one
function identity(v) {
    return v;
}
var words = ' Now is the time for all... '.split(/\s|\b/);
words; // ["Now", "is", "the", "time", "for", "all..."]
words.filter(identity); // ["Now", "is", "the", "time", "for", "all, "..."] coerces to true/false the original value

// --------------------------------------------------------------------------------------------------------------------
// Certain APIs don’t let you pass a value directly into a method, but require you to pass in a function, even if that function literally just returns the value
//  One such API is the then(..) method on JS Promises:
// Unchanging one
function constant(v) {
    return function value() {
        return v;
    };
}

// p1.then( foo ).then( () => p2 ).then( bar )  -> does not work.
// p1.then( foo ).then( constant( p2 ) ).then( bar ); -> works.

// --------------------------------------------------------------------------------------------------------------------
// in libraries like Ramda it’s commonly called apply(..).
// There will be occasions when you have two functions that are incompatible in this
// way, and you won’t be able to change their declarations/definitions.
function foo(x, y) {
    console.log(x + y);
}
function bar(fn) {
    fn([3, 9]);
}
bar(foo); // Fails

function spreadArgs(fn) {
    return function spreadFn(argsArr) {
        return fn(...argsArr);
    };
}
bar(spreadArgs(foo)); // 12

// --------------------------------------------------------------------------------------------------------------------
// In Ramda, this utility is referred to as unapply(..)
function gatherArgs(fn) {
    return function gatheredFn(...argsArr) {
        return fn(argsArr);
    };
}

function combineFirstTwo([v1, v2]) {
    return v1 + v2;
}
[1, 2, 3, 4, 5].reduce(gatherArgs(combineFirstTwo)); // 15

// --------------------------------------------------------------------------------------------------------------------
// Some now, some later
function partial(fn, ...presetArgs) {
    return function partiallyApplied(...laterArgs) {
        return fn(...presetArgs, ...laterArgs);
    };
}

// function getPerson(data, cb) { ajax('http://some.api/person', data, cb);  }

// const getPerson = partial(ajax, 'http://some.api/person');
// const getPerson = function partiallyApplied(...laterArgs) { return ajax('http://some.api/person', ...laterArgs); };

// function getCurrentUser(cb) {
//     getPerson({ user: CURRENT_USER_ID }, cb);
// }

// const getCurrentUser = partial(ajax, 'http://some.api/person', { user: CURRENT_USER_ID });
// const getCurrentUser = function partiallyApplied(...laterArgs) {
//     return ajax('http://some.api/person', { user: CURRENT_USER_ID }, ...laterArgs);
// };

// const getCurrentUser = partial(getPerson, { user: CURRENT_USER_ID });
// const getCurrentUser = function partiallyApplied(...laterArgs) {
//     const getPerson = function innerPartiallyApplied(...innerLaterArgs) {
//         return ajax('http://some.api/person', ...innerLaterArgs);
//     };

//     return getPerson({ user: CURRENT_USER_ID }, ...laterArgs);
// };

// function add(x, y) { return x + y; }
// [1, 2, 3, 4, 5].map(function adder(val) {
//     return add(3, val);
// }); // [4, 5, 6, 7, 8]
// [1, 2, 3, 4, 5].map(partial(add, 3)); // [4, 5, 6, 7, 8]

// --------------------------------------------------------------------------------------------------------------------
// Reversing Arguments
function reverseArgs(fn) {
    return function argsReversed(...args) {
        return fn(...args.reverse());
    };
}

//--------------------------------------------------------------------------------------------------------------------
// One at the time (Currying)
function curry(fn, arity = fn.length) {
    return (function nextCurried(prevArgs) {
        return function curried(nextArg) {
            var args = [...prevArgs, nextArg];
            if (args.length >= arity) {
                return fn(...args);
            } else {
                return nextCurried(args);
            }
        };
    })([]);
}
// var curriedAjax = curry(ajax);
// var personFetcher = curriedAjax('http://some.api/person');
// var getCurrentUser = personFetcher({ user: CURRENT_USER_ID });
// getCurrentUser(function foundUser(user) { /* .. */ });

//  As currying is similar to partial application, we could do that task with currying in almost the same way:
// [1,2,3,4,5].map( curry( add )( 3 ) ); // [4,5,6,7,8]

// function sum(...nums) {
//     var total = 0;
//     for (let num of nums) {
//         total += num;
//     }
//     return total;
// }

// (5 to indicate how many we should wait for)
// const curriedSum = curry(sum, 5);
// curriedSum(1)(2)(3)(4)(5); // 15

// function curriedSum(v1) {
//     return function (v2) {
//         return function (v3) {
//             return function (v4) {
//                 return function (v5) {
//                     return sum(v1, v2, v3, v4, v5);
//                 };
//             };
//         };
//     };
// }
// const curriedSum = (v1) => (v2) => (v3) => (v4) => (v5) => sum(v1, v2, v3, v4, v5);

// --------------------------------------------------------------------------------------------------------------------
// Loosely Curried
function looseCurry(fn, arity = fn.length) {
    return (function nextCurried(prevArgs) {
        return function curried(...nextArgs) {
            var args = [...prevArgs, ...nextArgs];
            if (args.length >= arity) {
                return fn(...args);
            } else {
                return nextCurried(args);
            }
        };
    })([]);
}

// var curriedSum = looseCurry(sum, 5);
// curriedSum(1)(2, 3)(4, 5);

// --------------------------------------------------------------------------------------------------------------------
// Uncurry
function uncurry(fn) {
    return function uncurried(...args) {
        var ret = fn;
        for (let arg of args) {
            ret = ret(arg);
        }
        return ret;
    };
}

// --------------------------------------------------------------------------------------------------------------------
// No points
function double(x) {
    return x * 2;
}
// [1, 2, 3, 4, 5].map(function mapper(v) {
//     return double(v);
// });
[1, 2, 3, 4, 5].map(double);
['1', '2', '3'].map(unary(parseInt)); // Discards the second argument of provided by the map function

function output(text) {
    console.log(text);
}

function printIf(predicated, msg) {
    if (predicated(msg)) output(msg);
}

function isShortEnough(msg) {
    return msg.length < 5;
}

let msg1 = 'Hello ';
let ms2 = 'Hello World';

printIf(isShortEnough, msg1); // Hello
printIf(isShortEnough, msg2);

function isLongEnough(msg) {
    return !isShortEnough(msg);
}

printIf(isLongEnough, msg1);
printIf(isLongEnough, msg2); // Hello World

function not(predicate) {
    return function negated(...args) {
        return !predicate(...args);
    };
}

// Using point free
const isLongEnough = not(isShortEnough); // <--
printIf(isLongEnough, msg2); // Hello World

// We can express the if conditional part with a when(..) utility:
function when(predicate, fn) {
    return function conditional(...args) {
        if (predicate(...args)) {
            return fn(...args);
        }
    };
}

const printIf = uncurry(partialRight(when, output));
