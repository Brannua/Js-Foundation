/**
 * 用于管理cookie的api
 */
var manageCookie = {
    setCookie: function (name, value, time) {
        document.cookie = name + "=" + value + ";max-age=" + time;
        return this; //实现链式调用
    },
    removeCookie: function (name) {
        return this.setCookie(name, '', -1);
    },
    getCookie: function (name, callback) {
        var allCookieArr = document.cookie.split('; ');
        /* 采用for循环而不用forEach是因为for循环一单匹配到name就不用继续循环了,而forEach需要循环完 */
        for (var i = 0; i < allCookieArr.length; i++) {
            var itemCookieArr = allCookieArr[i].split('=');
            if (itemCookieArr[0] == name) {
                callback(itemCookieArr[1]);
                return this; //链式调用
            }
        }
        callback(undefined); //如果for循环结束没找到所要查找的cookie就给回调函数传undefined
        return this; //链式调用
    }
}