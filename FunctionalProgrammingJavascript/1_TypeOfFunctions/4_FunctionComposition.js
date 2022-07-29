// Making new functions using other functions by composition

const sentence =
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo a fugiat accusamus suscipit aspernatur voluptatem! Nemo eius cum porro aliquid';

const wordList = R.split(' ', sentence);
console.log(wordList);

const wordCount = R.length(wordList);
console.log(wordCount); // 20

// Using functional composition
const wordCount2 = R.compose(R.length, R.split);
console.log(wordCount2(' ', sentence)); // 20

// Using curried functions
const wordCount3 = R.compose(R.length, R.split(' '));
console.log(wordCount3(sentence)); // 20

// Same as compose, but from left to right
const wordCount4 = R.pipe(R.split(' '), R.length);
console.log(wordCount4(sentence)); // 20

// Exercise
// Count how many digits there are in the following
// sentence, using functional composition
const sentence2 =
    'PechaKucha is a presentation style in which 20 slides are shown for 20 seconds each (6 minutes and 40 seconds in total).';


const numbersInString = R.pipe(
    R.split(''),
    R.map(parseInt),
    R.filter(Number.isInteger),
    R.length
);

expect(numbersInString(sentence)).toBe(7);

console.log('If you see this printed in the console, the test passed!');
