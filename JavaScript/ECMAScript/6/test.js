/* 预编译练习题 */
// GO {
//   bar: function bar() {...}
// }
function bar() {
  return foo;
  foo = 10;
  function foo() {}
  var foo = 11;
}
// AO {
//   foo: function foo() {},
// }
console.log(bar());// function foo() {}

// -------------------------------------

// GO {
//   bar: function bar() {}
// }
// AO {
//   foo: 11
// }
console.log(bar());// 11
function bar() {
  foo = 10;
  function foo() {}
  var foo = 11;
  return foo;
}

// -------------------------------------

a = 100;
function demo(e) {
  function e() {}
  arguments[0] = 2;
  console.log(e); // 2
  if (a) {
    var b = 123;
    /* 注意: 现如今if语句中已经不允许定义函数, 以前可以 */
    function c() {}
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

// -------------------------------------

if ( typeof(a) && -true + (+undefined) + "" ) {
  // typeof(a) --> "undefined"
  // -true + (+undefined) + "" --> -1 + NaN + "" --> "NaN"
  // "undefined" && "NaN" --> true
  console.log("基础扎实1");// 打印
}
if (11 + "11" * 2 == 33) {
  console.log("基础扎实2");// 打印
}
// true + false - false --> 1
!!" " + !!"" - !!false || console.log("你觉得能打印, 你就是猪");

// -------------------------------------

/* 
注意: 先读括号里面的
*/
(window.foo || (window.foo = 'bar'));
console.log(window.foo);
