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

// --------------------------------Excercise --------------------------------
const msg1 = 'Hello';
const msg2 = msg1 + ' World';
// function output(msg) {
//     console.log(msg);
// }
// function printIf(shouldPrintIf) {
//     return function (msg) {
//         if (shouldPrintIf) output(msg);
//     };
// }
// function isLongEnough(str) {
//     return !isShortEnough(str);
// }

function isShortEnough(str = '') {
    return str.length <= 5;
}

// ---------------------------------Solution ---------------------------------
const output = console.log; // depending of the javascript environment, log function requires to be called from console
const isLongEnough = not(isShortEnough);
const printIf = when(output);

printIf(isShortEnough)(msg1); // Hello
printIf(isShortEnough)(msg2);
printIf(isLongEnough)(msg1);
printIf(isLongEnough)(msg2); // Hello World

// ---------------------------------Advanced Free Points ---------------------------------
const mod = (y) => (x) => x % y;
const eq = (y) => (x) => x === y;

const mod2 = mod(2);
const eq1 = eq(1);

function isOdd(x) {
    return eq1(mod2(x));
}

function compose(fn2, fn1) {
    return function (v) {
        return fn2(fn1(v));
    };
}

const isOdd = compose(eq1, mod2); // Point free definition for isOdd
const isOdd = compose(eq(1), mod(2)); // Final point free definition for isOdd
