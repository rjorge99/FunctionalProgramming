// partial: allows for partial application

// Curry -> Creating function, no data
// Partial Application -> Using function with data

// The last argument should be the last parameter we are acting on

function add(a, b) {
    return a + b;
}

const curryAdd = R.curry(add);
console.log(curryAdd(1)(2)); //3
