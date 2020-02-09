/**
 * 封装运动框架
 * author: lpj
 * contect me at QQ: 374453156
 */

// -----------------------------------------------------
/**
 * @func {getStyle} 兼容性获取元素样式
 * @params {obj} 操作的元素
 # @params {attr} 要获取的属性
*/
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle;
    } else {
        return window.getComputedStyle(obj, false)[attr];
    }
}

/**
 * @func {paceStayMove} 匀速运动
 * @params {obj} 运动的物体
 * @params {speed} 运动的速度(矢量,有方向)
 * @params {hz} 运动的频率 
 * @params {oTarget} 运动的目标点(DOM元素)
 */
function paceStayMove(obj, speed, hz, oTarget) {
    /* 根据运动物体相对黑线的位置来决定是否修改物体的运动方向 */
    if (obj.offsetLeft > oTarget.offsetLeft) {
        speed = -speed;
    }
    /* 先清除之前的定时器 */
    clearInterval(obj.timer);
    /* 再设置定时器 */
    obj.timer = setInterval(() => {
        /* 如果运动距离和speed不是整除关系,以下这种方式会出现缝隙 */
        // if (oDiv.offsetLeft <= 300) {
        //     clearInterval(timer);
        // } else {
        //     obj.style.left = obj.offsetLeft + speed + 'px';
        // }

        /* 方法改进 */
        /* 物体的运动和停止本身就为悖论,所以用if-else分支语句进行判断 */
        if (Math.abs(oSpan.offsetLeft - obj.offsetLeft) >= Math.abs(speed)) {
            obj.style.left = obj.offsetLeft + speed + 'px';
        } else {
            obj.style.left = oTarget.offsetLeft + 'px';
            clearInterval(obj.timer);
        }
    }, hz);
}

/**
 * @func {startMove} 匀加速运动函数
 * @params {obj} 运动的物体
 * @params {hz} 运动的频率
 * @params {speed} 运动的初速度
 * @params {av} 运动的加速度
 */
function startMove(obj, hz, speed, av) {
    // ve = v0 + at;(匀加速运动的速度公式)
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        speed = speed + av;
        obj.style.left = obj.offsetLeft + speed + 'px';
    }, hz);
}

/**
 * @func {huanChongMove} 广义缓冲运动函数
 * @params {obj} 运动的物体
 * @params {attr} 物体运动的属性
 * @params {target} 运动的目标状态
 * @params {interval} 运动的频率
 */
function huanChongMove(obj, attr, target, interval) {
    /**
     * 如果涉及多物体运动,每一个物体都应该有自己的定时器
     * 而非公用定时器
     * 所以将timer改为运动物体自己的属性
     */
    var speed;
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
        /* 判断是否采取缩放思想 */
        /**
         * 由于像opacity这种属性[0, 1)
         * 而且speed为矢量有方向( 正负 )
         * 会造成Math.ceil和Math.floor只能取到0,1,-1三个值
         * 所以采用缩放的思想
         */
        if (attr == 'opacity') {
            speed = (target - parseFloat(getStyle(obj, attr))) / 8 * 100;
        } else {
            speed = (target - parseFloat(getStyle(obj, attr))) / 8;
        }
        /* 解决小数BUG */
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        /* 判断是否采取缩放思想 */
        if (attr == 'opacity') {
            speed = speed / 100;
        }
        /* 运动和停止的逻辑 */
        if (parseFloat(getStyle(obj, attr)) === target) {
            clearInterval(obj.timer);
        } else {
            if (attr == 'opacity') {
                obj.style.opacity = parseFloat(getStyle(obj, attr)) + speed;
            } else {
                obj.style[attr] = parseFloat(getStyle(obj, attr)) + speed + 'px';
            }
        }
    }, interval);
}


/**
 * @func {chainMultiMove} 多物体多值链式运动
 * @params {obj} 运动的物体
 * @params {targetMix} 多种目标状态的对象
 * @params {hz} 运动频率
 * @params {callback} 实现链式调用的回调函数
 */
function chainMultiMove(obj, targetMix, hz, callback) {
    var flag = false;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        for (var attr in targetMix) {
            var target = targetMix[attr],
                speed;
            if (attr == 'opacity') {
                speed = (target - parseFloat(getStyle(obj, attr))) / 8 * 100;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                speed = speed / 100;
                obj.style.opacity = parseFloat(getStyle(obj, attr)) + speed;
            } else {
                speed = (target - parseFloat(getStyle(obj, attr))) / 8;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                obj.style[attr] = parseFloat(getStyle(obj, attr)) + speed + 'px';
            }
            /* 如果所有属性都达到目标点,就将flag变为true */
            if (parseFloat(getStyle(obj, attr)) == targetMix[attr]) {
                flag = true;
            }
        }
        /* 所有属性都达到目标点后,清除定时器并判断是否执行回调函数 */
        if (flag) {
            clearInterval(obj.timer);
            if (typeof callback == 'function') {
                callback();
            }
        }
    }, hz)
}

/**
 * @func {multiMove} 合成运动函数
 * @params {obj} 运动的物体
 * @params {hz} 运动的频率
 * @params {vx} 运动的水平初速度
 * @params {vy} 运动的竖直初速度
 * @params {lossEn} 运动碰壁的能量损失比率
 */
function multiMove(obj, hz, vx, vy, lossEn) {
    var g = 10; // 模拟重力加速度
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        vy += g;
        var newLeft = obj.offsetLeft + vx,
            newTop = obj.offsetTop + vy;
        /**
         * 1. 要进行预判,如果取大于号,判为下一步运动超出视口,置为不超出,就不会出现滚动条了
         * 2. 物体碰撞视口边界要有能量损失
         */
        function lossEn(vx, vy, lossEn) {
            vx *= lossEn;
            vy *= lossEn;
            return {
                x: vx,
                y: vy
            }
        }
        if (newTop >= document.documentElement.clientHeight - obj.offsetHeight) {
            vy *= -1;
            newTop = document.documentElement.clientHeight - obj.offsetHeight;
            vx = lossEn(vx, vy, 0.8).x;
            vy = lossEn(vx, vy, 0.8).y;
        }
        if (newLeft >= document.documentElement.clientWidth - obj.offsetWidth) {
            vx *= -1;
            newLeft = document.documentElement.clientWidth - obj.offsetWidth;
            vx = lossEn(vx, vy, 0.8).x;
            vy = lossEn(vx, vy, 0.8).y;
        }
        if (newTop <= 0) {
            vy *= -1;
            newTop = 0;
            vx = lossEn(vx, vy, 0.8).x;
            vy = lossEn(vx, vy, 0.8).y;
        }
        if (newLeft <= 0) {
            vx *= -1;
            newLeft = 0;
            vx = lossEn(vx, vy, 0.8).x;
            vy = lossEn(vx, vy, 0.8).y;
        }
        obj.style.left = newLeft + 'px';
        obj.style.top = newTop + 'px';
    }, hz)
}

/**
 * @func {tanMove} 弹性运动
 * @params {obj} 运动的物体
 * @params {hz} 运动的频率
 * @params {target} 钉子所在位置
 * @params {jdxs} 皮筋的劲度系数
 * @params {u} 摩擦系数
 */
function tanMove(obj, hz, target, jdxs, u) {
    var av, // 加速度
        v0 = 0, // 初速度为0
        ve; // 末速度
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
        /* 无摩擦力计算加速度 */
        av = (target.offsetLeft - obj.offsetLeft) / 8 * jdxs;
        /* 无摩擦力计算末速度 */
        ve = v0 + av;
        /* 考虑摩擦力计算末速度 */
        ve = ve * u;
        ve = ve > 0 ? Math.floor(ve) : Math.ceil(ve);
        if (obj.offsetLeft == target.offsetLeft && ve == 0) {
            clearInterval(obj.timer);
        } else {
            obj.style.left = obj.offsetLeft + ve + 'px';
        }
    }, hz);
}