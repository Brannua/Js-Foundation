/**
 * 自封装Cookie-API
 * author: lpj
 */

var manageCookie = {
  /**
   * 设置cookie
   * @param {String} name cookie名
   * @param {String} value cookie值
   * @param {String} time cookie有效时长
   */
  setCookie: function (name, value, time) {
    document.cookie = name + "=" + value + ";max-age=" + time;
    return this; //实现链式调用
  },

  /**
   * 删除cookie
   * @param {String} name cookie名
   */
  removeCookie: function (name) {
    return this.setCookie(name, '', -1);
  },

  /**
   * 查询cookie
   * @param {String} name cookie名
   * @param {Function} callback 回调函数
   */
  getCookie: function (name, callback) {
    var allCookieArr = document.cookie.split('; '),
      len = allCookieArr.length;
    // for循环一旦匹配到name就不继续循环了,而forEach需要循环完
    for (var i = 0; i < len; i++) {
      var item = allCookieArr[i].split('=');
      if (item[0] === name) {
        callback(itemCookieArr[1]);
        return this; //链式调用
      }
    }
    //如果for循环结束没找到所要查找的cookie就给回调函数传undefined
    callback(undefined);
    return this; //链式调用
  },
};

module.exports = manageCookie;
