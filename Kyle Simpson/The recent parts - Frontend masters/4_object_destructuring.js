function foo() { return { a: 1, b: 2, c: 3, d: 4, e: 5 }; }

var { a: first, b: second, c: third } = foo(); // creates first, second and third variables with the values of the properties a, b and c of the object returned by foo()
var { a, b, c } = foo(); // creates a, b and c variables with the values of the properties a, b and c of the object returned by foo()

var { a = 2, b, c, ...rest } = foo(); // with rest operator and results

var a, b, c;
({ a, b, c } = foo()); // just asigning the results to variables


function bar() { return null; }
var { a, b } = bar || {}; // with default values to avoid errors

function bar(){ return { a: 1, b: 2, c: { d: 3 } }; }
var { a, b, c: { d } } = bar(); // with nested objects, (c will not exist, only d)


function data({ a, b, c }) { }
data({a: 1, b: 2, c: 3}); // with destructuring in function parameters

var obj = { a: 1, b: { d: 3, e: 4 }, c: 3 };
var { a, b: { d, e } = {}, c } = obj; // with nested objects and default values


var obj = { a: 1, b: [3, 4], c: 3 };
var { a, b: [x,y] = [], c } = obj; // with nested arrays and default values