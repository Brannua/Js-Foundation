/**
 * DOMFunctionTools.js
 * 封装兼容性的获取传入元素css样式表的方法
 * @param {String} prop 传入的css属性名
 */
function getStyle(prop) {
  if (window.getComputedStyle) {
    // 因为prop是字符串形式,所以必须使用[prop]的方式
    return window.getComputedStyle(this, null)[prop];
  } else {
    // 兼容低于IE9的浏览器
    return this.currentStyle[prop];
  }
}
Element.prototype.getStyle = getStyle;
Document.prototype.getStyle = getStyle;


var oImgs = document.getElementsByClassName('imgs')[0],
  imgs = oImgs.getElementsByClassName('item'),
  len = imgs.length,
  eachWidth = imgs[0].getStyle('width'),
  start = 0;

/**
 * 轮播函数
 */
function scroll() {
  // 正常滚动
  start++;
  oImgs.style.transition = 'left .3s';
  oImgs.style.left = -start * parseInt(eachWidth) + 'px';
  // 滚动到最后一张的时候监听动画结束
  if (start === len - 1) {
    oImgs.addEventListener('transitionend', whileTheLastOne, false)
  }
}

/**
 * 处理当滚动到最后一张图
 */
function whileTheLastOne() {
  // 瞬间归位
  fastReset();
  // 取消监听动画结束
  oImgs.removeEventListener('transitionend', whileTheLastOne, false);
}

/**
 * 瞬间归位函数
 */
function fastReset() {
  start = 0;
  oImgs.style.transition = '';
  oImgs.style.left = -start * parseInt(eachWidth) + 'px';
}

/**
 * 开启定时器自动播放轮播图
 */
setInterval(scroll, 1000)
