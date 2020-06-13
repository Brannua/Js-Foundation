// function multi(num) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(num * num)
//     }, 1000)
//   })
// }

// let arr = [1, 2, 3];

// arr.forEach(async (i) => {
//   const res = await multi(i)
//   console.log(res)
// })

// (async function () {
//   for (let i of arr) {
//     var res = await multi(i);
//     console.log(res);
//   }
// }())

// -------------------------------------------------

// function asyncDemo() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log(1);
//       resolve();
//     }, 1000);
//   })
// }

// async function main() {
//   for (var i = 0; i < 3; i ++) {
//     await asyncDemo();
//       console.log('ok');
//   }
// }

// main()

// --------------------------------------

// (async function () {
//   const p = Promise.resolve(300);
//   console.log(p);
//   const data = await p;
//     console.log(data);
// }());

// (async function () {
//   const data = await 400;
//     console.log(data);
// }());