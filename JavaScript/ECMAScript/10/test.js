// 运行如下代码
var str = "abc";
str += 1;
var test = typeof (str); // "string"
if (test.length == 6) { // new test("string").length == 6 && delete
  test.sign = "typeof的返回结果可能为String"; // new test("string").sign = "..." && delete
}
console.log(test.sign);// new test("string").sign --> undefined

// ----------------------------------------------

// 运行如下代码 ( 闭包 )
function Person(name, age, sex) {
  var a = 0;
  this.name = name;
  this.age = age;
  this.sex = sex;
  function sss() {
    a++;
    console.log(a);
  }
  this.say = sss;
}
var oPerson = new Person();
oPerson.say(); // 1
oPerson.say(); // 2
var oPerson1 = new Person();
oPerson1.say(); // 1

// ----------------------------------------------

// 运行如下代码
var x = 1,
  y = z = 0;
function add(n) {
  return n = n + 1;
}
y = add(x); // 4
function add(n) {
  return n = n + 3;
}
z = add(x); // 4
console.log(x, y, z); // 1 4 4

