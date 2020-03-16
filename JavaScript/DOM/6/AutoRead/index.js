var Obtns = document.getElementsByClassName('btns')[0].children,
  timer = null;

/**
 * 自动阅读
 */
function start() {
  timer = setInterval(() => {
    window.scrollBy(0, 10)
  }, 1000 / 60)
}

/**
 * 暂停阅读
 */
function stop() {
  console.log(1)
  clearInterval(timer);
}

Obtns[0].onclick = function () {
  // 防止连续点击start按钮造成加速阅读并且无法暂停的BUG
  stop();
  start();
}

Obtns[1].onclick = stop;
