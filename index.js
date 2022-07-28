//  the utility will send multiple arguments to that function. But you may only want the function to receive a single argument.
// All for one
function unary(fn) {
    return function oneArg(arg) {
        return fn(arg);
    };
}
//const unary = (fn) => (arg) => fn(arg);
console.log(['1', '2', '3'].map(parseInt)); // [1, NaN, NaN]
console.log(['1', '2', '3'].map(unary(parseInt))); // [1, 2, 3]

// --------------------------------------------------------------------------------------------------------------------

// Speaking of functions with only one argument, another common base utility in the
// FP toolbelt is a function that takes one argument and does nothing but return the value untouched:
// One on one
function identity(v) {
    return v;
}
//const identity = (v) => v;
var words = ' Now is the time for all... '.split(/\s|\b/);
words; // ["Now", "is", "the", "time", "for", "all..."]
words.filter(identity); // ["Now", "is", "the", "time", "for", "all..."]
