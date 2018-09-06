/*
** Create by 张晓坤 on 2018/7/21
* 本文件作用：浏览器兼容性封装
*/

/*
根据id获取元素
 */
function id ( str ) {
    return document.getElementById(str);
}

/**
 * 1.获取元素的文本（兼容性处理）
 * @param ele  元素
 * @return 获取到的文本
 */
function getText ( ele ) {
    //浏览器能力检测
    if(ele.textContent == undefined){//IE8浏览器
        return ele.innerText
    }else{
        return ele.textContent;
    }
}

/**
 * 2.设置元素的文本（兼容性处理）
 * @param ele  元素
 * @param txt  需要设置的文本
 */
function setText ( ele,txt ) {
    //浏览器能力检测
    if(ele.textContent == undefined){//IE8浏览器
        ele.innerText = txt;
    }else{
        ele.textContent = txt;
    }
}

/**
 * 3.获取上一个兄弟元素
 * @param ele   元素
 * @return 上一个兄弟元素/null
 */
function getPrevbiousElementSibling ( ele ) {
    var node =  ele.previousSibling;//1.先获取上一个兄弟节点
    //2.如果不是null 并且节点类型不是1，就继续找上一个兄弟节点
    while(node != null && node.nodeType != 1 ){
        node = node.previousSibling;
    }
    return node;
}

/**
 * 4.获取下一个兄弟元素
 * @param ele  元素
 * @return 下一个兄弟元素/null
 */
function getNextElementSibling ( ele ) {
    var node = ele.nextSibling;//获取下一个节点
    while (node != null && node.nodeType != 1){//只要下一个节点不是null并且节点类型不是1，则继续往下找
        node = node.nextSibling;
    }
    return node;
}

/**5.获取元素样式属性
 *
 * @param ele  要获取的元素
 * @param attr   要获取的属性（字符串）
 * @return {*}
 */
function getStyle (  ele,attr) {
    if(ele.currentStyle){//IE8浏览器
        return ele.currentStyle[attr];
    }else{//非IE8浏览器
        return window.getComputedStyle(ele,null)[attr];
    }
}

/**6.获取网页滚动出去的距离
 *
 * @return {{scrollLeft: number, scrollTop: number}}
 */
function getScroll (  ) {
    /*思路：
    如果 window.pageXOffset获取不到就用
    document.documentElement.scrollLeft，如果这个属性也拿不到，就用
    document.body.scrollLeft，如果这个属性还不到，就返回0（提高易读性）

     */
    //逻辑或表达式：一真则真，短路运算
    //找真：如果左边的结果可以转成true，返回左边式子的结果，否则返回右边式子的结果
    var x = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    return {
        scrollLeft : x,
        scrollTop : y
    }
}

/**
 * 7.获取页面可视区域的大小
 * @return {{clientWidth: number, clientHeight: number}}
 */
function getClient (  ) {
    var x = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
    var y = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
    return {
        clientWidth : x,
        clientHeight : y
    }
}

/**
 * 8.获取事件对象触发点相对于页面左上角的距离
 * @param e 事件对象
 * @return {*}
 */
function getPagePoint ( e ) {

    if ( e.pageX ) {//非IE8浏览器
        return {
            pageX : e.pageX, pageY : e.pageY
        }
    } else {//IE8浏览器
        return {
            pageX: e.clientX + getScroll().scrollLeft,
            pageY: e.clientY + getScroll().scrollTop
        }
    }
}