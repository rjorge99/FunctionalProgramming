function getFile(file) {
    return new Promise(function (resolve) {
        fakeAjax(file, resolve);
    });
}

async function loadFiles(files) {
    var prs = files.map(getFile);
    for (let pr of prs) console.log(await pr);
}

loadFiles(['file1', 'file2', 'file3']);

function fakeAjax(url, cb) {
    var fake_responses = {
        file1: 'The first text',
        file2: 'The middle text',
        file3: 'The last text'
    };
    var randomDelay = (Math.round(Math.random() * 1e4) % 8000) + 1000;

    console.log('Requesting: ' + url);

    setTimeout(function () {
        cb(fake_responses[url]);
    }, randomDelay);
}

// async generators
function fetchUrl(url) {
    return new Promise(function (resolve) {
        var timer = Math.floor(Math.random() * 1000);
        setTimeout(function () {
            resolve(url);
        }, timer);
    });
}

async function* fetchUrls(urls) {
    for (const url of urls) {
        let resp = await fetchUrl(url);
        yield resp.toUpperCase();
    }
}

async function main(favoriteSites) {
    var it = fetchUrls(favoriteSites);
    while (true) {
        let res = await it.next();
        if (res.done) break;
        let text = res.value;

        console.log(text); //  'GOOGLE.COM', 'FACEBOOK.COM', 'YOUTUBE.COM'
    }
}
main(['google.com', 'facebook.com', 'twitter.com']);

async function main(favoriteSites) {
    for await (let text of fetchUrls(favoriteSites)) {
        console.log(text); //  'GOOGLE.COM', 'FACEBOOK.COM', 'YOUTUBE.COM'
    }
}
