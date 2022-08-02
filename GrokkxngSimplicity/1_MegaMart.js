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
    shopping_cart = add_item(shopping_cart, name, price);

    var total = calc_total(shopping_cart);
    set_cart_total_dom(total);
    update_shipping_icons(cart);
    update_tax_dom(total);
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
function add_item(cart, name, price) {
    return [...cart, { name, price }];
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
        const newCart = add_item(cart, item.name, item.price);
        if (get_free_shipping(newCart)) button.show_free_shipping_icon();
        else button.hide_free_shipping_icon();
    }
}

function get_free_shipping(cart) {
    return calc_total(cart) >= 20;
}

function set_cart_total_dom(total) {
    // ...
    total;
    // ...
}
