/**
 * JS 精度不准 , 尽量避免直接操作小数
 * 
 * 且可正常计算的范围是小数点前后各16位
 * 
 * Math.ceil() Math.floor() parseInt()
*/

/* bug */
console.log(0.14 * 100); // 14.000000000000002

/* bug */
for (var i = 0; i < 10; i ++) {
  var num = Math.random().toFixed(2) * 100;
  console.log(num); // 偶尔出现精度不准
}

/* handler */
for (var i = 0; i < 10; i ++) {
  var num = Math.random() * 100;
  num = num.toFixed(2);
  console.log(num);
}