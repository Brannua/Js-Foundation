## http methods

- 传统的 method

  - get 获取服务器的数据

  - post 向服务器提交数据

- 现在的 method

  - get 获取数据

  - post 新建数据

  - patch/put 更新数据

  - delete 删除数据

## Restful-API

- 传统的API设计

  - 把每个url当做一个功能

    - /api/list?pageIndex=2

  - 用method表示操作类型

    - post请求: /api/create-blog

    - post请求: /api/update-blog?id=100

    - get请求: /api/get-blog?id=100

- RestfulAPI设计: 把每个url当做一个唯一的资源

  - 尽量不使用url参数

    - /api/list/2

  - 用method表示操作类型

    - post请求: /api/blog

    - post请求: /api/blog/100

    - get请求: /api/blog/100
