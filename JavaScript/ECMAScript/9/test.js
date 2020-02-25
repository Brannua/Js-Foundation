/* 
  系统会以尽量不报错的原则对待代码 , 故以下两种写法等价 , 故不报错也不执行
*/

function test(a, b, c, d) {
  console.log(a, b, c, d);
}(1, 2, 3, 4);

// ----------------------------------

function test(a, b, c, d) {
  console.log(a, b, c, d);
}

(1, 2, 3, 4);

// ----------------------------------
// Tips: 逗号运算符返回逗号后面的值
/**
 * 写出下列程序的执行结果
*/
var f = (
  function f() {
    return "1";
  },
  function g() {
    return 2;
  }
)();
console.log(typeof(f));// number

// ----------------------------------
/* 
  运行下列程序输出结果
  试题分析: 
    1. (function f() {}) 是表达式而非函数声明
    2. 且未经声明的变量只有放在typeof中不会报错
    3. typeof返回类型为String
      故打印结果为String类型的 1undefined
*/
var x = 1;
if (function f() {}) {
  x += typeof(f);
}
console.log(x);
