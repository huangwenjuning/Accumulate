module.exports = function (source) {
    // 使用正则将 url 路径替换成require引入方式
    let reg = /url\((.+?)\)/g; 
    // 将 url 路径转换成 require引入
    // 实际还需要重新处理路径的相对地址，可看到 css-loader中提供了 getUrl 方法用于处理
    // return source.replace(reg, 'require($1)');
    return reg.exec(source).input;
}