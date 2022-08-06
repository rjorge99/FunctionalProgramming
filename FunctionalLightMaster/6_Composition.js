const basePrice = 3;

const minus2 = (x) => x - 2;
var triple = (x) => x * 3;
var increment = (x) => x + 1;

var totalCost = basePrice + minus2(triple(increment(4)));

// More semantic version of the above
const shippingRate = (x) => minus2(triple(increment(x)));
var totalCost = basePrice + shippingRate(4);

// Even more declartive
const shippingRateComposed = compose(minus2, triple, increment); // From right to left
const shippingRatePiped = compose(increment, triple, minus2); // From left to right

// Compose and pipe
const pipe = (fns) => (v) => fns.reduce((v, f) => f(v), v);
function pipe(fns) {
    return function (v) {
        for (const fn of fns) v = fn(v);
        return v;
    };
}
const compose = (fns) => pipe(...fns.reverse());

// Associativity
var f = compose(compose(minus2, triple), increment); // minus2 <- triple <- increment
var p = compose(minus2, compose(triple, increment)); // minus2 <- triple <- increment
f(4); // 13
p(4); // 13

// Composition + Currying
var sum = (a, b) => a + b;
var triple = (a) => a * 3;
var divBy = (y, x) => x / y;

divBy(2, triple(sum(3, 5))); // 12

var sum = curry(2, sum);
var divBy = curry(2, divBy);
compose(divBy(2), triple, sum(3))(5); // 12

var mod2 = mod(2);
var eq1 = eq(1);
var isOdd = (v) => eq1(mod2(v));

var isOdd = compose(eq(1), mod(2));
var isOdd = compose(eq(1), mod(2));
