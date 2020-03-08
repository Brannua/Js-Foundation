// // 求阶乘
// function jieCheng(num) {
//   count++;
//   if (num <= 1) {
//     return 1;
//   }
//   return num * jieCheng(num - 1);
// }

// // 函数调用次数计数器
// var count = 0;
// for (var i = 1; i < 6; i++) {
//   jieCheng(i);
// }
// console.log(count);

// ------------------------------------------------

// var cache = {}; // 缓存
// function jieChengCache(num) {
//   count ++;
//   // 判断是否有缓存,有则直接返回,否则计算并缓存,然后返回计算结果
//   var cacheItem = cache[num];
//   if (cacheItem) {
//     return cacheItem;
//   } else {
//     return cache[num] = num <= 1 ? 1 : num * cache[num - 1];
//   }
// }

// var count = 0;
// for (var i = 1; i < 6; i ++) {
//   jieChengCache(i);
// }
// console.log(count);

// ------------------------------------------------

/* 功能函数 */
function jieCheng(num) {
  count++;
  if (num <= 1) {
    return 1;
  }
  return num * jieCheng(num - 1);
}

/* 缓存函数 */
// 闭包会内存泄露(占用), 时间和空间需权衡
function memory(fn) {
  var cache = {}; // 私有化缓存结构
  return function () {
    var key = arguments[0],
      cacheItem = cache[key];
    if (cacheItem) {
      return cacheItem;
    } else {
      return cache[key] = fn.apply(this, arguments);
    }
  }
}

/* 测试 */
var count = 0;
memory(jieCheng)(5)
console.log(count);
