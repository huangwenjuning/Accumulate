var helloTom = (function() {
    var Tom = {
        name: 'Tom',
        age: 20,
    };
    var hello = function() {
        console.log('My name is ' + Tom.name);
    }
    return hello;
})();
