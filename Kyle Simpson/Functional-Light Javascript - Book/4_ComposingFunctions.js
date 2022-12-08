// const compose2 = (fn2, fn1) => (origValue) => fn2(fn1(origValue));
// const compose =
//     (...fns) =>
//     (result) => {
//         var list = [...fns];
//         while (list.length > 0) {
//             // take the last function off the end of the list
//             // and execute it
//             result = list.pop()(result);
//         }
//         return result;
//     };
// const compose =
//     (...fns) =>
//     (result) =>
//         [...fns].reverse().reduce((result, fn) => fn(result), result);
// const compose = (...fns) =>
//     fns.reverse().reduce(
//         (fn1, fn2) =>
//             (...args) =>
//                 fn2(fn1(...args))
//     );
// Using Recursion
// var compose = (...fns) => {
//     // pull off the last two arguments
//     var [fn1, fn2, ...rest] = fns.reverse();
//     var composedFn = (...args) => fn2(fn1(...args));
//     if (rest.length == 0) return composedFn;
//     return compose(...rest.reverse(), composedFn);
// };
// const prop = (name, obj) => obj[name];
// const makeObjProp = (name, value) => setProp(name, {}, value);

function words(str) {
    return String(str)
        .toLowerCase()
        .split(/\s|\b/)
        .filter(function alpha(v) {
            return /^[\w]+$/.test(v);
        });
}

function unique(list) {
    var uniqList = [];
    for (let v of list) {
        // value not yet in the new list?
        if (uniqList.indexOf(v) === -1) {
            uniqList.push(v);
        }
    }
    return uniqList;
}

var text =
    'To compose two functions together, pass the output of the first function call as the input of the second function call.';
var wordsFound = words(text);
var wordsUsed = unique(wordsFound);
wordsUsed; // ["to","compose","two","functions","together","pass", "the","output","of","first","function","call","as", "input","second"]

// The order of operations will be right to left, or inner to outer.
const wordsUsed = unique(words(text)); // <--

function uniqueWords(str) {
    return unique(words(str));
}

// Compose
function compose2(fn2, fn1) {
    return function composed(origValue) {
        return fn2(fn1(origValue));
    };
}
const uniqueWords = compose2(unique, words);

function compose(...fns) {
    return function composed(result) {
        // copy the array of functions
        var list = [...fns];
        while (list.length > 0) {
            // take the last function off the end of the list
            // and execute it
            result = list.pop()(result);
        }
        return result;
    };
}

function skipShortWords(words) {
    var filteredWords = [];
    for (let word of words) {
        if (word.length > 4) {
            filteredWords.push(word);
        }
    }
    return filteredWords;
}
const biggerWords = compose(skipShortWords, unique, words);

// Options for the compose function
function compose(...fns) {
    return function composed(result) {
        return [...fns].reverse().reduce(function reducer(result, fn) {
            return fn(result);
        }, result);
    };
}

function compose(...fns) {
    return fns.reverse().reduce(function reducer(fn1, fn2) {
        return function composed(...args) {
            return fn2(fn1(...args));
        };
    });
}
function compose(...fns) {
    // pull off the last two arguments
    var [fn1, fn2, ...rest] = fns.reverse();
    var composedFn = function composed(...args) {
        return fn2(fn1(...args));
    };
    if (rest.length == 0) return composedFn;
    return compose(...rest.reverse(), composedFn);
}

// ------------------------------------------------------------
// Pipe
function pipe(...fns) {
    return function piped(result) {
        var list = [...fns];
        while (list.length > 0) {
            // take the first function from the list
            // and execute it
            result = list.shift()(result);
        }
        return result;
    };
}
const pipe = reverseArgs(compose);
const biggerWords2 = pipe(words, unique, skipShortWords);

// ------------------------------------------------------------
// Abstraction
// Abstraction plays heavily into our reasoning about composition, so let’s examine it in more detail.
// By using composition

// imperative
function shorterWords(text) {
    return skipLongWords(unique(words(text)));
}
// declarative
var shorterWords = compose(skipLongWords, unique, words);

// By contrast, what if we hadn’t used composition abstraction?
var wordsFound = words(text);
var uniqueWordsFound = unique(wordsFound);
skipLongWords(uniqueWordsFound);
// Or even:
skipLongWords(unique(words(text)));

// ------------------------------------------------------------
// Revisiting Points
// given: ajax( url, data, cb )
const getPerson = partial(ajax, 'http://some.api/person');
const getLastOrder = partial(ajax, 'http://some.api/order', { id: -1 });
getLastOrder(function orderFound(order) {
    getPerson({ id: order.personId }, function personFound(person) {
        output(person.name);
    });
});

function extractName(person) {
    return person.name;
}

function prop(name, obj) {
    return obj[name];
}
function setProp(name, obj, val) {
    var o = Object.assign({}, obj);
    o[name] = val;
    return o;
}

//  Applying removing "points"
const output = (text) => console.log(text);
const extractName = partial(prop, 'name'); // <--
const outputPersonName = compose(output, extractName); // <--
// getLastOrder(function orderFound(order) {
//     getPerson({ id: order.personId }, outputPersonName);
// });
const processPerson = partialRight(getPerson, outputPersonName);
getLastOrder(function orderFound(order) {
    processPerson({ id: order.personId });
});

function makeObjProp(name, value) {
    return setProp(name, {}, value);
}
const personData = partial(makeObjProp, 'id');
const extractPersonId = partial(prop, 'personId');

const lookupPerson = compose(processPerson, personData, extractPersonId);

getLastOrder(lookupPerson); // <-- Final Result Point Free

// Less verbose option
partial(ajax, 'http://some.api/order', { id: -1 })(
    compose(
        partialRight(
            partial(ajax, 'http://some.api/person'),
            compose(output, partial(prop, 'name'))
        ),
        partial(makeObjProp, 'id'),
        partial(prop, 'personId')
    )
);
