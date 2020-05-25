// 你不知道的秘密之 ```JSON.stringify```

// ------------------------------------------------------------------------------

// 普通用法
// 注意JSON数据的键名都是带双引号的字符串

// const foo = {
//   name: 'lpj',
//   age: 18,
//   123: 123,
// };

// document.write(foo);
// document.write(JSON.stringify(foo));
// alert(foo);
// alert(JSON.stringify(foo));

// ------------------------------------------------------------------------------

// 进阶用法，第二个参数是数组
// 如果我们只想获取foo中的某一个属性，直接打印foo就会打印出过多没用的信息，不利于我们查找属性
// const foo = {
//   id: 001,
//   type: '打包机',
//   name: '无敌打包机',
//   price: 12345,
//   attrs: [{
//     a: 'a',
//     b: 'b',
//   },{
//     c: 'c',
//     d: 'd',
//   }]
// }
// console.log(foo);
// console.log(foo.name);
// console.log(JSON.stringify(foo, ['name']));

// ------------------------------------------------------------------------------

// 进阶用法，第二个参数是函数
// 根据函数中写入的逻辑来计算每个键值对，如果返回undefined，则不会打印键值对
// const foo = {
//   name: 'lpj',
//   age: 18
// }
// console.log(
//   JSON.stringify(foo, (key, value) => {
//     if (typeof (value) === 'string') {
//       return undefined
//     }
//     return value
//   })
// )

// ------------------------------------------------------------------------------

// 进阶用法，第三个参数是数字或字符串，用来格式化输出的缩进字符
// const foo = {
//   name: 'lpj',
//   age: 18
// }
// console.log(foo);
// console.log(JSON.stringify(foo, null, 2))
// console.log(JSON.stringify(foo, null, 4))
// console.log(JSON.stringify(foo, null, 'lpj-'))
/* 
  { name: 'lpj', age: 18 }
  {
    "name": "lpj",
    "age": 18
  }
  {
      "name": "lpj",
      "age": 18
  }
  {
  lpj-"name": "lpj",
  lpj-"age": 18
  }
*/

// ------------------------------------------------------------------------------

// 原理探究，JSON.stringify方法返回toJSON方法执行结果的序列化结果
const foo = {
  name: 'lpj',
  age: 18,
  toJSON() {
    return {
      name: this.name
    }
  }
}
console.log(JSON.stringify(foo));
