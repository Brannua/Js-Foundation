var oTogList = document.getElementsByClassName('togList')[0],
  isShow = false,
  scrollY = 0;

/**
 * 返回滚动条的滚动距离的兼容性方法
 * 参见自封装的functionTools
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
 * 展开列表
 */
function open() {
  // 遍历切换类名(注意hideItems的实时性)
  var hideItems = document.getElementsByClassName('hide'),
    len = hideItems.length;
  for (var i = 0; i < len; i++) {
    hideItems[0].className = "show";
  }
  // 点击展开列表的时候记录此时滚动条的滚动距离
  scrollY = getScrollOffset().y;
}

/**
 * 合上列表
 */
function close() {
  // 遍历切换类名(注意openItems的实时性)
  var openItems = document.getElementsByClassName('show'),
    len = openItems.length;
  for (var i = 0; i < len; i++) {
    openItems[0].className = "hide";
  }
  // 合上列表的时候回归到展开列表时候的位置
  window.scrollTo(0, scrollY);
}

oTogList.onclick = function () {
  // 加锁的编程方式
  if (isShow) {
    close();
    isShow = false;
  } else {
    open();
    isShow = true;
  }
}
