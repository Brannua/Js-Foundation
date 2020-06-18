> 注意: header是可以自定义的

## 常见的 Request Headers

- Accept 浏览器可接收的数据格式

- Accept-Encoding 浏览器可接收的压缩算法, 比如gzip

- Accept-Language 浏览器可以接收的语言, 比如zh-CN

- Connection: keep-alive, 一次TCP链接可以重复使用

- cookie

- Host, 请求的域名

- User-Agent, 简称( UA ), 浏览器信息

- Content-type, 发送数据的格式, 比如application/json

## 常见的 Response Headers

- Content-type, 发送数据的格式, 比如application/json

- Content-length, 返回数据的大小, 多少字节

- Content-Encoding, 返回数据的压缩算法, 比如gzip

- Set-Cookie, 服务端要向客户端设置Cookie

## 缓存相关的headers

- Cache-Control

- Expires

- Last-Modified

- If-Modified-Since

- Etag

- If-None-Match
