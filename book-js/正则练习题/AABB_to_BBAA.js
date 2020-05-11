/**
 * @desc 将AABB式字符串 改成BBAA式
 */
function test(str) {
  let reg = /(\w)\1(\w)\2/g
  return str.replace(reg, '$2$2$1$1')
}
console.log(test('aabb'))
