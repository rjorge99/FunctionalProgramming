// Code smell: Implicit argument in function name
//  If you are referring to a value in the body of a function,
// and that value is named in the function name, this smell applies
function objectSet(object, key, value) {
    var copy = Object.assign({}, object);
    copy[key] = value;
    return copy;
}

// Before (Price in function name and used in body)
function setPriceByName(cart, name, price) {
    var item = cart[name];
    var newItem = objectSet(item, 'price', price);
    var newCart = objectSet(cart, name, newItem);
    return newCart;
}
cart = setPriceByName(cart, 'shoe', 13);
cart = setQuantityByName(cart, 'shoe', 3);
cart = setShippingByName(cart, 'shoe', 0);
cart = setTaxByName(cart, 'shoe', 2.34);

// After
function setFieldByName(cart, name, field, value) {
    var item = cart[name];
    var newItem = objectSet(item, field, value);
    var newCart = objectSet(cart, name, newItem);
    return newCart;
}
cart = setFieldByName(cart, 'shoe', 'price', 13);
cart = setFieldByName(cart, 'shoe', 'quantity', 3);
cart = setFieldByName(cart, 'shoe', 'shipping', 0);
cart = setFieldByName(cart, 'shoe', 'tax', 2.34);

// Execrise
function incrementFieldByName(cart, name, field) {
    var item = cart[name];
    var value = item[field];
    var newField = value + 1;
    var newItem = objectSet(item, field, newField);
    var newCart = objectSet(cart, name, newItem);
    return newCart;
}
