const meals = [
    { name: 'Hamburger', price: '5.50' },
    { name: 'Pizza', price: '6.00' },
    { name: 'Hotdog', price: '3.50' },
    { name: 'Salad', price: '4.00' },
    { name: 'Soup', price: '2.50' },
    { name: 'Coffee', price: '2.00' }
];

function cell(tag, className, value) {
    return tag({ className }, value);
}
