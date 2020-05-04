/**
 * 手写深度比较 isEqual
 */
function isEqual(origin, target) {
  if (origin === target) {
    return true
  }
  if (origin === null || target === null) {
    return origin === target
  }
  if (typeof(origin) !== 'object' || typeof(target) !== 'object') {
    return origin === target
  }

  var oriKeys = Object.keys(origin)
  var tarKeys = Object.keys(target)
  if (oriKeys.length !== tarKeys.length) {
    return false
  }

  // 以origin为参照物
  for (let key in origin) {
    const res = isEqual(origin[key], target[key])
    if (!res) {
      return false
    }
  }
  return true
}