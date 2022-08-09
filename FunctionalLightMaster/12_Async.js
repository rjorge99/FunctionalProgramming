// RxJs

var a = new Rx.Subject();

setInterval(() => {
    a.next(Math.random());
}, 1000);

var b = a.map((x) => x * 2);

b.subscribe((x) => {
    console.log(x);
});
