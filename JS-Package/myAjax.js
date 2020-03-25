
/**
 * 兼容性 Ajax
 * @param { String } method 发送请求的方式
 * @param { String } url 请求的URL
 * @param { String } data 请求参数
 * @param { Function } callback 回调函数
 * @param { Boolean } flag 默认为 true , 表示发送ajax请求是异步操作
 */
function ajaxFunc(method, url, data, callback, flag) {
  // 获取兼容IE的AJAX对象
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
  method = method.toUpperCase(); // 转大写

  // 发送请求
  if (method == 'GET') {
    xhr.open(method, url, flag);
    xhr.send();
  }
  if (method == 'POST') {
    xhr.open(method, url + '?' + data, flag);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //设置请求头,使用form表单的默认编码格式
    xhr.send(data);
  }

  // 事件监听
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        callback(xhr.responseText);
      }
    }
  }
}
