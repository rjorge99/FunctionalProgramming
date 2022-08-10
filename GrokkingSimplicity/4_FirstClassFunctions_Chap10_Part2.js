// Refactoring copy-on-write for arrays

// Original
function arraySet(array, idx, value) {
    var copy = array.slice(); // <--
    copy[idx] = value;
    return copy; // <--
}

// Refactored
function arraySet(array, idx, value) {
    return withArrayCopy(array, function (copy) {
        copy[idx] = value;
    });
}
function push(array, elem) {
    return withArrayCopy(array, function (copy) {
        copy.push(elem);
    });
}
function drop_last(array) {
    return withArrayCopy(array, function (copy) {
        copy.pop();
    });
}
function drop_first(array) {
    return withArrayCopy(array, function (copy) {
        copy.shift();
    });
}

//reusable function that standardizes the discipline
function withArrayCopy(array, modify) {
    var copy = array.slice();
    modify(copy);
    return copy;
}

function withObjectCopy(object, modify) {
    var copy = Object.assign({}, object);
    modify(copy);
    return copy;
}
function objectSet(object, key, value) {
    return withObjectCopy(object, function (copy) {
        copy[key] = value;
    });
}
function objectDelete(object, key) {
    return withObjectCopy(object, function (copy) {
        delete copy[key];
    });
}

function tryCatch(f, errorHandler) {
    try {
        return f();
    } catch (error) {
        return errorHandler(error);
    }
}

function when(test, fn) {
    if (test) return fn();
}
