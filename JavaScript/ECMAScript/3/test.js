/**
 * 作业
 */

/**
 * 计算2的n次幂 , n可输入 , n为自然数
 */
function demo1(n) { // @param n 次幂
  var res = 1; // res 为 2^0 , n == 0 在这里进行判断
  while (n--) { // n 不为 0才会进入该循环体
    res *= 2;
  }
  return res;
}

/**
 * 计算n的阶乘 , n可输入
 */

/* 常规写法 */
function demo2(n) { // @param ( n >= 0 )
  if (n >= 0) {
    var res = 1; // 0 和 1 的阶乘是1
    while (n > 1) { // n 大于 1才进入循环体 , 从大向小计算阶乘
      res *= n;
      n--;
    }
    return res;
  } else {
    console.error("参数取值范围错误 , 参数范围为自然数");
  }
}

/* 递归写法( 找规律找出口 ) */
function _demo2(n) {
  if (n >= 0) {
    return n > 1 ? n * _demo2(n - 1) : 1;
  } else {
    console.error("参数取值范围错误 , 参数范围为自然数");
  }
}
// console.log(_demo2(-1));
// console.log(_demo2(0));
// console.log(_demo2(1));
// console.log(_demo2(4));

/**
 * 斐波那契数列 , 输出第n项
 * 1、1、2、3、5、8
 */

/* 常规写法, 利用指针和循环 */
function demo3(n) {
  if (n > 0) {
    // 第1、2项都是1 , thi为第三项即返回值 , 也默认为1
    var fir = 1,
      sec = 1,
      thi = 1;
    if (n > 2) {
      for (var i = 0; i < n - 2; i++) {
        thi = fir + sec;
        fir = sec;
        sec = thi;
      }
    }
    return thi;
  } else {
    console.error("参数取值范围错误 , 参数范围为正整数");
  }
}

/* 递归写法(找规律找出口) */
/* fb(n) = fb(n - 1) + fb(n - 2) */
function _demo3(n) {
  if (n > 0) {
    var res = 1; // 第1、2项都是1
    if (n > 2) {
      return demo3(--n) + demo3(--n);
    }
    return res;
  } else {
    console.error("参数取值范围错误 , 参数范围为正整数");
  }
}

/**
 * 编写程序输出一个三位数的正整数 , 输出时反向输出
 * 如输入456 --> 输出654
 */

function demo4(n) {
  var tpl = parseInt(n / 10);
  var bai = parseInt(n / 100); // 取出百位
  var shi = tpl % 10; // 取出十位
  var ge = n - tpl * 10; // 取出个位
  return ge * 100 + shi * 10 + bai;
}

/**
 * 输入a、b、c三个数字 , 打印出最大的
 */

function demo5(a, b, c) {
  var res = a > b ? a : b;
  return res > c ? res : c;
}

/**
 * 打印出100以内的质数
 * 1不是质数也不是合数
 * 质数是指在大于1的自然数中，除了1和它本身以外不再有其他因数的自然数。
 */

/* 常规写法 */
function demo6() {
  console.time("timer");
  var flag = 1; // 默认flag == 1为质数
  for (var i = 97; i > 1; i--) { // i ==> 2-97之间的自然数
    // var flag = 1;
    for (var j = i - 1; j > 1; j--) { // 从2-(i-1)试
      if (i % j == 0) { // 一旦有其他因数
        flag = 0; // 就不是质数
        break;
      }
    }
    flag && console.log(i + " 为质数");
    flag = 1; // 当前数判断完毕之后恢复flag的默认值 , 方便下一次判断使用 , 注意这种写法比注释掉的好处在于只向系统申请一次空间
  }
  console.timeEnd("timer");
}

/* 优化写法 */
function _demo6() {
  var time = 0;
  for (var i = 2; i < 98; i++) {
    // var time = 0;
    for (var j = 1; j <= Math.sqrt(i); j++) {
      i % j == 0 && time++;
    }
    time == 1 && console.log(i + " 为质数");
    time = 0; // 当前数判断完毕之后恢复time的默认值 , 方便下一次判断使用 , 注意这种写法比注释掉的好处在于只向系统申请一次空间
  }
}

demo6();