// thunk -> defers the execution of a function until later
// has all the needed arguments to execute the function

// sync thunk
function add(x, y) { return x + y; }
var thunk = function() { return add(10, 15); };
thunk(); // 25


// async thunk -> we need to pass a callback to the function
function addAsync(x, y, cb) {
    setTimeout(function() {
        cb(x + y);
    }, 1000);
}
var thunk = function (cb) {
    return addAsync(10, 15, cb);
};
thunk(console.log); // 25

function makeThunk(...args) { // passive thunk, needs to be executed
    var fn = args.shift();
    return function(cb) {
        args.push(cb);
        return fn.apply(null, args);
    }
}
var thunk = makeThunk(addAsync, 10, 15);
thunk(console.log); // 25

// Meaning of life sample with thunks
function getData(data, cb) { 
    setTimeout(function() {
        cb(data);
    }, 1000);
}

var get10 = makeThunk(getData, 10);
var get30 = makeThunk(getData, 30);

get10(function (num1) {
    var x = 1 + num1;
    get30(function (num2) {
        var y = 1 + num2;
        var getAnswer = makeThunk(getData, "Meaning of life: " + (x + y));
        getAnswer(console.log); // Meaning of life: 42
    });
});

// Exercise
function fakeAjax(url, cb) { 
    var fake_responses = {
        "file1": "The first text",
        "file2": "The middle text",
        "file3": "The last text"
    };

    var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;
    console.log("Requesting: " + url);

    setTimeout(function() {
        cb(fake_responses[url]);
    }, randomDelay);
}

function output(text) {
    console.log(text);
}

function getFile(file) {  // generates an eager thunk
    var text, fn;

    fakeAjax(file, function(response) {
        if (fn) fn(response);
        else text = response;
    });

    return function(cb) {
        if (text) cb(text);
        else fn = cb;
    }
}

var th1 = getFile("file1");
var th2 = getFile("file2");
var th3 = getFile("file3");

th1(response => {
    output(response);
    th2(response => {
        output(response);
        th3(response => {
            output(response);
            output("Complete!");
        });
    });
})

function makeEagerThunk(...args) {
    var funct = args.shift(),
        fn,
        result;

    funct(...args, function (response) {
        if (fn) fn(response);
        else result = response;
    })

    return function (cb) {
        if (result) cb(result);
        else fn = cb;
    }
}

var th1eager= makeEagerThunk(fakeAjax, "file1");
var th2eager= makeEagerThunk(fakeAjax, "file2");
var th3eager= makeEagerThunk(fakeAjax, "file3");

th1eager(response => {
    output(response);
    th2eager(response => {
        output(response);
        th3eager(response => {
            output(response);
            output("Complete!");
        });
    });
});