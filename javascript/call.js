function getGlobalObject() {
  return this;
}

Function.prototype.callFn = function (thisArg, ...rests) {
  if (typeof this !== 'function') {
    throw new TypeError(this + 'is not a function')
  }

  if (thisArg === undefined || thisArg === null) {
    thisArg = getGlobalObject();
  }

  const _fn = Symbol('_fn');
  thisArg[_fn] = this;
  const ret = thisArg[_fn](...rests);
  delete thisArg[_fn];
  return ret;
}

function sum (c, d) {
  var a = this.name;
  var b = this.age;
  console.log(a + 'is' + b);
  console.log(c, d);
}

const obj = {
  name: 'Lily',
  age: 18
}

sum.callFn(obj, 1);
sum.call(obj, 1);

Function.prototype.bindFn = function (thisArg, ...rests) {
  if (typeof this !== 'function') {
    throw new TypeError(this + 'is not a function')
  }

  if (thisArg === undefined || thisArg === null) {
    thisArg = getGlobalObject();
  }

  const _fn = Symbol('_fn');
  thisArg[_fn] = this;
  
  return (...args) => {
    const ret = thisArg[_fn](...rests,...args);
    delete thisArg[_fn];
    return ret;
  }
}

const module1 = {
  x: 42,
  getX: function() {
    return this.x;
  }
};

const unboundGetX = module1.getX;
const boundGetX = unboundGetX.bindFn(module1);
console.log(boundGetX());
