
/**
 * 摘自自封装DOMFunctionTools.js
 * 给DOM对象绑定事件的兼容性方法
 * @param {String} type 事件类型
 * @param {Function} handle 事件处理函数
 */
function addEvent(type, handle) {
  // 处理IE9以上版本浏览器
  if (this.addEventListener) {
    this.addEventListener(type, handle, false);
  } else if (this.attachEvent) {
    // 处理IE浏览器
    this.attachEvent('on' + type, function () {
      handle.call(this);
    });
  } else {
    this['on' + type] = handle;
  }
}
Element.prototype.addEvent = addEvent;
Document.prototype.addEvent = addEvent;

/**
 * 返回元素相对于文档的坐标函数
 * 摘自自封装DOMFunctionTools.js
 */
function getElemPosition() {
  if (this.offsetParent) {
    // 有已经定位的父级
    // 返回递归累加的坐标
    return {
      x: this.offsetLeft + getElemPosition.call(this.offsetParent),
      y: this.offsetTop + getElemPosition.call(this.offsetParent),
    }
  }
  // 没有已经定位的父级
  // 直接返回相对于文档的坐标
  return {
    x: this.offsetLeft,
    y: this.offsetTop,
  }
}
Element.prototype.getElemPosition = getElemPosition;
Document.prototype.getElemPosition = getElemPosition;


var box = document.getElementById('box'),
  curX = 0,
  curY = 0,
  cursorPosi = {
    x: 0,
    y: 0
  };

// 监听鼠标移入小方块
box.addEvent('mouseenter', enterHandler);
// 监听鼠标移出小方块
box.addEvent('mouseleave', leaveHandler);

/**
 * 鼠标移入小方块
 */
function enterHandler() {
  this.addEvent('mousedown', downHandler);
  this.addEvent('mouseup', upHandler);
}

/**
 * 鼠标移出小方块
 */
function leaveHandler() {
  this.removeEventListener('mousedown', downHandler, false);
  this.removeEventListener('mouseup', upHandler, false);
}

function initPositions(event) {
  // 记录小方块左上角坐标
  var {x, y} = this.getElemPosition();
  curX = parseInt(x);
  curY = parseInt(y);
  // 初始化小方块位置，便于后续拖动从行间样式取值
  this.style.left = curX;
  this.style.top = curY;
  // 记录鼠标坐标
  cursorPosi.x = event.x;
  cursorPosi.y = event.y;
}

/**
 * 鼠标按下操作
 */
function downHandler(event) {
  // 初始化小方块和鼠标的位置信息
  initPositions.call(this, event);
  // 监听拖动小方块
  this.addEvent('mousemove', moveHandler, false);
}

/**
 * 鼠标抬起操作
 */
function upHandler() {
  this.removeEventListener('mousemove', moveHandler, false);
}

/**
 * 小方块移动函数
 */
function moveHandler(event) {
  // 小方块移动
  this.style.left = parseInt(this.style.left) + (event.x - cursorPosi.x) + 'px';
  this.style.top = parseInt(this.style.top) + (event.y - cursorPosi.y) + 'px';
  // 更新鼠标坐标
  cursorPosi.x = event.x;
  cursorPosi.y = event.y;
}
