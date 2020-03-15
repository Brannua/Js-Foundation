/**
 * 自封装clone-API
 * author: lpj
 */

var clone = {
  /**
   * 浅克隆
   * @param {Object} origin 被克隆的对象
   * @param {Object} target 克隆出来的对象
   */
  simpleClone(origin, target) {
    var target = target || {};
    for (var prop in origin) {
      if (origin.hasOwnProperty(prop)) {
        target[prop] = origin[prop];
      }
    }
    return target;
  },

  /**
   * 深克隆( 引用值只考虑 {} 和 [] )
   * 原始值 : number, string, boolean, undefined, null
   * @param {Object} origin 被克隆的对象
   * @param {Object} target 克隆出来的对象
   */
  deepClone_1(origin, target) {
    // 参数兼容处理
    var target = target || {};
    // 遍历属性名
    for (var prop in origin) {
      // 不拷贝原型上的属性
      if (origin.hasOwnProperty(prop)) {
        // 获取属性值
        var temp = origin[prop];
        // 处理引用值
        if (typeof (temp) === "object" && temp !== null) {
          if (temp instanceof Array) {
            target[prop] = deepClone(temp, []);
          } else {
            target[prop] = deepClone(temp, {});
          }
        } else {
          // 处理原始值
          target[prop] = temp;
        }
      }
    }
    return target;
  },


  /**
  * 深克隆( 引用值只考虑 {} 和 [] )
  * 原始值 : number, string, boolean, undefined, null
  * @param {Object} origin 被克隆的对象
  * @param {Object} target 克隆出来的对象
  */
  deepClone_2(origin, target) {
    // 参数兼容处理
    var target = target || {},
      _toStr = Object.prototype.toString;
    // 遍历属性名
    for (var prop in origin) {
      // 不拷贝原型上的属性
      if (origin.hasOwnProperty(prop)) {
        // 获取属性值
        var temp = origin[prop];
        // 处理引用值
        if (typeof (temp) === "object" && temp !== null) {
          target[prop] = _toStr.call(temp) === "[object Array]" ? [] : {};
          target[prop] = deepClone_2(temp, target[prop]);
        } else {
          // 处理原始值
          target[prop] = temp;
        }
      }
    }
    return target;
  },
};

module.exports = clone;
