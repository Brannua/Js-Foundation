## event-loop 事件循环/事件轮询

- 前情提要

  - JS单线程

  - 异步( 定时器, ajax )要基于回调来实现, DOM事件也基于回调来实现

  - event loop 就是异步回调的实现原理

- JS 如何执行

  - 从前到后, 逐行执行

  - 如果某一行执行报错, 则停止下面代码的执行

  - 先把同步代码执行完, 再执行异步

- summary

  - 同步代码, 一行一行放在 Call Stack 执行

  - 遇到异步, 会先"记录"下, 等待时机( 定时, 网络请求等 )

  - 时机到了, 就移动到 Callback Queue

  - 如果 Call Stack 为空( 即同步代码执行完 ), Event Loop 开始工作

  - 轮询查找 Callback Queue, 如果有则移动到 Call Stack 执行

  - 然后继续轮询查找( 永动机一样 )

  ![](https://s1.ax1x.com/2020/06/12/tOk0PS.jpg)