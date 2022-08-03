// Original
function add_item_to_cart(name, price) {
    var item = make_cart_item(name, price);
    shopping_cart = add_item(shopping_cart, item);
    var total = calc_total(shopping_cart);
    set_cart_total_dom(total);
    update_shipping_icons(shopping_cart);
    update_tax_dom(total);
    black_friday_promotion(shopping_cart); // <-- we need to add this line of code, but it will mutate the shopping cart
}

// defensive copying -> ll let us call the function safely without violating copy-on-write

// Copy before sharnig data
function add_item_to_cart(name, price) {
    var item = make_cart_item(name, price);
    shopping_cart = add_item(shopping_cart, item);
    var total = calc_total(shopping_cart);
    set_cart_total_dom(total);
    update_shipping_icons(shopping_cart);
    update_tax_dom(total);
    const cart_copy = deepCopy(shopping_cart); // <-- Copy data before sharnig data
    black_friday_promotion(cart_copy);
    shopping_cart = deepCopy(cart_copy); // <-- Copy data as it enters
}

// Refactor previous code extracting the function
function add_item_to_cart(name, price) {
    var item = make_cart_item(name, price);
    shopping_cart = add_item(shopping_cart, item);
    var total = calc_total(shopping_cart);
    set_cart_total_dom(total);
    update_shipping_icons(shopping_cart);
    update_tax_dom(total);

    shopping_cart = black_friday_promotion_safe(shopping_cart); // <--
}
function black_friday_promotion_safe(cart) {
    var cart_copy = deepCopy(cart);
    black_friday_promotion(cart_copy);
    return deepCopy(cart_copy);
}
