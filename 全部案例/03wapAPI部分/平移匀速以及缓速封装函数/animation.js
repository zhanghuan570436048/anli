/*
** Create by 张晓坤 on 2018/7/26
* 动画封装函数
*/
/**1.平移动画
 *
 * @param obj  要移动的元素
 * @param target  要移动的目标距离
 */
function animationMove ( obj,target ) {
    //每一次移动之前，先结束上一次的定时器
    clearInterval(obj.timeID);
    /*1.全局变量只能存储一个定时器，无法实现多个元素同时移动
    2.每一个元素在移动的时候，将定时器作为自己的属性
        * 类似于运动员在跑步的时候，每一个运动员的身上都有一个标签记录定时器，
        谁到达终点，回收谁的定时器
     */
    obj.timeID =     setInterval(function (  ) {
        //1.获取元素当前位置
        var currentLeft = obj.offsetLeft;
        //2.计算本次移动的距离
        /* 从左往右移动： 目标位置 > 当前位置    当前位置+=10
           从右往左移动： 目标位置 < 当前位置     当前位置-=10
        ifLeft:   true:从左往右  false：从右往左
         */
        var isLeft  = target>currentLeft?true:false;
        if(isLeft){
            currentLeft += 10;
        }else{
            currentLeft -= 10;
        }
        //3.边界检测
        /*从左往右true:  currentLeft < target
        从右往左false:  currentLeft > target

        边界检测思路：
            * 如果isLeft为true，current<target这个条件成立，需要移动，否则到达目的地
            * 如果isLeft为false，currentLeft > target这个条件成立，需要移动，否则到达目的地
         */
        //这个三元表达式： 如果isLeft是true则返回currentLeft<target，反之返回currentLeft>target
        if(isLeft==true?currentLeft<target:currentLeft>target){
            obj.style.left = currentLeft + 'px';
        }else{
            clearInterval(obj.timeID);//清除定时器
            obj.style.left = target + 'px';
        }
    },50);
}

/**
 * 2.缓动动画
 * @param obj  要动画的元素
 * @param attrs  要改变的属性对象
 * @param fn 回调函数函数
 */
function animationSlow (  obj,attrs,fn) {
    //1.清除对象之前的定时器
    clearInterval(obj.timeID);
    //2.开启本次动画定时器
    obj.timeID = setInterval(function (  ) {
        /*开关思想
        1.每一次移动之前，假设本次移动所有的属性都到达终点  isAllOK = true
        2.验证假设是否成立：只要有任何属性没有到达终点，假设被推翻  isAllOK = false
         */
        var isAllOK = true;
        //遍历参数对象的属性值
        for(var key in attrs){
            if(key == 'zIndex'){
                //层级无需动画，直接修改
                obj.style[key] = attrs[key];
            }else if(key == 'opacity'){
                //获取要修改的属性
                var attr = key;
                //获取要修改的目标值
                var target = attrs[key] * 100;//透明度是小数无法取整，放大一百倍
                //2.1 获取当前属性的值
                //注意点：getComputedStyle获取属性返回的是字符串，需要转成number类型
                //透明度是小数，不能使用parseInt,应该使用parseFloat
                var currentLeft = parseFloat(getStyle(obj,attr)) * 100;
                //2.2 计算本次移动的值
                var step = (target - currentLeft)/10;
                //2.3  取整操作
                step =   step>0?Math.ceil(step):Math.floor(step);
                //2.4 开始移动
                currentLeft += step;
                obj.style[attr] = currentLeft / 100;
                //2.5 终点检测：到达终点清除定时器
                if(currentLeft != target){
                    //只要有任何一个属性没有到达终点：开关假设被推翻
                    isAllOK = false;
                }
            }else{
                //获取要修改的属性
                var attr = key;
                //获取要修改的目标值
                var target = attrs[key];
                //2.1 获取当前属性的值
                //注意点：getComputedStyle获取属性返回的是字符串，需要转成number类型
                var currentLeft = parseInt(getStyle(obj,attr));
                //2.2 计算本次移动的值
                var step = (target - currentLeft)/10;
                //2.3  取整操作
                step =   step>0?Math.ceil(step):Math.floor(step);
                //2.4 开始移动
                currentLeft += step;
                obj.style[attr] = currentLeft + 'px';
                //2.5 终点检测：到达终点清除定时器
                if(currentLeft != target){
                    //只要有任何一个属性没有到达终点：开关假设被推翻
                    isAllOK = false;
                }
            }
        }
        //根据开关的值来判断是否应该停止定时器
        if(isAllOK == true){
            clearInterval(obj.timeID);

            //动画结束之后执行调用者传递过来的一段代码
            //判断调用者是否传递了一段代码，如果传了就执行，不传就不执行
            if(typeof  fn == 'function'){
                fn();
            }

        }
    },50);
}


//
function getStyle (  ele,attr) {
    if(ele.currentStyle){//IE8浏览器
        return ele.currentStyle[attr];
    }else{//非IE8浏览器
        return window.getComputedStyle(ele,null)[attr];
    }
}