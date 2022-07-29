function greet(greeting, name) {
    return `${greeting} ${name}`;
}

const friends = ['John', 'Jane', 'Bob'];

// map(value, index, array)
// We want to execute map sending just one argument <-
const friendsGreeted = friends.map(greet);

function greetCurry(greeting) {
    return function (name) {
        return `${greeting} ${name}`;
    };
}

// Allows to use a function that takes one argument, with an argument
// previously defined
const friendsGreetedCurry = friends.map(greetCurry('Hello'));
// Hello John
// Hello Jane
// Hello Bob

// Higher Order Functions <--
// Function that takes a function as an argument and/or returns a function
// Makes use of closures

// Exercise <-
const studentGrades = [
    { name: 'Joe', grade: 88 },
    { name: 'Jen', grade: 94 },
    { name: 'Steph', grade: 77 },
    { name: 'Allen', grade: 60 },
    { name: 'Gina', grade: 54 }
];

const messages = {
    a: 'Excellent job',
    b: 'Nice job',
    c: 'Well done',
    d: 'What happened',
    f: 'Not good'
};

const getLetterGrade = (points) => {
    if (points >= 90) {
        return 'a';
    } else if (points >= 80) {
        return 'b';
    } else if (points >= 70) {
        return 'c';
    } else if (points >= 60) {
        return 'd';
    } else {
        return 'f';
    }
};

function feedback(messages) {
    return function (student) {
        const grade = getLetterGrade(student.grade);
        const message = messages[grade];
        return `${message} ${student.name}, you got a ${grade}`;
    };
}

const gradeFeedback = studentGrades.map(feedback(messages));
/*
studentFeedback === [
  'Nice Job Joe, you got an b', 
  'Excellent Job Jen, you got an a', 
  'Well done Steph, you got an c', 
  'What happened Allen, you got an d', 
  'Not good Gina, you got an f'
]
*/
