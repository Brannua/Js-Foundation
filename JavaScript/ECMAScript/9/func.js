
function test() {
  var arr = [];
  for (var i = 0; i < 10; i++) {
    arr[i] = function () {
      console.log(i);
    }
  }
  return arr;
}
var myArr = test();
for (var j = 0; j < 10; j++) {
  myArr[j](); // 10 10 10 10 10 10 10 10 10 10
}

// --------------------------------------------------------------------
/* 十对一的闭包用十对十的闭包解决 */
function test() {
  var arr = [];
  for (var i = 0; i < 10; i++) {
    (function (j) {
      arr[j] = function () { // 该函数被保存到外部 , 且该函数始终有立即执行函数的执行期上下文
        console.log(j);
      }
    }(i))
  }
  return arr;
}
var myArr = test();
for (var k = 0; k < 10; k++) {
  myArr[k](); 
}