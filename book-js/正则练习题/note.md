- 正则表达式: 匹配特殊字符或有特殊搭配原则的字符的最佳选择

  - 修饰符
    - i:忽略大小写
    - g:全局匹配
    - m:多行匹配
     
  - 创建方法：1.直接量 2.new RegExp()
    
    ```js
      let reg = /abc/
      let str = 'abcd'
      console.log(reg.test(str))
    ```

  - 一个[]代表一位，^放在[]里面，表示非，放在外面表示以...开头，$表示以...结束

    - 查找str中是否有前三位是数字的字符

      ```js
      let reg = /^([0-9][0-9][0-9])/g
      let str = '123asd'
      console.log(str.match(reg))
      ```
     
  - 元字符: 拥有特殊含义的字符

    ```js
      \:  转义字符
      \n: 换行(document.write()中失效 因为该方法把换行理解为空格)
      \r: 行结束符
      \t: 缩进或制表
      ...
    ```
