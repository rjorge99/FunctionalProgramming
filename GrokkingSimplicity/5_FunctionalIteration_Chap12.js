function emailsForCustomers(customers, goods, bests) {
    var emails = [];
    for (var i = 0; i < customers.length; i++) {
        var customer = customers[i];
        var email = emailForCustomer(customer, goods, bests);
        emails.push(email);
    }
    return emails;
}
function emailsForCustomers(customers, goods, bests) {
    var emails = [];
    forEach(customers, function (customer) {
        var email = emailForCustomer(customer, goods, bests);
        emails.push(email);
    });
    return emails;
}

function map(array, f) {
    var newArray = [];
    forEach(array, function (element) {
        newArray.push(f(element));
    });
    return newArray;
}
function filter(array, predicate) {
    var newArray = [];
    forEach(array, function (element) {
        if (predicate(element)) newArray.push(element);
    });
    return newArray;
}
function reduce(array, init, reducer) {
    var accum = init;
    for (const item of array) accum = reducer(accum, item);
    return accum;
}

const result = reduce([1, 2, 3, 4], 0, (accum, element) => accum + element);
