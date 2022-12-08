// Transducing
// Transduction -> composition of reducers
const add1 = (x) => x + 1;
const isOdd = (x) => x % 2 === 1;
const sum = (x, y) => x + y;

var list = [1, 2, 3, 4, 5];

list.map(add1).filter(isOdd).reduce(sum);

var transducer = compose(mapReducer(add1), filterReducer(isOdd));
transduce(transducer, sum, 0, list);
into(transducer, 0, list); // Doesn't require a reducer

// Deriving transduction
function mapWithReducer(arr, mappingFn) {
    return arr.reduce((list, v) => {
        list.push(mappingFn(v));
        return list;
    }, []);
}

function filterWithReducer(arr, predicateFn) {
    return arr.reduce((list, v) => {
        if (predicateFn(v)) {
            list.push(v);
        }
        return list;
    }, []);
}
var list = [1, 2, 3, 4, 5];
list = mapWithReducer(list, add1);
list = filterWithReducer(list, isOdd);
list.reduce(sum);

function mapReducer(mappingFn) {
    return function reducer(list, v) {
        list.push(mappingFn(v));
        return list;
    };
}

function filterReducer(predicateFn) {
    return function reducer(list, v) {
        if (predicateFn(v)) {
            list.push(v);
        }
        return list;
    };
}

list.reduce(mapReducer(add1), []).reduce(filterReducer(isOdd), []).reduce(sum);

// Combiner and currying
function listCombination(list, v) {
    list.push(v);
    return list;
}
function mapReducer(mappingFn) {
    return function reducer(list, v) {
        return listCombination(list, mappingFn(v));
    };
}
function filterReducer(predicateFn) {
    return function reducer(list, v) {
        if (predicateFn(v)) return listCombination(list, v);
        return list;
    };
}
list.reduce(mapReducer(add1), []).reduce(filterReducer(isOdd), []).reduce(sum);

// Using currying to provide the combiner
var mapReducer = curry(2, function mapReducer(mappingFn, combinerFn) {
    return function reducer(list, v) {
        return combinerFn(list, mappingFn(v));
    };
});
var filterReducer = curry(2, function filterReducer(predicateFn, combinerFn) {
    return function reducer(list, v) {
        if (predicateFn(v)) return combinerFn(list, v);
        return list;
    };
});
list.reduce(mapReducer(add1)(listCombination), [])
    .reduce(filterReducer(isOdd)(listCombination), [])
    .reduce(sum);

// Using transducer composition
var transducer = compose(mapReducer(add1), filterReducer(isOdd));
list.reduce(trasducer(listCombination), []).reduce(sum);

list.reduce(transducer(sum), 0); // <-- final
