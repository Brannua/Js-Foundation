/* 
  系统会以尽量不报错的原则对待代码 , 故以下两种写法等价 , 故不报错也不执行
  Tips: 逗号运算符返回逗号后面的值
*/

function test(a, b, c, d) {
  console.log(a, b, c, d);
}(1, 2, 3, 4);

// ----------------------------------

function test(a, b, c, d) {
  console.log(a, b, c, d);
}

(1, 2, 3, 4);