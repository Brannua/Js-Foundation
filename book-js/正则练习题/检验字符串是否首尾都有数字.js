// 用正则表达式检验一个字符串 是否首尾都含有数字
function checkNum(str) {
  let reg = /^\d[\s\S]*\d$/g
  return reg.test(str)
}
console.log(checkNum('243aius13'))
