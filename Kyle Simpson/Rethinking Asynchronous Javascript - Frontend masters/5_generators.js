function* main(){
    yield 1;
    yield 2;
    yield 3;
}

var it = main();
it.next(); // { value: 1, done: false }
it.next(); // { value: 2, done: false }
it.next(); // { value: 3, done: false }
it.next(); // { value: undefined, done: true }  -> in case we "return" a value, it will be returned in the value property

function coroutine(generator) {
    var it  = generator();

    return function () {
        return it.next.apply(it, arguments);
    }
}


var run = coroutine(function* () {
    var x = 1 + (yield);
    var y = 1 + (yield);
    yield (x + y);
});

run(); // { value: null, done: false }
run(10); // { value: null, done: false }
console.log('The meaning of life: ' + run(30).value); // The meaning of lif: 42
run(); // { value: undefined, done: true }

// Async generators 
function getData(data) {
    setTimeout(function () { run(data); }, 1000);
}

var run = coroutine(function* () {
    var x = 1 + (yield getData(10));
    var y = 1 + (yield getData(30));
    var answer = yield getData('Meaning of life: ' + (x + y));
    console.log(answer); // Meaning of life: 42
});
run();

// async/await generators
function fetchUrl(url) {
    return new Promise(function (resolve) {
        var timer = Math.floor(Math.random() * 4 * 1000);
        setTimeout(function () {
            resolve(url);
        }, 100);
    });
}

async function* fetchUrls(urls) {
    for (const url of urls) {
        let resp = await fetchUrl(url);
        yield resp.toUpperCase();
    }
}

async function mainSites(favoritesSites) {
     var it = fetchUrls(favoritesSites);

    while (true) {
        let res = await it.next();
        if(res.done) break;

        let text = res.value;
        console.log(text);
    }
}



mainSites(['google.com', 'facebook.com', 'twitter.com', 'linkedin.com']);

async function mainSites(favoritesSites) {
    for await (let text of fetchUrls(favoritesSites)) {
        console.log(text); // GOOGLE.COM, FACEBOOK.COM, TWITTER.COM
    }
}


