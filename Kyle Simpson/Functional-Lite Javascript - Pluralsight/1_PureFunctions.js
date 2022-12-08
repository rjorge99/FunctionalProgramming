// Side effects -> something that ocurres that changes the outside state of the program.
// (console.log, change value of vareables, etc) should be avoided
// Pure functions -> no side effects, given a set of parameters, always returns the same result

// Exercise 1
// Make a pure function bar() to wrap around foo

// var y = 5,
// z;

// function foo(x) {
// y++;
// z = x * y;
// }

// foo(20);
// z; // 120

function bar(x, y) {
    var z;

    foo(x);
    return [x, z];

    function foo(x) {
        y++;
        z = x * y;
    }
}

console.log(bar(20, 5));
console.log(bar(10, 5));
console.log(bar(10, 5));
