/**
 * 自封装DOM-API
 * author: lpj
*/

/**
 * 使用childNodes属性仿children属性
 * 将元素里面的所有元素结点封装为类数组并返回
 */
function returnEleChild() {
  var child = this.childNodes,
    len = child.length,
    temp = { // 用一个类数组存储this里面的所有元素结点
      length: 0,
      push: Array.prototype.push,
      splice: Array.prototype.splice
    };
  for (var i = 0; i < len; i++) {
    if (child[i].nodeType === 1) {
      temp.push(child[i]);
    }
  }
  return temp;
}
Element.prototype.returnEleChild = returnEleChild;
Document.prototype.returnEleChild = returnEleChild;

/**
 * 遍历元素结点树
 */
function elementTree() {
  var children = this.children,
    len = children.length;
  if (len) {
    for (var i = 0; i < len; i++) {
      elementTree.call(children[i]);
    }
  }
  return this;
}
Element.prototype.elementTree = elementTree;
Document.prototype.elementTree = elementTree;


/**
 * 返回元素elem的第n层祖先元素结点
 * @param {Object} elem 元素节点
 * @param {Number} n 层数
 */
function retParent(elem, n) {
  // 保证elem存在且层数大于零
  while (elem && n) {
    elem = elem.parentElement;
    n--;
  }
  return elem;
}
Element.prototype.retParent = retParent;
Document.prototype.retParent = retParent;


/**
 * 返回元素elem的第n个兄弟元素结点
 * @param {Object} elem 元素节点
 * @param {Number} n 第几个
 * n < 0 返回前面的兄弟元素结点
 * n > 0 返回后面的兄弟元素结点
 */
function returnSibiling(elem, n) {
  if (n === 0) {
    return elem;
  }
  while (elem && n) {
    if (n < 0) {
      // if-else兼容IE9以下
      if (elem.previousElementSibling) {
        elem = elem.previousElementSibling;
      } else {
        for (elem = elem.previousSibling; elem && elem.nodeType !== 1; elem = elem.previousSibling);
      }
      n++;
    } else {
      // if-else兼容IE9以下
      if (elem.nextElementSibling) {
        elem = elem.nextElementSibling;
      } else {
        for (elem = elem.nextSibling; elem && elem.nodeType !== 1; elem = elem.nextSibling);
      }
      n--;
    }
  }
  return elem;
}
Element.prototype.returnSibiling = returnSibiling;
Document.prototype.returnSibiling = returnSibiling;


/**
 * 兼容性children方法
 */
function children() {
  var arr = [],
    child = this.childNodes,
    len = child.length;
  for (var i = 0; i < len; i++) {
    if (child[i].nodeType === 1) {
      arr.push(child[i]);
    }
  }
  return arr;
}
Element.prototype.children = children;
Document.prototype.children = children;


/**
 * 封装hasChildren()方法
 * 使用childNodes属性
 */
function hasChildren() {
  var child = this.childNodes,
    len = child.length;
  for (var i = 0; i < len; i++) {
    if (child[i].nodeType === 1) {
      return true;
    }
  }
  return false;
}
Element.prototype.hasChildren = hasChildren;
Document.prototype.hasChildren = hasChildren;


/**
 * 封装函数insertAfter();功能类似于insertBefore();借用insertBefore();
 * @param {Object} newItem 要插入的DOM元素
 * @param {Object} targetItem 参考插入的DOM元素
 */
function insertAfter_1(newItem, targetItem) {
  var afterItem = targetItem.nextElementSibling;
  if (afterItem) {
    document.insertBefore(newItem, afterItem);
  } else {
    this.appendChild(newItem);
  }
}
Element.prototype.insertAfter_2 = insertAfter_2;
Document.prototype.insertAfter_2 = insertAfter_2;


/**
 * 封装函数insertAfter();功能类似insertBefore();
 * @param {Object} newItem 要插入的DOM元素
 * @param {Object} targetItem 参考插入的DOM元素
 */
function insertAfter_2(newItem, targetItem) {
  var arr = [],
    childNodes = this.children,
    len = childNodes.length;
  // 将节点结构保存到数组中
  for (var i = 0; i < len; i++) {
    arr.push(childNodes[i]);
    if (childNodes[i].nodeName == targetItem.nodeName) {
      arr.push(newItem);
    }
  }
  // 清除当前父元素的所有子元素
  for (var i = 0; i < len; i++) {
    childNodes[0].remove();
  }
  // 遍历数组,appendChild
  for (var j = 0; j < arr.length; j++) {
    this.appendChild(arr[j]);
  }
  return arr;
}
Element.prototype.insertAfter_2 = insertAfter_2;
Document.prototype.insertAfter_2 = insertAfter_2;


/**
 * 将目标节点内部的节点顺序逆序
 * eg: <div><a></a><em></em></div> --> <div><em></em><a></a></div>
 */
function tranverseNode_1() {
  var childElementNodes = this.children,
    len = childElementNodes.length,
    arr = [];
  // 将所有子节点拷贝到临时数组然后reverse()
  for (var i = 0; i < len; i++) {
    arr.push(childElementNodes[i]);
  }
  arr.reverse();
  // 清除所有子元素结点
  for (var i = 0; i < len; i++) {
    childElementNodes[0].remove();
  }
  // 在将逆序后的子节点装回
  for (var i = 0; i < len; i++) {
    this.appendChild(arr[i]);
  }
}
Element.prototype.tranverseNode_1 = tranverseNode_1;
Document.prototype.tranverseNode_1 = tranverseNode_1;


/**
 * 将目标节点内部的节点顺序逆序
 * 方法改进，利用appendChild的剪切属性
 * 从倒数第二个开始向第一个子元素遍历并appendChild
 * eg: <div><a></a><em></em></div> --> <div><em></em><a></a></div>
 */
function tranverseNode_2() {
  var childNodes = this.childNodes;
  var len = childNodes.length;
  for (var i = len - 2; i >= 0; i--) {
    this.appendChild(childNodes[i]);
  }
}
Element.prototype.tranverseNode_2 = tranverseNode_2;
Document.prototype.tranverseNode_2 = tranverseNode_2;


/**
 * 返回元素相对于文档的坐标函数
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


/**
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


/**
 * 兼容性方法
 */
function addEvent(elem, type, handle) {
  if (elem.addEventListener) {
    elem.addEventListener(type, handle, false);
  } else if (elem.attachEvent) {
    elem.attachEvent('on' + type, function () {
      handle.call(elem);
    });
  } else {
    elem['on' + type] = handle;
  }
}
Element.prototype.addEvent = addEvent;
Document.prototype.addEvent = addEvent;
