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

var obj = {
  name: 'asd',
  son: {
    name: 'qwe'
  },
  hobby: [
    'ball',
    'swim'
  ],
  age: 123
}
function deepClone(origin, target) {
  var target = target || {};
  for (var prop in origin) {
    var temp = origin[prop];
    if (typeof(temp) === "object" && temp !== null) {
      if (temp instanceof Array) {
        target[prop] = deepClone(temp, []);
      } else {
        target[prop] = deepClone(temp, {});
      }
    } else {
      target[prop] = temp;
    }
  }
  return target;
}
var demo = deepClone(obj);