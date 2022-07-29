const greet = (greet, name) => `${greet} ${name}`;

const friends = ['John', 'Jane', 'Mary'];

const greetCurry = R.curry(greet);

const greetings = friends.map(greetCurry('Hello'));
// [ 'Hello John', 'Hello Jane', 'Hello Mary' ]

console.log(greetCurry('Hello', 'John')); // <-- Still works as expected
// 'Hello John'
