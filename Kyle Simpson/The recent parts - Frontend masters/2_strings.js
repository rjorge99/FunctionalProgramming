// Template string
var name = 'Test';
console.log(`my name is ${name}`);

// Tagged literals
var amount = 12.23;
console.log(formatCurrency`The total is ${amount}`);

function formatCurrency(strings, ...values) {
    var str = '';
    for (var i = 0; i < strings.length; i++) {
        if (i > 0) {
            if (typeof values[i - 1] === 'number') str += '$' + values[i - 1].toFixed(2);
            else str += values[i - 1];
        }
        str += strings[i];
    }

    return str;
}

// Exercice
function upper(strings, ...values) {
    var str = '';
    for (var i = 0; i < strings.length; i++) {
        if (i > 0) str += values[i - 1].toUpperCase();
        str += strings[i];
    }

    return str;
}

var name = 'kyle',
    twitter = 'getify',
    topic = 'JS Recent Parts';

console.log(upper`Hello ${name} (@${twitter}), welcome to ${topic}!`);
// Hello KYLE (@GETIFY), welcome to JS RECENT PARTS!

// Padding
var str = 'Hello';
str.padStart(5); // "Hello"
str.padStart(8); // "   Hello"
str.padStart(8, '*'); // "***Hello"
str.padSteart(8, '12345'); // "123Hello"
str.PadStart(8, 'ab'); // "ababHello"

str.padEnd(5); // "Hello"
str.padEnd(8); // "Hello   "
str.padEnd(8, '*'); // "Hello***"
str.padEnd(8, '12345'); // "Hello123"
str.padEnd(8, 'ab'); // "Helloaba"

// Trim
str.trim();
str.trimStart();
str.trimEnd();
