// 下列程序运行结果是 [1,2,3,4,5] 的是 ACD , B不执行不报错

// A
function foo(x) {
  console.log(arguments);
  return x;
}
foo(1,2,3,4,5);

// -----------------------------

// B
function foo(x) {
  console.log(arguments);
  return x;
}(1,2,3,4,5)

// -----------------------------

// C
(function foo(x){
  console.log(arguments);
  return x;
})(1,2,3,4,5)

// -----------------------------

// D
function foo() {bar.apply(null, arguments)}
function bar(x) {console.log(arguments)}
foo(1,2,3,4,5)