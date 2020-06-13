> event-loop 和 DOM渲染 的关系

- 回顾一遍 event loop 的过程

- JS 是单线程的, 而且和DOM渲染共用一个线程

- JS执行的时候, 得留一些时机供DOM渲染

  - 每当callStack清空, 即同步任务执行完

  - 会先执行micro task queue中的微任务

  - 再尝试触发DOM渲染

  - 再触发Event loop

> 微任务 和 宏任务

- 微任务: DOM渲染前触发( Promise, async/await )

  - 微任务是ES6语法规定的

- 宏任务: DOM渲染后触发( setTimeout, setInterval, Ajax, DOM事件 )

  - 宏任务是由浏览器规定的

> 从event-loop解释, 为何微任务执行时机更早

  - 同步代码, 一行一行放在 Call Stack 执行

  - 遇到异步宏任务, 记录到 Web-APIs, 等待时机( 定时, 网络请求等 ), 时机到了, 就移动到 Callback Queue

  - 遇到异步微任务, 记录到 micro-task-queue

  - 如果 Call Stack 为空( 即同步代码执行完 ), 先执行micro-task-queue中的微任务

  - 微任务执行完毕, 尝试进行DOM渲染

  - 然后 Event Loop 开始工作

  - 轮询查找 Callback Queue, 如果有则移动到 Call Stack 执行

  - 然后继续轮询查找( 永动机一样 )