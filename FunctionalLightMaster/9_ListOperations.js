// Reduce: Combining
function addToRecord(record, [key, value]) {
    return { ...record, [key]: value };
}

function reduce(reducer, initialVal, arr) {
    var acc = initialVal;
    for (const el of arr) acc = reducer(acc, el);
    return acc;
}

const r = reduce(addToRecord, {}, [
    ['name', 'John'],
    ['age', 30]
]); // { name: 'John', age: 30 }

const pipe =
    (...fns) =>
    (x) =>
        fns.reduce((v, f) => f(v), x);

const compose = (...fns) => pipe(fns.reverse());

// Exercise
// const five = () => 5;
// const nine = () => 9;
const add = (a, b) => a + b;
const add2 = (fn1, fn2) => add(fn1(), fn2());
const constant = (x) => () => x;
const five = constant(5);
const nine = constant(9);
// add2(five, nine); // 14

// Iterative
// function addn(...fns) {
//     while (fns.length > 2) {
//         let [fn0, fn1, ...rest] = fns;
//         fns = [
//             function () {
//                 return add2(fn0, fn1);
//             },
//             ...rest
//         ];
//     }
//     return add2(fns[0], fns[1]);
// }

// Recursive
// function addn([fn0, fn1, ...rest]) {
//     if (rest.length === 0) return add2(fn0, fn1);
//     return addn([
//         function () {
//             return add2(fn0, fn1);
//         },
//         ...rest
//     ]);
// }

// Reduce
// const addn = (...fns) => fns.reduce((v, fn) => v + fn(v), 0);
function addn(...fns) {
    return fns.reduce(function (composedFns, fn) {
        return function () {
            return add2(composedFns, fn);
        };
    })();
}

const result = addn(constant(3), constant(4), constant(6)); // 7
console.log(result);
