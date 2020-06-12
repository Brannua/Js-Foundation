- 前情提要

  - 异步回调 callback hell

  - Promise then catch 链式调用, 但也是基于回调函数

  - async/await 是同步语法, 基于 Promise

  ```js
    async function foo() {
      return 100 // 相当于 return Promise.resolve(100)
    }

    const res = foo()
    console.log('res', res);
    res.then(data => {
      console.log('data', data);
    })
  ```
  ```js
    async function too() {
      return Promise.resolve(200)
    }

    const end = too()
    console.log('end', end);
    end.then(end => {
      console.log('end', end);
    })
  ```

- 基本语法...

- async/await 和 Promise 的关系

  - 执行 async 函数, 返回的是 Promise 对象

  - await 相当于 Promise 的 then

  ```js
    (async function () {
      const p = Promise.resolve(300)
      const data = await p  // await 相当于 Promise.then
      console.log(data)
    }())

    (async function () {
      const data = await 400  // await Promise.resolve(400)
      console.log(data)
    }())
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

