// Concise mothads and properties

var a = 1;
var c = 'Hello';
var obj = {
    a, // concise property
    b() { }, // concise method
    [c]: 4, // computed property
    [c + 'fn']() { } // computed method
}

// Template Strings
var name = 'Kyle';
var orderNumber = '1234';
var total = 319.00;
var msg = `Hello ${name}, your order (#${orderNumber}) was $${total}.`;

// Tagged functions
function currency(strings, ...values) {
    var str = '';
    for(var i=0; i<strings.length; i++) {
        if (i > 0) {
            if (typeof values[i-1] == 'number') str += `$${values[i-1].toFixed(2)}`;
            else str += values[i-1];
        }

        str += strings[i];
    }
    return str;
}

var msg = currency`Hello ${name}, your order (#${orderNumber}) was ${total}.`;
console.log(msg); // Hello Kyle, your order (#1234) was $319.00.

// Exercise 
function upper(strings, ...values) {
    var str = '';
    for(var i=0; i<strings.length; i++) {
        if (i > 0) str += values[i-1].toUpperCase();
        str += strings[i];
    }
    return str; 
}

var name = 'kyle',
    twitter = 'getify',
    topic = 'JS Recent Parts';

console.log(upper`Hello ${name} (@${twitter}), welcome to ${topic}!`); // Hello KYLE (@GETIFY), welcome to JS RECENT PARTS!
