window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60); // 适用于屏幕刷新率为60hz
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