/**
 * 这里存储各种手动封装的函数小工具
 * author: lpj
 */

// 返回传入的字符串的字节长度 ( 一个汉字两个字节,一个英文字母一个字节 )
function getStrByteLen(target) {
  if (typeof target == "string") {
    var len = target.length,
      count = len;
    for (var i = 0; i < len; i++) {
      target.charCodeAt(i) > 255 && count++;
    }
    return count;
  }
}

// isNaN函数
function isNaN(num) { //传入参数
  var res = Number(num); //隐式类型转换
  res += ""; //变成字符串
  return res === "NaN" ? true : false;
}

/**
 * 弥补typeof的不足封装type方法
 * if         null
 * else if    number, string, boolean, undefined, function
 * else       {}, [], 包装类
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

// 原型链编程封装数组去重方法一, 利用对象属性名唯一来实现, 不改变原数组
Array.prototype.unique = function () {
  var oTemp = {},
    arr = [],
    len = this.length;
  for (var i = 0; i < len; i++) {
    if (!oTemp[this[i]]) {
      // 'temp' 若换成this[i] , 则0、undefined、null这些布尔值为false的值在数组里无法去重
      oTemp[this[i]] = 'temp';
      arr.push(this[i]);
    }
  }
  return arr;
}

// 原型链编程封装数组去重方法二, 利用对象属性名唯一来实现, 反向涂写原数组配合splice实现
Array.prototype.unique = (function () {
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
}())

// 原型链编程封装数组push方法
Array.prototype.push = function () {
  for (var i = 0; i < arguments.length; i++) {
    this[this.length] = arguments[i];
  }
  return this.length;
}

// 纯原生JS, 原型链编程封装数组unshift方法 ( 改变原数组 )
Array.prototype.unshift = function () {
  var arguLen = arguments.length,
    totalLength = arguLen + this.length;
  for (var i = arguLen; i < totalLength; i++) {
    this[i] = this[i - arguLen];
  }
  for (var i = 0; i < arguLen; i++) {
    this[i] = arguments[i];
  }
  return this.length;
}

// 利用splice方法, 原型链编程封装数组unshift方法 ( 改变原数组 )
Array.prototype.splice = function () {
  this.splice(0, 0, arguments);
  return this.length;
}

// 换个思路: 原型链编程模拟数组unshift方法 ( 不改变原数组 )
Array.prototype.unshift = function () {
  var res = [];
  for (var i = 0; i < arguments.length; i++) {
    res.push(arguments[i]);
  }
  for (var i = 0; i < this.length; i++) {
    res.push(this[i]);
  }
  return res;
}

/* 
 * var str = 'abc'
 * str[1] === 'b'
 * str.charAt(1) === 'b'
 * str.charCodeAt(1) === 98
 * str.split("") --> ['a', 'b', 'c']
*/
// 原型链编程封装字符串去重, 利用对象属性名唯一来实现
String.prototype.unique = (function () {
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
    return _arrTemp.join("");
  }
}())

// 找出字符串中第一个只出现一次的字母
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

// 打印当前是何年何月何日何时几分几秒
function now() {
  var date = new Date();
  console.log(date.getFullYear() + "年", date.getMonth() + 1 + "月", date.getDate() + "日", date.getHours() + "时", date.getMinutes() + "分", date.getSeconds() + "秒");
}

// 兼容性方法,返回浏览器视口尺寸
function getViewportOffset() {
  if (window.innerHeight) { //如果是IE9以上版本,就直接使用下面的语法就行
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else {
    if (document.compatMode == "CSS1Compat") { //标准模式适用于任意浏览器
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.cilentHeight
      }
    } else { //适用于混杂模式下的浏览器,向后兼容5个版本浏览器
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    }
  }
}

// 兼容性方法,返回滚动条滚动距离
function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset
    }
  } else {
    return {
      x: document.body.scrollLeft + document.documentElement.scrollLeft,
      y: document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}

// 兼容性方法,按需加载js脚本
function loadScript(url, callback) {
  var script = document.createElement('script');
  script.type = "text/javascript";
  document.head.appendChild(script); //此时会解析下载完毕的脚本并执行
  // 确保js脚本下载完毕(load事件/监听状态码变化)再执行工具方法
  if (script.readyState) {
    // 适用于IE
    script.onreadystatechange = function () {
      if (script.readyState == 'complete' ||
        script.readyState == 'loaded') {
        // callback();
        obj[callback]();
      }
    }
  } else {
    // 适用于chrome firefox opera Safari
    script.onload = function () {
      // callback();
      obj[callback]();
    }
  }
  // 确保绑定上事件之后再加载js脚本保证状态码会变化(从而会触发事件)
  script.src = url; //此时系统就会异步地下载js脚本文件
}

// 取消冒泡
function stopBubble(event) {
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
}

// 阻止默认事件
function cancleHandler(event) {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
}