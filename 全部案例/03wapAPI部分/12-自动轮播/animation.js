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
            currentLeft += 15;
        }else{
            currentLeft -= 15;
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

    },10);
}