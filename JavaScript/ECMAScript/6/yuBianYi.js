/**
函数预编译( 发生在函数执行的前一刻 )
  1.创建AO对象( Activation Object( 活动对象 ), 即执行期上下文 )
  2.找形参和变量声明, 将变量名和形参名做为AO属性名, 值为undefined
  3.将实参值和形参统一
  4.在函数体里面找函数声明, 将函数名作为AO属性名, 值为函数体
AO: {
  a: function a() {},
  b: undefined,
}
 */
function fn(a) {
  console.log(a); // function a() {}
  var a = 123; // 预编译已经扫描过了变量声明,故执行时是变量赋值,将AO对象的属性a赋值为123
  console.log(a); // 123
  function a() {} // 预编译已经扫描过了函数声明,故执行时不看这句
  console.log(a); // 123
  var b = function () {} // // 预编译已经扫描过了变量声明,故执行时是变量赋值,将AO对象的属性b赋值为function () {}
  console.log(b); // function () {}
}
fn(1);
/* ----------------------------------------------------- */
/* 
全局预编译
  1.创建GO对象( Global Object === window, 即执行期上下文 )
  2.找变量声明, 将变量名做为GO属性名, 值为undefined
  3.找函数声明, 将函数名作为GO属性名, 值为函数体
*/
// GO {
//   a: undefined,
//   test: function test() {...},
//   c: 234
// }
function test() {
  console.log(b);// undefined
  if (a) { // a==undefined, 注意预编译不受if条件是否满足的影响
    var b = 100;
  }
  c = 234;
  console.log(c);// 234
}
var a;
// AO {
//   b: undefined,
// }
test();
console.log(c);// 234