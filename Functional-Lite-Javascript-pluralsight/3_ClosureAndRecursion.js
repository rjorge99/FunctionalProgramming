// Closure -> function remembers the variables it has access to
// even when the function is executed outside of its lexical scope

function sumX(x) {
    return function sumY(y) {
        return x + y;
    };
}

var add10 = sumX(10);
add10(20); // 30
add10(30); // 40

// Exercise
/*
    function foo(){...}
    var x = foo(3, 4);
    x(); // 7
    x(); // 7
*/

// Solution
function foo(x, y) {
    return function () {
        return x + y;
    };
}

// Recursion
function sumRecursion() {
    var args = [].slice.call(arguments);
    if (args.length <= 2) return args[0] + args[1];
    return args[0] + sumRecursion.apply(null, args.slice(1));
}
function sumRecursion(...args) {
    if (args.length <= 2) return args[0] + args[1];
    return args[0] + sumRecursion(...args.slice(1));
}

sumRecursion(1, 2, 3, 4, 5); // 15

// Exercise
// Turn into a recursive function
function mult(x, y, z) {
    return x * y * z;
}

// Solution
function multRecursion(...args) {
    if (args.length <= 2) return args[0] + args[1];
    return args[0] * sumRecursion(...args.slice(1));
}

multRecursion(1, 2, 3, 4, 5); // 120
