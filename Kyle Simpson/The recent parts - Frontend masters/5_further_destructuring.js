var defaults = {
    url: "...",
    method: "GET",
    headers: {
        "Content-Type": "text/plain"
    }
};

var settings = {
    url: "http://some.api.com",
    data: {},
    callback: function () { }
};

ajax(Object.assign({}, defaults, settings));

// Solution to destructuring exercise
function ajaxOptions({
    url = "...",
    method = "POST",
    data,
    callback,
    headers: [
        header0 = "Content-Type: text/plain",
        ...otherHeaders
    ]

}) { 
    return { 
        url,
        method,
        data,
        callback,
        headers: [header0, ...otherHeaders]
    }
}

ajax(ajaxOptions());
ajaxOptions(ajaxOptions(settings));
