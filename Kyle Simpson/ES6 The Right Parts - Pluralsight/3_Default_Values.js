// Lazy expressions
function bar() {
    console.log('!');
}

function foo(x = bar()) {} // -> bar() is not used until is needed

//rest operator (Gather)
function gatherArgs(...args) {}

gatherArgs(...[1, 2, 3, 4, 5]);
gatherArgs(...[1, 2, ...[3, 4, 5]]);
gatherArgs(...'string');
