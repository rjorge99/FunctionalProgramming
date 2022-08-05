function strBuilder(str) {
    return function (v) {
        if (typeof str === 'string') return strBuilder(str + v);
        return str;
    };
}

// Lazy
function repeater(count) {
    return function allTheAs() {
        return ''.padStart(count, 'A');
    };
}

// Eager
function repeater(count) {
    const str = ''.padStart(count, 'A');
    return function allTheAs() {
        return str;
    };
}

// Best of both worlds
function repeater(count) {
    let str;
    return function () {
        if (str === undefined) str = ''.padStart(count, 'A');
        return str;
    };
}

// Using memoization
function repeater(count) {
    return memoize(function allTheAs() {
        return ''.padStart(count, 'A');
    });
}

// Referencial Transparency
// A function call is pure, if a function call can be replaced with its return value and not affect
// any of the rest of the program

// ------------------ Generalized to specialized ------------------
// Option 1
function ajax(url, data, cb) {}
ajax(customer_api, { id: 42 }, renderCustomer);

// Specialized
function getCustomer(data, cb) {
    return ajax(customer_api, data, cb);
}
getCustomer({ id: 42 }, renderCustomer);

// Moooore specialized
function getCurrentUser(cb) {
    return getCustomer({ id: 42 }, cb);
}
getCurrentUser(renderCustomer);

// ------ Partial Application (A way to specialization)
function ajax(url, data, cb) {}
const getCustomer = partial(ajax, customer_api);
const getCurrenUser = partial(getCustomer, { id: 42 });
getCustomer({ id: 42 }, renderCustomer);
getCurrenUser(renderCustomer);

// ------ Currying (A way to specialization)
function ajax(url) {
    return function getData(data) {
        return function getCB(cb) {};
    };
}
ajax(customer_api)({ id: 42 })(renderCustomer);
const getCustomer = ajax(customer_api);
const getCurrentUser = getCustomer({ id: 42 });

// Using Curry no manually
const ajax = curry(3, function ajax(url, data, cb) {});
const getCustomer = ajax(customer_api);
const getCurrentUser = getCustomer({ id: 42 });

// Using specialization
function add(x, y) {
    return x + y;
}
[1, 2, 3, 4].map(function addOne(v) {
    return add(1, v);
});

add = curry(add);
[(1, 2, 3, 4)].map(add(1)); // Map should provide only one parameter
