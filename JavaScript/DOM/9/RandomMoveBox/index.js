(function () {
  var oDiv = document.getElementsByTagName('div')[0],
    maxLeft = window.innerWidth - 100,
    maxTop = window.innerHeight - 100,
    xDirection,
    yDirection,
    newXPosi,
    newYPosi;

  oDiv.onmouseenter = function () {
    xDirection = (Math.random() - 0.5) > 0 ? 1 : -1;
    yDirection = (Math.random() - 0.5) > 0 ? 1 : -1;
    newXPosi = parseInt(oDiv.style.left) + 200 * xDirection;
    newYPosi = parseInt(oDiv.style.top) + 200 * yDirection;

    newXPosi = newXPosi < 0 ? 0 : newXPosi;
    newXPosi = newXPosi > maxLeft ? maxLeft - 300 : newXPosi;
    newYPosi = newYPosi < 0 ? 0 : newYPosi;
    newYPosi = newYPosi > maxTop ? maxTop - 300 : newYPosi;

    oDiv.style.left = newXPosi + 'px';
    oDiv.style.top = newYPosi + 'px';
  }
}());
