//所有的关于蛇的代码写在这里.
(function (window) {
  //随机产生一个十六进制的颜色的函数.
  function getColorForRandom(){
    var arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];  //下标0-15
    var str = "#";
    //循环产生 6个 0-15的数.
    for(var i = 0 ; i < 6; i++){
      var num = Math.floor(Math.random()*16);
      //根据这个随机数,在arr数组中去取值.
      str += arr[num];
    }
    return str;   //"#985700"
  }




  //声明一个数组,用来保存表示蛇的每一节身体的div.
  var list = [];

  //1.蛇也有宽高,也有背景色,也有坐标还有方向,所以蛇应该也是一个对象,也有构造函数.
  function Snake(width,height,direction){
    this.width = width || 20;
    this.height = height || 20;
    this.direction = direction || "right";
    //用数组描述蛇的身体:因为蛇有很多节,还有吃食物长身体就可以直接push方法.
    //把每一节共同的宽高方向提炼出来,body里面就方法每一节不同的信息.比如坐标,还有背景色.
  	this.body = [
      {x:3,y:1,bgColor:'red'},
      {x:2,y:1,bgColor:'green'},
      {x:1,y:1,bgColor:'purple'},
    ];
  }

  //2.蛇显示地图的函数写在原型中.
  //思路:把蛇的每一节身体都渲染出来,整条蛇不就出来了吗?
  Snake.prototype.render = function (map) {
    //渲染新蛇之前,删掉老蛇'
    remove(map);

    //2.1 用for循环遍历出每一节蛇身体
    for(var i = 0 ; i < this.body.length; i++){
      var snakeUnit = this.body[i];
      //2.2 创建div,让div拥有所有这一节蛇身体的显示信息
      var div1 = document.createElement("div");
      div1.style.position = "absolute";
      div1.style.left = snakeUnit.x * this.width + "px";
      div1.style.top = snakeUnit.y * this.height+"px";
      div1.style.width = this.width + "px";
      div1.style.height = this.height + "px";
      div1.style.backgroundColor = snakeUnit.bgColor;
      //2.3 把div添加进map地图中.
      map.appendChild(div1);
      //2.4 把div添加到数组list中.
      list.push(div1);
    }
  }

  //5.声明一个方法,移除老蛇.
  function remove(map){
    //就是找到老蛇的那些div,从map中移除.   : 老蛇那些div在渲染的时候已经保存在数组list中了.
    for(var i = 0 ; i < list.length; i++){
    	map.removeChild(list[i]);
    }
    //清空数组list
    list.length = 0;
  }



  //4.蛇移动的方法写在原型中比较好,蛇对象直接可以调用.
  Snake.prototype.move = function (food,map) {
    //4.1 除了蛇头之外的蛇身体移动: 移动之后的坐标是他的上一节身体移动之前的坐标
    for(var i = this.body.length-1; i > 0; i--){
      this.body[i].x = this.body[i-1].x;
      this.body[i].y = this.body[i-1].y;
    }
    //4.2 蛇头移动: 根据方向来改变坐标.
    switch (this.direction){
      case "right":
        this.body[0].x++;
        break;
      case "left":
        this.body[0].x--;
        break;
      case "top":
        this.body[0].y--;
        break;
      case "bottom":
        this.body[0].y++;
        break;
    }

    //4.3 判断蛇有没有吃到食物: 蛇头的坐标和食物的坐标重合(x和y都相等).
    var snakeHeadX = this.body[0].x * this.width; //蛇头的x坐标.
    var snakeHeadY = this.body[0].y *this.height; //蛇头的y坐标.
    var foodX = food.x;//食物的x坐标.
    var foodY = food.y;//食物的y坐标.

    //在长身体之前,把原来的蛇尾巴取出来.
    var lastSnakeUnit = this.body[this.body.length-1];

    //判断:如果蛇头的坐标和食物的坐标重合,就表示蛇吃了食物.
    if(snakeHeadX == foodX && snakeHeadY == foodY){
      //吃了食物,应该长身体.
      this.body.push({
        x:lastSnakeUnit.x,
        y:lastSnakeUnit.y,
        bgColor:getColorForRandom()
      });
      //食物吃了,重新生成一个食物.
      food.render(map); //调用食物对象的render方法,重新的生成一个坐标再渲染,就感觉产生了一个新的食物.
    }

  }





  //3.把Snake构造函数给暴露出去.
  window.Snake = Snake;
  
}(window));
