
// 获取DOM对象
var oUl = document.getElementsByTagName('ul')[0],
    oLis = document.getElementsByTagName('li');

oUl.onmouseover = function (e) {
    // 获取兼容事件源对象
    var event = e || window.event,
        target = event.target || event.srcElement,
        // 获取元素底色数值
        imgData = parseInt(target.getAttribute('img-data'));
    // 设置元素样式
    target.style.backgroundColor = 'rgb(255, 255, ' + imgData + ')';
    // 改变元素底色数值
    target.setAttribute('img-data', imgData += 50);
}