//所有关于游戏逻辑的代码写在这里.
(function (window) {
  //声明一个全局变量that,用来记录游戏控制器对象.
  var that = null;

  //1.游戏控制器对象,所以也有构造函数.
  function Game(map){
    this.snake = new Snake();
    this.food = new Food();
    this.map = map;
    //对that赋值.
    that = this;
  }

  //2.游戏开始方法.
  Game.prototype.start = function () {
    //2.1 渲染出蛇和食物.
    this.snake.render(this.map);
    this.food.render(this.map);

    // //2.2 调用蛇移动的方法让蛇移动.
    // this.snake.move();
    // //2.3 蛇移动产生了新坐标,要重新渲染蛇.
    // this.snake.render(this.map);

    snakeAutoMove();

    bindKey();
  }


  //4.让蛇不停的动起来.
  function snakeAutoMove(){
    //让蛇不停的动起来,就是用计时器不停的去调用下面这两句话.
    var timerId = setInterval(function () {
      //为什么这里的this是window.
      //console.log(this);//window
      //console.log(this.snake); //undefined
      // //调用蛇移动的方法让蛇移动.
      // this.snake.move(); //报错.
      // //蛇移动产生了新坐标,要重新渲染蛇.
      // this.snake.render(this.map);


      //--------------------------------------------------
      //如何解决这个问题? 让这个回调函数中的this从window改成游戏控制器对象.
      //调用蛇移动的方法让蛇移动.
      this.snake.move(this.food,this.map);
      //蛇移动产生了新坐标,要重新渲染蛇.
      this.snake.render(this.map);


      //---------------------------------------------------
      //蛇移动有可能超出了边界.
      var snakeHeadX = this.snake.body[0].x * this.snake.width; //找到蛇头的坐标x.
      var snakeHeadY = this.snake.body[0].y * this.snake.height; //找到了蛇头的坐标y.
      if(snakeHeadX < 0 || snakeHeadY < 0 || snakeHeadX >= this.map.offsetWidth || snakeHeadY >= this.map.offsetHeight ){
        //超出边界,停止计时器停止游戏.
        alert("Game Over!");
        clearInterval(timerId);
      }


    }.bind(that),400);
  }


  //5.声明一个方法:让蛇根据键盘按键来改变方向移动.
  function bindKey(){
    window.onkeydown = function (e) {
      e = e || window.event;
      //获取按的是那个键(按得是上键,还是下键,还是左键还是右键.)
      //console.log(e.keyCode); //左37  上38  右39  下40
      switch (e.keyCode){
        case 37:
          //改变蛇的方向为左.
          if(this.snake.direction != "right"){
            this.snake.direction = "left";
          }
          break;
        case 38:
          //改变蛇的方向为上.
          if(this.snake.direction != "bottom"){
            this.snake.direction = "top";
          }
          break;
        case 39:
          //改变蛇的方向为右.
          if(this.snake.direction != "left"){
            this.snake.direction = "right";
          }
          break;
        case 40:
          //改变蛇的方向为下.
          if(this.snake.direction != 'top'){
            this.snake.direction = "bottom";
          }
          break;
      }
    }.bind(that);
  }






  //3.把Game构造函数给暴露出去.
  window.Game = Game;
}(window));
