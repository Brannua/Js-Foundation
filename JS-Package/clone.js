/**
 * 深拷贝
 * @param {*} origin 被拷贝的数据
 * origin == null 相当于 origin === null || origin === undefined
 */
function deepClone(origin) {
  // 原始值直接返回
  if (typeof(origin) !== 'object' || origin == null) {
    return origin
  }

  // 初始化返回值
  let result
  if (origin instanceof Array) {
    result = []
  }
  if (origin instanceof Object) {
    result = {}
  }

  // 遍历
  for (let key in origin) {
    // 排除原型链上的属性
    if (origin.hasOwnProperty(key)) {
      // 递归
      result[key] = deepClone(origin[key])
    }
  }

  return result
}
