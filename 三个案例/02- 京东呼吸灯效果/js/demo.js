/**
 * Created by Administrator on 2017/2/8.
 */
$(function(){
    // 1. ���Ҫ�����Ķ���
    var lis = $(".slide-ul li");  // ͼƬ�е�li��ǩ
    var circleLis = $(".circle li");// ���е�СԲ���li��ǩ
    var arrow = $(".arrow");
    var img = 0;//����һ��ͼƬ����li������
    var timerId = null;
    // 2. ��������ʱ��Ҫ��ʾ���Ұ�ť���뿪��ʱ��Ҫ�������Ұ�ť
    $(".slide").hover(function (){
           arrow.fadeIn();
        clearInterval(timerId);
    },function (){
           arrow.fadeOut();
        timerId = setInterval(playNext,2000);
    });
    // 3. ���Ҳఴťע���¼�
    //$(".arrow-right").on("click",function (){
    //      //if(img<lis.length-1){
    //      //    img++;
    //      //}else {
    //      //      img = 0;
    //      //}
    //   playNext();
    //    // eq������������ֵ��֧�ָ���������Ǹ�����ʱ�򣬱�ʾimg+lis.length
    //});
    $(".arrow-right").on("click",playNext);
    // 4. ����ఴťע���¼�
    $(".arrow-left").on("click",function (){
           //if(img>0){
           //    img--;
           //}else {
           //   img = lis.length-1;
           //}
        // imgָ����ǰҪ��ʾ��ͼƬ������
        img>0?img--:img=lis.length-1;
        if(img==lis.length-1){
            lis.eq(0).animate({opacity:0},1000); // ��һ����������
            lis.eq(img).animate({opacity:1},1000);// ���һ����ʾ����
        }else{
            lis.eq(img).animate({opacity:1},1000);// ��ǰ��������ʾ
            lis.eq(img+1).animate({opacity:0},1000);// ��һ��Ҫ��������
        }
        circleLis.eq(img).addClass("current").siblings().removeClass("current");
    });
    // 5. ���СԲ���ʱ��Ҫ�õ�ǰ��СԲ���Ӧ������ͼƬ��ʾ��֮ǰ��������������
    circleLis.on("click",function (){
           var index = $(this).index();//�Ȼ�õ���ĵ�ǰСԲ�������
        lis.eq(index).animate({opacity:1},1000);// ���뵱ǰ�����СԲ���������
        lis.eq(img).animate({opacity:0},1000);
        //circleLis.eq(index).addClass("current").siblings().removeClass("current");
       $(this).addClass("current").siblings().removeClass("current");
        img = index; // ��img����֮ǰ�����СԲ�������
    })
    // 6. �����Զ��ֲ�
    timerId = setInterval(playNext,2000);

    // ��֮ǰ��Ҫִ�еĴ����װ��һ������
    function playNext(){
        img<lis.length-1?img++:img=0;
        console.log(img);
        console.log(img-1);
        lis.eq(img).animate({opacity:1},1000); //�õ�ǰ��li��ǩ��ʾ
        lis.eq(img-1).animate({opacity:0},1000);// ��ǰһ��li��ǩ����
        circleLis.eq(img).addClass("current").siblings().removeClass("current");
    }
})