## Promise

- 三种状态: pending --> resolved && pending --> rejected

```js
  const log = console.log

  const p1 = new Promise((resolve, reject) => {})
  log('p1', p1);

  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => { resolve('hhh') });
  })
  log('p2', p2);
  setTimeout(() => { log('p2-timeout', p2) });

  const p3 = new Promise((resolve, reject) => {
    setTimeout(() => { reject('ggg') });
  })
  log('p3', p3);
  setTimeout(() => { log('p3-timeout', p3) });
```

- 状态的表现和变化

```js
  const log = console.log
  const error = console.error

  Promise.resolve('ok').then(res => { log(res) }).catch(err => { error(err) })
  Promise.reject('no').then(res => { log(res) }).catch(err => { error(err) })
```

- then 和 catch 对状态的影响

  - then 正常返回 resolved, 里面有报错则返回 rejected
  - catch 正常返回 resolved, 里面有报错则返回 rejected

```js
const log = console.log

Promise.resolve().then(() => { log(1) }).catch(() => { log(2) }).then(() => { log(3) })

Promise.resolve().then(() => { log(1); throw new Error('error1') }).catch(() => { log(2) }).then(() => { log(3) })

Promise.resolve().then(() => { log(1); throw new Error('error1') }).catch(() => { log(2) }).catch(() => { log(3) })
```
