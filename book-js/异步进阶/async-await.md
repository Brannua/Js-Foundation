- 前情提要

  - 异步回调地狱 callback hell

  - Promise then catch 链式调用, 但也是基于回调函数

  - async/await 是同步语法, 基于 Promise

    - 执行 async 函数返回 Promise 对象

    - await 关键字相当于 Promise 的 then 方法

    - await 行后面的代码相当于 Promise 回调函数中的代码

- 浏览器中运行如下两段代码, 观察区别

  ```js
    async function foo() {
      return 100;
    }

    const res = foo()

    console.log('res', res);

    res.then(data => {
      console.log('data', data);
    })
  ```
  ```js
    async function foo() {
      return Promise.resolve(200);
    }

    const res = foo();

    console.log('res', res);

    res.then(res => {
      console.log('res', res);
    })
  ```

- try-catch 可以捕获异常, 代替了 Promise 的 catch

  ```js
    (async function () {
      const p = Promise.reject('err')
      try {
        const res = await p
        console.log(res)
      } catch(ex) {
        console.error(ex)
      }
    }())
  ```
