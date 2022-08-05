const not =
    (fn) =>
    (...args) =>
        !fn(...args);
const when =
    (fn) =>
    (predicate) =>
    (...args) => {
        if (predicate(...args)) return fn(...args);
    };

// Point free (style of writing functions)
// Equeational reasoning

function isOdd(v) {
    return v % 2 === 1;
}

function isEven(v) {
    return v % 2 === 0;
}

// const isEven = not(isOdd); // <--

// Excercise:
// function output(msg) {
//     console.log(msg);
// }

// function printIf(shouldPrintIf) {
//     return function (msg) {
//         if (shouldPrintIf) output(msg);
//     };
// }

function isShortEnough(str = '') {
    return str.length <= 5;
}

// function isLongEnough(str) {
//     return !isShortEnough(str);
// }

const msg1 = 'Hello';
const msg2 = msg1 + ' World';

// Solution
const output = console.log; // depending of the javascript environment, log function requires to be called from console
const isLongEnough = not(isShortEnough);
const printIf = when(output);

printIf(isShortEnough)(msg1); // Hello
printIf(isShortEnough)(msg2);
printIf(isLongEnough)(msg1);
printIf(isLongEnough)(msg2); // Hello World
