// Things dont change unexpectedly
// Changes should be intentional

// Assigment immutability -> after you assign a value to a variable, you can't change it
// Value immutability -> main reason for bugs, not the assigment immutability (kyle's perspective)

{
    const orderDetails = {
        orderId: 1,
        total: basePrice - shipping
    };

    if (orderedItems.length > 0) {
        orderDetails.items = orderedItems;
    }

    processOrder(orderDetails); // <-- We dont know if proccessOrder will mutate orderDetails or not
}

// The main purpose is to indicate to the reader that is not going to be mutated
processOrder(Object.freeze(orderDetails)); // <-- We know that proccessOrder will not mutate orderDetails

// Bad
function processOrder(order) {
    if (!('status' in order)) order.status = 'completed'; // <-- Mutates order
    saveToDatabase(order);
}

// Good
function processOrder(order) {
    let processOrder = { ...order };
    processOrder.status = 'completed'; // <-- Mutates copy!
    saveToDatabase(processOrder);
}

// Libraries to handle immutable data structures
// Immutable-js
// moir (used in redux toolkit)

// Exercise
function lotteryNum() {
    return Math.floor(Math.random() * 10);
}

function pickNumber() {}
var luckyLotteryNumbers = [];
while (luckyLotteryNumbers.length < 6) {
    pickNumber();
}

// Solution
function recordNumber(numbers, num) {
    if (!numbers.includes(num)) {
        numbers = [...numbers, num];
        numbers.sort((a, b) => a - b);
    }
    return numbers;
}

const NUM_COUNT = 6;
while (luckyLotteryNumbers.length < NUM_COUNT) {
    luckyLotteryNumbers = recordNumber(luckyLotteryNumbers, lotteryNum()); // freeze indicates to the reader that this is not going to be mutated
}
