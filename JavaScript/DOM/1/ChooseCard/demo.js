// 获取DOM对象
var oBtns = document.getElementsByClassName('btn'),
    oCards = document.getElementsByClassName('card');
// 遍历按钮 , 绑定事件
for (var i = 0; i < oBtns.length; i++) {
    // 立即执行函数处理闭包
    (function (i) {
        oBtns[i].onclick = function () {
            // 遍历按钮 , 清除行内样式
            for (var j = 0; j < oBtns.length; j++) {
                oBtns[j].className = 'btn';
            }
            // 遍历卡片 , 清除行内样式
            for (var j = 0; j < oCards.length; j++) {
                oCards[j].className = 'card';
            }
            // 设置按钮行内样式
            this.className = 'btn activeBtn';
            // 设置卡片行内样式 ( 用到变量 i , 出现闭包 )
            oCards[i].className = 'card activeCard';
        }
    }(i));
}