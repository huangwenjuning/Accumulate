
var helloLily = (function() {
    var Lily = {
        name: 'Lily',
        age: 20,
    };
    var hello = function() {
        console.log('My name is ' + Lily.name);
    }
    return hello;
})();
