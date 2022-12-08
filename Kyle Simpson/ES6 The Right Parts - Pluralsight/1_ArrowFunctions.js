// Imperative -> telling the computer HOW to do something
// Declarative -> telling WHAT the end result should be

() => 2;

let obj = {
    name: 'text',
    foo: function () {
        setTimeout(() => {
            console.log(this.name);
        }, 100);
    }
};
