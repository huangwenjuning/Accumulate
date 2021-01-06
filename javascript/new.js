function objFactory() {
  const obj = {};
  const fn = [].shift.call(arguments);
  obj.__proto__ = fn.prototype;
  const ret = fn(...arguments);
  return ret instanceof Object ? ret : obj;
}

/**
 * 1、创建一个空的简单JavaScript对象（即{}）；
 * 2、 链接该对象（即设置该对象的构造函数）到另一个对象 ；
 * 3、将步骤1新创建的对象作为this的上下文 ，如果该函数没有返回对象，则返回this。
 **/