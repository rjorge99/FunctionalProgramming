// When we read a function with a straightforward implementation,
// the problem the function signature presents should be solved
// at the right level of detail in the body

function freeTieClip(cart) {
    var hasTie = false;
    var hasTieClip = false;
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        if (item.name === 'tie') hasTie = true;
        if (item.name === 'tie clip') hasTieClip = true;
    }
    if (hasTie && !hasTieClip) {
        var tieClip = make_item('tie clip', 0);
        return add_item(cart, tieClip);
    }
    return cart;
}

// Refactor
// The new implementation is shorter, which often helps make it clear.
function isInCart(cart, name) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === name) return true;
    }
    return false;
}
function freeTieClip(cart) {
    var hasTie = isInCart(cart, 'tie'); // <--
    var hasTieClip = isInCart(cart, 'tie clip'); // <--
    if (hasTie && !hasTieClip) {
        var tieClip = make_item('tie clip', 0);
        return add_item(cart, tieClip);
    }
    return cart;
}

// ********************
// Original
function remove_item_by_name(cart, name) {
    var idx = null;
    // This section, too much detail
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === name) idx = i;
    }
    if (idx !== null) return removeItems(cart, idx, 1);
    return cart;
}
// Refactor
function remove_item_by_name(cart, name) {
    var idx = indexOfItem(cart, name); // <--
    if (idx !== null) return removeItems(cart, idx, 1);
    return cart;
}
function indexOfItem(cart, name) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === name) return i;
    }
    return null;
}
