/**
 * @desc 模仿实现 instanceof
 */
function myInstanceof(target, origin) {
  if (typeof(target) !== 'object' || target == null) return false 

  // init
  let proto = target.__proto__

  while(true) {
    // 如果已经是原型链的顶端，直接reture false
    if (proto === null) return false
    // 核心代码
    if (proto === origin.prototype) return true 
    // 往上找
    proto = proto.__proto__
  }
}

console.log(myInstanceof([], Array))
