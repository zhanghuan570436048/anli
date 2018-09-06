/**
 * Created by Administrator on 2017/2/8.
 */
$(function(){
    // 1. 获得要操作的对象
    var lis = $(".slide-ul li");  // 图片中的li标签
    var circleLis = $(".circle li");// 所有的小圆点的li标签
    var arrow = $(".arrow");
    var img = 0;//定义一个图片或是li的索引
    var timerId = null;
    // 2. 鼠标移入的时候，要显示左右按钮，离开的时候，要隐藏左右按钮
    $(".slide").hover(function (){
           arrow.fadeIn();
        clearInterval(timerId);
    },function (){
           arrow.fadeOut();
        timerId = setInterval(playNext,2000);
    });
    // 3. 给右侧按钮注册事件
    //$(".arrow-right").on("click",function (){
    //      //if(img<lis.length-1){
    //      //    img++;
    //      //}else {
    //      //      img = 0;
    //      //}
    //   playNext();
    //    // eq这个方法里面的值，支持负数，如果是负数的时候，表示img+lis.length
    //});
    $(".arrow-right").on("click",playNext);
    // 4. 给左侧按钮注册事件
    $(".arrow-left").on("click",function (){
           //if(img>0){
           //    img--;
           //}else {
           //   img = lis.length-1;
           //}
        // img指代当前要显示的图片的索引
        img>0?img--:img=lis.length-1;
        if(img==lis.length-1){
            lis.eq(0).animate({opacity:0},1000); // 第一张隐藏起来
            lis.eq(img).animate({opacity:1},1000);// 最后一张显示出来
        }else{
            lis.eq(img).animate({opacity:1},1000);// 当前的这张显示
            lis.eq(img+1).animate({opacity:0},1000);// 下一张要隐藏起来
        }
        circleLis.eq(img).addClass("current").siblings().removeClass("current");
    });
    // 5. 点击小圆点的时候，要让当前与小圆点对应索引的图片显示，之前的那张隐藏起来
    circleLis.on("click",function (){
           var index = $(this).index();//先获得点击的当前小圆点的索引
        lis.eq(index).animate({opacity:1},1000);// 让与当前点击的小圆点的索引的
        lis.eq(img).animate({opacity:0},1000);
        //circleLis.eq(index).addClass("current").siblings().removeClass("current");
       $(this).addClass("current").siblings().removeClass("current");
        img = index; // 让img等于之前点击的小圆点的索引
    })
    // 6. 开启自动轮播
    timerId = setInterval(playNext,2000);

    // 将之前的要执行的代码封装成一个函数
    function playNext(){
        img<lis.length-1?img++:img=0;
        console.log(img);
        console.log(img-1);
        lis.eq(img).animate({opacity:1},1000); //让当前的li标签显示
        lis.eq(img-1).animate({opacity:0},1000);// 让前一张li标签隐藏
        circleLis.eq(img).addClass("current").siblings().removeClass("current");
    }
})