/**
 * 封装函数, 比较实参和形参个数多少
 */
function test(a, b) {
  arguments.length > test.length && console.log("实参比形参多");
  arguments.length < test.length && console.log("实参比形参少");
  arguments.length == test.length && console.log("实参和形参一样多");
}
// test(1);
// test(1, 2);
// test(1, 2, 3);

/**
 * 封装任意个参数的求和函数( 加法计数器 )
 */
function test2() {
  if (arguments.length) {
    // 定义初始值
    var sum = 0;
    // 累加
    for (var i = 0; i < arguments.length; i++) {
      sum += arguments[i];
    }
    // 返回值
    return sum;
  }
}
// console.log(test2(1, 2, 3, 4));

/**
 * 封装函数 , 告知所选定的小动物的叫声
 */
function animalVoice(animal) {
  switch (animal) {
    case 'dog':
      console.log('wang~');
      break;
    case 'cat':
      console.log('miao~');
      break;
    case 'fish':
      console.log('bo~');
      break;
    default:
      break;
  }
}

/**
 * 封装一组函数 , 输入数字 , 逆转并输出汉字形式
 */
function reverse(num) {
  var result = "";
  // 转化成string类型的数字
  num += ""; 
  // string底层基于array
  for (var i = num.length - 1; i >= 0; i--) {
    result += transfer(num[i]);
  }
  return result;
}

function transfer(target) {
  switch (target) {
    case "0":
      return "零";
    case "1":
      return "一";
    case "2":
      return "二";
    case "3":
      return "三";
    case "4":
      return "四";
    case "5":
      return "五";
    case "6":
      return "六";
    case "7":
      return "七";
    case "8":
      return "八";
    case "9":
      return "九";
    default:
      return;
  }
}
console.log(reverse(123));