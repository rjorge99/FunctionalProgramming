// Arrays
function foo() { return [1, 2, 3]; }

var [a, b, c] = foo(); // a = 1, b = 2, c = 3
var [a, b = 2, c] = foo(); // Default values

var x = 10, y = 20;
[x, y] = [y, x]; // swap

var a = [1, 2, 3];
[, , ...a] = [0, ...a, 4]; // Dump

[a, b, [c, , e]] = [1, 2, [3, 4, 5]];


// Objects
function foo() { return { a: 1, b: 2, c: 3 }; }

var { a: a, b: b, c: c } = foo();
var { a, b, c } = foo();
var { a, b: x = 42, c } = foo(); // assigment to x
var { a = 10, b, c } = foo(); // default value in case doesnt exists


function foo() { return { a: 1, b: 2, c: 3, d: { e: 4 } }; }
var {
    a, b, c,
    d: { e } = {}
} = foo(); //default to d, d is not defined, only e


var defaults = {
    method: "post",
    headers: {
        "Content-type": "text/plain"
    },
    callback: function (){ }
}

var config = {
    url: "http...",
    callback: foo,
    headers: {
        "x-requested-with": "foo"
    }
}

{
    let {
        method = defaults.method,
        url,
        callback = defaults.callback,
        headers: {
            "Content-type": contentType = defaults.headers['Content-type'],
            'x-requested-with': xRequestedWith
        }
    } = config;

    config = {
        method,
        url,
        callback,
        headers: {
            contentType,
            xRequestedWith
        }
    }
}

// Exercise
function ajax(url, cb) {
    cb({
        foo: 2,
        baz: [6, 8, 10],
        bam: {
            qux: 12
        }
    })
}

function check(data) {
    console.log(56 === data.foo + data.bar + data.baz[0] + data.baz[1] + data.baz[2] + data.bam.qux + data.bam.qam); // true
}

var defaults = {
    foo: 0,
    bar: 4,
    bam: {
        qux: 0,
        qam: 14
    }
}

function response({
    foo = defaults.foo,
    bar = defaults.bar,
    baz,
    bam: {
        qux = defaults.bam.qux,
        qam = defaults.bam.qam
    }
} = {}) {

    check({
        foo,
        bar,
        baz,
        bam: {
            qux,
            qam
        }
    })
}

ajax("http...", response)