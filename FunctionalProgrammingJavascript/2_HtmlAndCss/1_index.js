const meals = [
    { name: 'Hamburger', price: '5.50' },
    { name: 'Pizza', price: '6.00' },
    { name: 'Hotdog', price: '3.50' },
    { name: 'Salad', price: '4.00' },
    { name: 'Soup', price: '2.50' },
    { name: 'Coffee', price: '2.00' }
];

const { td, th, tr, tbody, thead, table } = tags;

// cell <--
// mealRow <--
// headerRow <--
// totalRow <--
// mealBody
// mealHeader <--
// mealsTable

// Using Hyperscript
function cell(tag, className, value) {
    return tag({ className }, value);
}

function mealRow(className, meal) {
    return tr({ className }, [cell(td, 'pa2', meal.name), cell(td, 'pa2 tr', meal.price)]);
}

function mealsBody(className, meals) {
    const rows = R.map(R.partial(mealRow, ['stripe-dark']), meals);
    const rowsWithTotal = R.append(totalRow(meals), rows);
    return tbody({ className }, rowsWithTotal);
}

const headerRow = tr([cell(th, 'pa2 tl', 'Meal'), cell(th, 'pa2 tr', 'Price')]);
const mealHeader = thead(headerRow);

function totalRow(meals) {
    const total = R.pipe(
        R.map((meal) => meal.price),
        R.reduce(R.add, 0)
    )(meals);
    return tr({ className: 'bt b' }, [cell(td, 'pa2 tr', 'Total:'), cell(td, 'pa2 tr', total)]);
}

function mealsTable(meals) {
    return table({ className: 'mw5 center w-100 collapse' }, [mealHeader, mealsBody('', meals)]);
}

const node = document.getElementById('app');
const view = mealsTable(meals);
node.appendChild(view);

// Other alternative
// https://jsbin.com/nusobel/edit?js,output
