/**
 * 阅读代码打印运行结果
 */

var foo = '123';
function print() {
  var foo = '456';
  this.foo = '789';
  console.log(foo);
}
print();

// ---------------------------------

var foo = 123;
function print() {
  this.foo = 234;
  console.log(foo);
}
print();

// ---------------------------------

var foo = 123;
function print() {
  this.foo = 234;
  console.log(foo);
}
new print();

// ---------------------------------

var a = 5;
function test() {
  a = 0;
  console.log(a);
  console.log(this.a);
  var a;
  console.log(a);
}
test();
new test();

// ---------------------------------

function print() {
  console.log(foo);
  var foo = 2;
  console.log(foo);
  console.log(hello);
}
print();

// ---------------------------------

function print() {
  var test;
  test();
  function test() {
    console.log(1);
  }
}
print();

// ---------------------------------

function print() {
  var x = 1;
  if (x == "1") {
    console.log("One");
  }
  if (x === "1") {
    console.log("Two");
  }
}
print();

// ---------------------------------

function print() {
  var marty = {
    name: 'marty',
    printName: function () {
      console.log(this.name);
    }
  }
  var test1 = { name: "test1" };
  var test2 = { name: "test2" };
  var test3 = { name: "test3" };
  test3.printName = marty.printName;
  marty.printName.call(test1);
  marty.printName.apply(test2);
  marty.printName();
  test3.printName();
}
print();

// ---------------------------------

var bar = {a : "002"};
function print() {
  bar.a = 'a';
  Object.prototype.b = 'b';
  return function inner() {
    console.log(bar.a);
    console.log(bar.b);
  }
}
print()();

// ---------------------------------

