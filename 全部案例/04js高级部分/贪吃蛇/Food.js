//所有的关于食物的代码,写在这个自执行函数里面.
(function (w){
  //用一个数组list存放食物.
  var list = [];
  //1.食物有宽高有背景色,有定位坐标的对象,有对象就有创建对象的构造函数.
  function Food(width,height,bgColor){
    this.width = width || 20;
    this.height = height || 20;
    this.bgColor = bgColor || "green"
  }
  //2.食物要显示的这些代码封装成一个函数,函数写在原型中: a.所有的食物都要显示,显示的方法共有的所以写在原型里 b.写在原型中的方法食物对象可以直接调用.
  Food.prototype.render = function (map) {
    //渲染新食物之前删掉老食物
    remove(map);

    //2.1 食物随机的坐标.
    //this.x = "随机的坐标"; //不能超出地图,还应该是蛇宽高的倍数.
    this.x = Math.floor(Math.random()*map.offsetWidth/this.width)*this.width;
    this.y = Math.floor(Math.random()*map.offsetHeight/this.height)*this.height;
    //2.2 创建一个div,让这个div拥有这个食物的所有的显示信息.
    var div1 = document.createElement("div");
    div1.style.position = "absolute"
    div1.style.left = this.x+"px";
    div1.style.top = this.y+"px";
    div1.style.width = this.width + "px";
    div1.style.height = this.height+"px";
    div1.style.backgroundColor = this.bgColor;
    //2.3 把这div添加到地图中.
    map.appendChild(div1);
    //2.4 把这个div保存到list数组中.
    list.push(div1);
  }


  //4.删除 显示老食物div的方法.
  function remove(map){
    //从map地图div中删除食物子div.
    for(var i = 0 ; i < list.length; i++){
    	map.removeChild(list[i]);
    }
    //清空list
    list.length = 0;
  }


  //3.由于这个Food构造函数,在外面要用,所有把他暴露出去.
  w.Food = Food;


}(window));
