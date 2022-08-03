// 1 - Original functions
var shopping_cart = [];
var shopping_cart_total = 0;

function add_item_to_cart(name, price) {
    shopping_cart.push({
        name: name,
        price: price
    });
    calc_cart_total();
}

function calc_cart_total() {
    shopping_cart_total = 0;
    for (var i = 0; i < shopping_cart.length; i++) {
        var item = shopping_cart[i];
        shopping_cart_total += item.price;
    }

    set_cart_total_dom();
    update_shipping_icons();
    update_tax_dom();
}

function update_shipping_icons() {
    var buy_buttons = get_buy_buttons_dom();
    for (var i = 0; i < buy_buttons.length; i++) {
        var button = buy_buttons[i];
        var item = button.item;
        if (item.price + shopping_cart_total >= 20) button.show_free_shipping_icon();
        else button.hide_free_shipping_icon();
    }
}

function update_tax_dom() {
    set_tax_dom(shopping_cart_total * 0.1);
}

// 2 - Creating more testable code
function add_item_to_cart(name, price) {
    var item = make_cart_item(name, price);
    shopping_cart = add_item(shopping_cart, item);

    var total = calc_total(shopping_cart);
    set_cart_total_dom(total);
    update_shipping_icons(cart);
    update_tax_dom(total);
}

function make_cart_item(name, price) {
    return {
        name,
        price
    };
}

// Becomes a calculation (Pure function)
function calc_total(cart) {
    let total = 0;
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        total += item.price;
    }

    return total;
}

// We dont modify the original array, we create a new one
function add_item(cart, item) {
    return add_element_last(cart, item);
}

function add_element_last(array, elem) {
    return [...array, elem];
}

function update_tax_dom(total) {
    set_tax_dom(calc_tax(total));
}

function calc_tax(amount) {
    return amount * 0.1;
}

function update_shipping_icons(cart) {
    var buy_buttons = get_buy_buttons_dom();
    for (var i = 0; i < buy_buttons.length; i++) {
        var button = buy_buttons[i];
        var item = button.item;

        // Option 1
        var new_cart = add_item(cart, item);
        if (gets_free_shipping(new_cart)) button.show_free_shipping_icon();
        else button.hide_free_shipping_icon();

        // Option 2
        // var hasFreeShipping = gets_free_shipping_with_item(cart, item);
        // set_free_shipping_icon(button, hasFreeShipping);
    }
}

function gets_free_shipping_with_item(cart, item) {
    var new_cart = add_item(cart, item);
    return get_free_shipping(new_cart);
}

function set_free_shipping_icon(button, isShown) {
    if (isShown) button.show_free_shipping_icon();
    else button.hide_free_shipping_icon();
}

function get_free_shipping(cart) {
    return calc_total(cart) >= 20;
}

function set_cart_total_dom(total) {
    // ...
    total;
    // ...
}

function remove_item_by_name(cart, name) {
    return cart.filter((item) => item.name !== name);
}

function delete_handler(name) {
    shopping_cart = remove_item_by_name(shopping_cart, name);
    var total = calc_total(shopping_cart);
    set_cart_total_dom(total);
    update_shipping_icons(shopping_cart);
    update_tax_dom(total);
}

// --------------------------------------------------

// 1 - Mailing list inital code
var mailing_list = [];
function add_contact(email) {
    mailing_list.push(email);
}
function submit_form_handler(event) {
    var form = event.target;
    var email = form.elements['email'].value;
    add_contact(email);
}

// 2 - Optimizing, using  o copy-on-write form
function add_contact(mailing_list, email) {
    return push(mailing_list, email);
}
function submit_form_handler(event) {
    var form = event.target;
    var email = form.elements['email'].value;
    mailing_list = add_contact(mailing_list, email);
}

function push(array, elem) {
    return [...array, elem];
}

function setPrice(item, new_price) {
    return objectSet(item, 'price', new_price);
}

function setQuantity(item, new_quantity) {
    return objectSet(item, 'quantity', new_quantity);
}

function objectSet(object, key, value) {
    return {
        ...object,
        [key]: value
    };
}

function objectDelete(object, key) {
    const o = { ...object };
    delete o[key];
    return o;
}

function setPriceByName(cart, name, price) {
    const cartCopy = [...cart];

    for (var i = 0; i < cartCopy.length; i++)
        if (cartCopy[i].name === name) cartCopy[i] = setPrice(cartCopy[i], price);

    return cartCopy;
}

function setQuantityByName(cart, name, quantity) {
    const cartCopy = [...cart];
    for (var i = 0; i < cartCopy.length; i++)
        if (cartCopy[i].name === name) cartCopy[i] = setQuantity(cartCopy[i], quantity);

    return cartCopy;
}
