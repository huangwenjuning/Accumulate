const loaderUtils = require('loader-utils');

function loader (content) {
    return `
        var style = document.createElement("style");
        style.innerHTML = ${JSON.stringify(content)};
        document.head.appendChild(style);
    `;
}


loader.pitch = function (request) {
    let str = `
        const content = require(${loaderUtils.stringifyRequest(this, '!!' + request)});
        let style = document.createElement('style');
        style.innerHTML = content;
        document.head.appendChild(style);
    `;
    return str;
}

module.exports = loader;
