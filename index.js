// Utility helpers
// const unary = (fn) => (arg) => fn(arg);
// const identity = (v) => v;
// const constant = (v) => () => v;
// const spreadArgs = (fn) => (argsArr) => fn(...argsArr); //  in libraries like Ramda it’s commonly called apply(..).
// const gatherArgs = (fn) => (...argsArr) => fn(argsArr); // In Ramda, this utility is referred to as unapply(..)

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

// Speaking of functions with only one argument, another common base utility in the FP toolbelt is a function that takes one argument and does nothing but return the value untouched:
// One on one
function identity(v) {
    return v;
}
var words = ' Now is the time for all... '.split(/\s|\b/);
words; // ["Now", "is", "the", "time", "for", "all..."]
words.filter(identity); // ["Now", "is", "the", "time", "for", "all..."]

// --------------------------------------------------------------------------------------------------------------------
function constant(v) {
    return function value() {
        return v;
    };
}

// p1.then( foo ).then( () => p2 ).then( bar )
// p1.then( foo ).then( constant( p2 ) ).then( bar );

// --------------------------------------------------------------------------------------------------------------------
// in libraries like Ramda it’s commonly called apply(..).
function spreadArgs(fn) {
    return function spreadFn(argsArr) {
        return fn(...argsArr);
    };
}

// --------------------------------------------------------------------------------------------------------------------
// In Ramda, this utility is referred to as unapply(..)
function gatherArgs(fn) {
    return function gatheredFn(...argsArr) {
        return fn(argsArr);
    };
}
// or the ES6 => arrow form
