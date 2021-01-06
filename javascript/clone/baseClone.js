let obj = {
  fun: function(){},
  syb: Symbol('foo'),
  a: undefined,
  b: NaN,
  c: Infinity,
  reg : /^abc$/,
  date: new Date(),
  set: new Set([1, 2, 3, 4, 4]),
  map: new Map([
      ['name', '张三'],
      ['title', 'Author']
    ]),
  text:'aaa',
}


function deepCopy(originObj, map = new WeakMap()) {
  // 判断是否为基本数据类型
  if(isObject(originObj)) {
      // 判断是否为循环引用
      if(map.get(originObj)) {
          return map.get(originObj);
      }
     
     
      // 判断是否为几种特殊需要处理的类型
      let type = [Date, RegExp, Set, Map, WeakMap, WeakSet];
      if(type.includes(originObj.constructor)) {
          return new originObj.constructor(originObj);
      }
      // 其他类型
      let allDesc = Object.getOwnPropertyDescriptors(originObj);
      let cloneObj = Object.create(Object.getPrototypeOf(originObj), allDesc);
      map.set(originObj, cloneObj)
      // Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。
      for(const prop of Reflect.ownKeys(originObj)) {
          cloneObj[prop] = isObject(originObj[prop]) && typeof originObj[prop] !== 'function' ? deepCopy(originObj[prop], map) : originObj[prop];
      }
      return cloneObj;
  } else {
      return originObj;
  }
}

// 是否为引用类型
function isObject(obj) {
  return typeof obj === 'object' || typeof obj === 'function' && obj !== null;
}
