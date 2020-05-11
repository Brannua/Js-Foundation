/**
 * hello-world --> helloWorld
 */
function test(str) {
  let reg = /-(\w)/g
  return str.replace(reg, ($, $1) => {
    return $1.toUpperCase()
  })
}

console.log(test('hello-world'))
