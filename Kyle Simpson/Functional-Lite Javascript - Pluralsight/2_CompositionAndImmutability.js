// Composition -> toke tho output of one function as an input of another function

function sum(x, y) {
    return x + y;
}
function mult(x, y) {
    return x * y;
}

// Impure
var z = mult(3, 4);
z = sum(z, 10);
z; // 22

// Manual composition
sum(mult(3, 4), 10); // 22

function compose2(fn1, fn2) {
    return function composed() {
        let args = [].slice.call(arguments);
        return fn2(fn1(args.shift(), args.shift()), args.shift());
    };
}

console.log(compose2(mult, sum)(3, 4, 10)); // 22

// Immutable data -> data that cannot be changed after it is created
// Impure
function doubleThemMutable(list) {
    for (let i = 0; i < list.length; i++) list[i] = list[i] * 2;
}

// Pure
function doubleThemImmutable(list) {
    let newList = [];
    for (let i = 0; i < list.length; i++) newList[i] = list[i] * 2;
    return newList;
}
