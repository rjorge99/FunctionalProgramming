function add_item_to_cart(name, price) {
    var item = make_cart_item(name, price);
    shopping_cart = add_item(shopping_cart, item);
    var total = calc_total(shopping_cart);
    set_cart_total_dom(total);
    update_shipping_icons(shopping_cart);
    update_tax_dom(total);
    black_friday_promotion(shopping_cart); // <--
}

// defensive copying -> ll let us call the function safely without violating copy-on-write
