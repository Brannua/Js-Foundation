// 返回元素e的第n层祖先元素结点
Element.prototype.retParent = function (elem, n) {
  while (elem && n--) { //容错处理,如果elem是null,不会进入循环,直接返回elem
    elem = elem.parentElement;
  }
  return elem;
}

// 不使用children属性封装hasChildren()方法
Element.prototype.hasChildren = function () {
  var child = this.childNodes,
    len = child.length;
  for (var i = 0; i < len; i++) {
    if (child[i].nodeType === 1) {
      return true;
    }
  }
  return false;
}

// 返回元素elem的第n个兄弟元素结点
Element.prototype.returnSibiling = function (elem, n) {
  while (elem && n) {
    if (n < 0) { // 返回前面的兄弟元素结点
      if (elem.previousElementSibling) {
        elem = elem.previousElementSibling;
      } else {
        // 兼容IE9以下
        for (elem = elem.previousSibling; elem && elem.nodeType !== 1; elem = elem.previousSibling);
      }
      n++;
    } else { // 返回后面的兄弟元素结点
      if (elem.nextElementSibling) {
        elem = elem.nextElementSibling;
      } else {
        // 兼容IE9以下
        for (elem = elem.nextSibling; elem && elem.nodeType !== 1; elem = elem.nextSibling);
      }
      n--;
    }
  }
  // n == 0 不进入while循环,直接返回元素本身
  return elem;
}

// 封装myChildren功能,解决以前部分浏览器的兼容性问题
Element.prototype.myChildren = function () {
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

// 忽略老版本浏览器封装函数insertAfter();功能类似insertBefore();
Element.prototype.insertAfter = function (newItem, targetItem) {
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

// 方法改进
Element.prototype.insertBefore = function (targetNode, afterNode) {
  var beforeNode = afterNode.nextNodeSibiling;
  if (beforeNode == null) {
    this.appendChild(targetNode);
  } else {
    this.insertBefore(targetNode, beforeNode);
  }
}

// 将目标节点内部的节点顺序逆序, eg: <div><a></a><em></em></div> --> <div><em></em><a></a></div>
Element.prototype.tranverseNode = function () {
  var childElementNodes = this.children;
  var len = childElementNodes.length;
  // 将所有子节点放入数组然后reverse()
  var arr = [];
  for (var i = 0; i < childElementNodes.length; i++) {
    arr.push(childElementNodes[i]);
  }
  arr.reverse();
  // 清除所有子元素结点
  for (var i = 0; i < len; i++) {
    childElementNodes[0].remove();
  }
  // appendChild
  for (var i = 0; i < len; i++) {
    this.appendChild(arr[i])
  }
  return arr;
}

// 方法改进
Element.prototype.tranverseNode = function () {
  var childNodes = this.childNodes;
  var len = childNodes.length;
  for (var i = len - 2; i >= 0; i--) {
    this.appendChild(childNodes[i]);
  }
}

// 不使用children将元素里面的所有元素结点装到一个数组里面并返回
Element.prototype.returnEleChild = function (node) {
  /* 用一个类数组存储node里面所有元素结点,这样temp返回值就和使用children的返回值很像 */
  var temp = {
    length: 0,
    push: Array.prototype.push,
    splice: Array.prototype.splice //可以让对象长得更加像数组(其实就是类数组)
  },
    child = node.childNodes,
    len = child.length;
  for (var i = 0; i < len; i++) {
    if (child[i].nodeType === 1) {
      temp.push(child[i]);
    }
  }
  return temp;
}

// 兼容ie和其他浏览器,获取传入元素的css样式表
Element.prototype.getStyle = function (elem, prop) {
  if (window.getComputedStyle) {
      /* 因为prop是字符串形式,所以必须使用[prop]的方式 */
      return window.getComputedStyle(elem, null)[prop];
  } else {
      return elem.currentStyle[prop];
  }
}

// 兼容性方法
Element.prototype.addEvent = function (elem, type, handle) {
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

// 遍历元素结点树
