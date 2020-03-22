/**
 * 这里存储各种手动封装的函数小工具
 * author: lpj
 */

/**
 * 返回传入的字符串的字节长度
 * 一个汉字两个字节,一个英文字母一个字节
*/
String.prototype.getStrBytesLen = (function () {
  var _toStr = Object.prototype.toString,
    _tempStr = '[object String]';
  return function () {
    if (_toStr.call(this) === _tempStr) {
      var len = this.length,
        count = len;
      for (var i = 0; i < len; i++) {
        this.charCodeAt(i) > 255 && count++;
      }
      return count;
    }
  }
}());


/**
 * 封装字符串去重, 利用对象属性名唯一来实现
 * var str = 'abc'
 * str[1] === 'b'
 * str.charAt(1) === 'b'
 * str.charCodeAt(1) === 98
 * str.split("") --> ['a', 'b', 'c']
 */
String.prototype.uniqueStr = (function () {
  var _oTemp = {},
    _arrTemp = [];
  return function () {
    var len = this.length;
    for (var i = 0; i < len; i++) {
      var key = this[i];
      if (!_oTemp[key]) {
        _oTemp[key] = "temp";
        _arrTemp.push(key);
      }
    }
    // 利用堆内存的散列结构而不使用拼接字符串操作栈内存的方式提高效率
    return _arrTemp.join("");
  }
}());


/**
 * 找出字符串中第一个只出现一次的字母
 */
String.prototype.theFirOnce = function () {
  var len = this.length;
  for (var i = 0; i < len; i++) {
    var temp = this[i],
      flag = 0;
    for (var j = 0; j < len; j++) {
      if (temp === this[j]) {
        ++flag;
        if (flag > 1) {
          break;
        }
      }
    }
    if (flag === 1) {
      return temp;
    }
  }
}


/**
 * 不改变原数组的数组去重
 * 利用对象属性名唯一来实现
*/
Array.prototype.uniqueArrOne = (function () {
  var _oTemp = {},
    _arrTemp = [];
  return function () {
    var len = this.length;
    for (var i = 0; i < len; i++) {
      if (!_oTemp[this[i]]) {
        // 'temp' 若换成this[i] , 则0、undefined、null这些布尔值为false的值在数组里无法去重
        _oTemp[this[i]] = 'temp';
        _arrTemp.push(this[i]);
      }
    }
    return _arrTemp;
  }
}());


/**
 * 改变原数组的数组去重
 * 利用对象属性名唯一并配合splice来实现
 */
Array.prototype.uniqueArrTwo = (function () {
  var _oTemp = {},
    _startCutLeft = 0;
  return function () {
    var length = this.length;
    for (var i = 0; i < length; i++) {
      if (!_oTemp[this[i]]) {
        _oTemp[this[i]] = 'temp';
        this[_startCutLeft] = this[i];
        _startCutLeft++;
      }
    }
    this.splice(_startCutLeft);
    return this;
  }
}());


/**
 * 模拟push方法
 */
Array.prototype.push = function () {
  for (var i = 0; i < arguments.length; i++) {
    this[this.length] = arguments[i];
  }
  return this.length;
}


/**
 * 原生JS封装unshift方法( 改变原数组 )
 */
Array.prototype.unshift = function () {
  var arguLen = arguments.length,
    totalLength = arguLen + this.length;
  // 加长原数组, 并将原数据整体后移
  for (var i = totalLength - 1; i >= arguLen; i--) {
    this[i] = this[i - arguLen];
  }
  // 数组前面空出的位置放置新数据
  for (var i = 0; i < arguLen; i++) {
    this[i] = arguments[i];
  }
  return this.length;
}


/**
 * 原生JS封装unshift方法( 不改变原数组 )
 */
Array.prototype.unshiftDemo = function () {
  var res = [];
  for (var i = 0; i < arguments.length; i++) {
    res.push(arguments[i]);
  }
  for (var i = 0; i < this.length; i++) {
    res.push(this[i]);
  }
  return res;
}


/**
 * isNaN函数
 * @param {*} target 任意数据类型的参数
 */
function isNaN(target) {
  //隐式类型转换
  var res = Number(target);
  //变成字符串
  res += "";
  return res === "NaN" ? true : false;
}


/**
 * 弥补typeof的不足封装type方法
 * if         null
 * else if    number, string, boolean, undefined, function
 * else       {}, [], 包装类
 * @param {*} param 任意数据类型的参数
 */
function type(param) {
  var curType = typeof (param);
  if (param === null) {
    return "null";
  } else if (curType !== 'object') {
    return curType;
  } else {
    var template = {
      "[object Array]": "array",
      "[object Object]": "object",
      "[object Number]": "object-number",
      "[object Boolean]": "object-boolean",
      "[object String]": "object-string",
    },
      key = Object.prototype.toString.call(param);
    return template[key];
  }
}


/**
 * 返回当前的年月日时分秒
 */
function now() {
  var date = new Date();
  return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日 ${date.getHours()} 时 ${date.getMinutes()} 分 ${date.getSeconds()} 秒`;
}


/**
 * 封装返回滚动条滚动距离的兼容性方法
 * 查看滚动条的滚动距离
 *   window.pageXOffset( IE8及其以下不兼容 )
 *   window.pageYOffset( IE8及其以下不兼容 )
 *   document.body.scrollLeft/scrollTop || documentElement.scrollLeft/scrollTop
 *   兼容性混乱，用时取两值相加，因为不可能出现两者都有值的情况
*/
function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset,
    }
  } else {
    return {
      x: document.body.scrollLeft + document.documentElement.scrollLeft,
      y: document.body.scrollTop + document.documentElement.scrollTop,
    }
  }
}


/**
 * 封装fixed定位函数( 用于IE6 )
 * IE6没有fixed定位,用position:absolute模拟
 */
function myFixed(left, top) {
  this.style.position = 'absolute';
  var {x, y} = getScrollOffset();
  this.style.left = parseInt(this.style.left) + x + 'px';
  this.style.top = parseInt(this.style.top) + y + 'px';
}
Element.prototype.myFixed = myFixed;
Document.prototype,myFixed = myFixed;



/**
 * 封装返回浏览器视口尺寸的兼容性方法
 */
function getViewportOffset() {
  if (window.innerHeight) {
    // 处理IE9及以上版本
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  } else {
    if (document.compatMode === "CSS1Compat") {
      // 低于IE9的版本中处理标准模式，适用于任意浏览器
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.cilentHeight,
      }
    } else {
      // document.compatMode === "backCompat"
      // 低于IE9的版本中处理混杂模式，chrome向前兼容5个浏览器的版本
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      }
    }
  }
}


/**
 * 封装取消冒泡的兼容性方法
 * @param {Object} event 事件对象
 */
function stopBubble(event) {
  if (event.stopPropagation) {
    // W3C标准
    event.stopPropagation();
  } else {
    // 兼容IE
    event.cancelBubble = true;
  }
}


/**
 * 封装阻止默认事件的兼容性方法
 * @param {Object} event 事件对象
 */
function cancleHandler(event) {
  if (event.preventDefault) {
    // W3C标准
    event.preventDefault();
  } else {
    // 兼容IE
    event.returnValue = false;
  }
}


/**
 * 封装按需加载js脚本的兼容性方法
 * @param {String} url 要加载的js脚本的url
 * @param {Function} callback 回调函数
 */
function loadScript(url, callback) {
  // 创建script标签
  var script = document.createElement('script');
  script.type = "text/javascript";
  // 插入到dom中, 使js可被执行
  document.head.appendChild(script);
  // 监听tools.js下载进度
  if (script.readyState) {
    // 适用于IE
    script.onreadystatechange = function () {
      if (script.readyState === 'complete' ||
        script.readyState === 'loaded') {
        callback();
      }
    }
  } else {
    // 适用于chrome firefox opera Safari
    script.onload = function () {
      callback();
    }
  }
  // 确保绑定上事件之后再异步下载js脚本保证状态码会变化(从而会触发事件)
  script.src = url;
}

// 调用方式
// loadScript('tools.js', function(){
//   ...
// })
