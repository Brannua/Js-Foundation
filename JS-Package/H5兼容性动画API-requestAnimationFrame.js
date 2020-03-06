window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60); // 页面每秒刷新60次
    }
}());
window.cancelAnimationFrame = (function () {
  return window.cancelAnimationFrame ||
    window.webkitcancelAnimationFrame ||
    window.mozcancelAnimationFrame ||
    function (id) {
      window.clearTimeout(id);
    }
}());