// 版本号比较

// 微信客户端和小程序基础库的版本号风格为 Major.Minor.Patch（主版本号.次版本号.修订版本号）。
// 文档中会在组件，API等页面描述中带上各个功能所要求的最低基础库版本号。
// 开发者可以在小程序中通过调用 wx.getSystemInfo 获取到当前小程序运行的基础库的版本号。
// 通过版本号比较的方式进行运行低版本兼容逻辑。
// 你需要实现一个版本号比较函数：
// compareVersion(v1, v2)
// 如果v1>v2，返回1；v1<v2，返回-1；两者相等返回0。

// 如：
// compareVersion('1.11.0', '1.9.9') // 1
// compareVersion('1.11', '1.11.0') // 0
// compareVersion('2', '1.11.0') // 1 

function compareVersion(v1, v2) {
    var arr1 = v1.split('.'),
        arr2 = v2.split('.');

    while (arr1.length < 3) {
        arr1.push(0);
    }
    while (arr2.length < 3) {
        arr2.push(0);
    }

    for (var i = 0; i < 3; i ++) {
        if (parseInt(arr1[i]) === parseInt(arr2[i])) {
            continue;
        }
        if (parseInt(arr1[i]) < parseInt(arr2[i])) {
            return -1;
        }
        if (parseInt(arr1[i]) > parseInt(arr2[i])) {
            return 1;
        }
    }

    return 0;
}

console.log(compareVersion('1.11.0', '1.9.9')); // 1
console.log(compareVersion('1.11', '1.11.0'));  // 0
console.log(compareVersion('1', '1.11.0'));     // -1
