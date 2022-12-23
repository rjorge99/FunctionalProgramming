function foo() { return [1, 2, 3, 4, 5]; }

var [a, b, c] = foo();
var [a, b = 12, c] = foo(); // with default value
var [a, b, c, ...rest] = foo(); // with rest of results

var temp;
var [a, b, c, ...rest] = temp =  foo(); // if we want also the complete results

var a, b, c;
[a, b, c] = foo(); // just asigning the results to variables

var o = {};
[o.a, o.b, o.c] = foo(); // asigning the results to object properties

var o = [];
[o[0], o[1], o[2]] = foo(); // asigning the results to array elements

var [a, , c] = foo(); // skipping some results

var x = 10;
var y = 20;
[x, y] = [y, x]; // swapping values


function bar({ a = 10, b = 20, c = 30 } = {}) { return null; }
var [a, b, c] = bar() || []; // with default values to avoid errors


function data() { return [1, [2, 3], 4] }
var [a, [b,c], d] = data();