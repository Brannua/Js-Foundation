/**
 * 模拟bind方法的底层实现
 *  1. 旧函数调用bind(obj)会返回一个新函数
 *  2. 新函数使用旧函数的功能且判断是否改变this指向
 *  3. 调用bind函数可传递参数 , 作为返回的新函数的默认参数
 *  4. 调用bind函数后返回的新函数的实际参数包含 (this, [默认参数], [新函数参数])
 *  5. 旧函数调用bind函数返回的新函数new出的实例化对象的constructor是旧函数, 利用圣杯模式继承的方式
 */

Function.prototype.myBind = function (oThis) {
  // 3 4
  var defaultArr = [],
    lenDefault = arguments.length,
    that = this;
  for (var i = 1; i < lenDefault; i++) {
    defaultArr.push(arguments[i]);
  }

  var func = function () {
    // Tips : 使用new关键字执行则会 --> var this = Object.create(func.prototype);

    // 3 4
    var len = arguments.length;
    for (var i = 0; i < len; i++) {
      defaultArr.push(arguments[i]);
    }

    // 2 
    // Tips : 三目运算符判断执行新函数的时候是否使用了new关键字
      // 使用了new则忽略bind(obj)中的obj , 不改变this指向 , 谁调用就指向谁
      // 没使用new则让新函数的this指向obj
    that.apply(this instanceof temp ? this : (oThis || window), defaultArr);
  }

  // 5
  var temp = function () {};
  temp.prototype = this.prototype;
  func.prototype = new temp();

  // 1
  return func;
}



/* 
  测试用例
*/
var obj = { name: 'liu' }
function foo(value1, value2, value3, value4) {
  console.log(this)
  console.log(this.name, value1, value2, value3, value4)
}


foo.myBind(obj, 'default1', 'default2')('default3', 'default4')


var Test = foo.myBind(obj),
test = new Test();
console.log(test.constructor);
