/**
 * 浅克隆
*/

function simpleClone(origin, target) {
  var target = target || {};
  for (var prop in origin) {
    target[prop] = origin[prop];
  }
  return target;
}

/**
 * 深克隆( 引用值只考虑 {} 和 [] )
 * 原始值 : number, string, boolean, undefined, null
*/
function deepClone(origin, target) {
  var target = target || {},
    toStr = Object.prototype.toString;
  for (var prop in origin) {
    // 不拷贝原型上的属性
    if (origin.hasOwnProperty(prop)) {
      var originValue = origin[prop];
      if (typeof (originValue) === "object" && originValue !== null) {
        target[prop] = toStr.call(originValue) === "[object Array]" ? [] : {};
        deepClone(originValue, target[prop]);
      } else {
        target[prop] = originValue;
      }
    }
  }
  return target;
}