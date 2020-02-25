a = 100;
function demo(e) {
  function e() {}
  arguments[0] = 2;
  console.log(e); // 2
  if (a) {
    var b = 123;
    function c()　{
      // Tips: 现今浏览器不允许if中定义函数
    }
  }
  var c;
  a = 10;
  var a;
  console.log(b);// undefined
  f = 123;
  console.log(c);// undefined
  console.log(a);// 10
}
var a;
demo(1);
console.log(a);// 100
console.log(f);// 123