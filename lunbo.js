/*幻灯片的构造函数
 * option:oDiv  :用于挂载幻灯片
 * imgs：要显示图片地址
 * hrefs：图片超链接地址


 */


function Slider(options){//把对象封装到参数里
	if (!options) {
		throw new Error("请传入参数")
	} else if(!options.oDiv){
		throw new Error("请给oDiv一个di")
	}else if (!options.imgs) {
		throw new Error("请传入要显示的图片数组")
	}else if (!options.hrefs) {
		throw new Error("请写入链接")
	}
	
	this.oDiv = options.oDiv;
//	this.oDiv1 = options.oDiv1;
//	this.oDiv.classList.add("slider");

//oDiv的css属性由外链样式表来写了，也可以用下面两条来代替
//	this.oDiv.style.position = "relative";
//	this.oDiv.style.overflow = "hidden";
	this.oDiv.style.height = options.height;//这个div高度为图片的高度，目的超出隐藏
	this.imgs = options.imgs;
	this.hrefs = options.hrefs;
	this.ulName = options.ulName;
	this.liName = options.liName;
	this.navName = options.navName;
	this.liName = options.liName;
	this.btnName = options.btnName;
	this.navActive = options.navActive;
	
	this.height = options.height;//这是设置图片的高度
	this.width = options.width;//图片的宽度
	this.curIndex = 0;//通过this指向，指向Slider
	this.auto_timer = null;
	//初始化
	this.len = this.imgs.length;
	this.init();
}

//原型的方法
Slider.prototype.init=function(){
	this.oDiv.onmouseover=this.stopPlay.bind(this);	
	this.oDiv.onmouseout=this.autoPlay.bind(this);
	this.createUl();
	this.createButton();
	this.createNav();
	this.autoPlay();
	this.aaa();
}

//创建 ul li a
Slider.prototype.createUl=function(){
	var oUl = document.createElement("ul");
	this.oUl = oUl;
	oUl.className=this.ulName;
//	oUl.style.height="100%";
//	oUl.style.width = "100%";
//	oUl.style.position = "absolute";
	var oLi = null;
	var oA = null;
	for (var i=0;i<this.len;i++) {
		oLi=document.createElement("li");
		oLi.className=this.liName;
//		oLi.style.height="100%";
//		oLi.style.width="100%";
//		oLi.style.opcity=0;
//		oLi.style.position = "absolute";
		oA=document.createElement("a");
		oA.href = this.hrefs[i];
		oA.style.backgroundImage = "url(" + this.imgs[i] + ")";//动态创建
//		oA.style.height="100%";
//		oA.style.width = "100%";
//		oA.style.display="block";
//		oA.style.backgroundSize = "cover";

		
		
		oLi.appendChild(oA);
		oUl.appendChild(oLi);
	}
	
	oUl.children[0].style.opacity=1;
	this.oDiv.appendChild(oUl);
}
//创建左右按钮
Slider.prototype.createButton=function(){
	var oPrev = document.createElement('span');
	oPrev.innerHTML="&lt";
	oPrev.className=this.btnName;
	var oNext = document.createElement('span');
	oNext.innerHTML = "&gt";
	oNext.className=this.btnName;
	this.oDiv.appendChild(oPrev);
	this.oDiv.appendChild(oNext);
//	var that = this;
	
	//call.qpply : 改变方法中的this指向，执行这个方法
	//bind 改变这个方法中的this指向，但不执行这个方法，返回新的对象
	oNext.onclick = this.nextSlider.bind(this);
	oPrev.onclick = this.prevSlider.bind(this);
}

//创建原点按钮导航
Slider.prototype.createNav = function(){
	var oUl = document.createElement("ul");
	oUl.classList.add(this.navName);
	oUl.classList.add("clearfix");
	
	for (var i = 0; i<this.len; i++) {
		var oLi = document.createElement("li");
		oUl.appendChild(oLi);
	}
	
	oUl.children[0].classList.add(this.navActive);
	this.oDiv.appendChild(oUl);
}
//上一张
Slider.prototype.prevSlider=function(){
	this.changeSlider(0);

	if (this.curIndex>0) {
		this.curIndex--;		
	} else{
		this.curIndex=this.len-1;
	}
	this.changeNav();
	this.changeSlider(1);
	console.log(this.curIndex);
	
}
//下一张
Slider.prototype.nextSlider=function(){
	this.changeSlider(0);
	if (this.curIndex<this.len-1) {
		this.curIndex++
	} else{
		this.curIndex=0;	
	}
	this.changeNav();
	this.changeSlider(1);
	console.log(this.curIndex)
}
//点击原点改变图片
Slider.prototype.aaa=function(){
	var oLi = this.oDiv.querySelectorAll(" .nav li");
	var that = this;
	console.dir(that);
	for(var i = 0; i < oLi.length; i++){
		oLi[i].index = i;
		oLi[i].onmouseover = function(){
		console.dir(this);

			that.changeSlider(0);
			that.curIndex = this.index;
			console.log(that.curIndex);
			that.changeSlider(1);
			that.changeNav();
		}
	}
//	for (var i=0;i<oLi.length;i++) {
//		this.oLi[i].index = i;
//		this.oLi[i].onclick=function(){
//			this.curIndex = this.oLi.index;
//			alert(this.curIndex)
//			
//		}
//		this.curIndex = i;
//
//		this.changeSlider(1);
//		this.changeNav();
//
//	}
}

//自动轮播
Slider.prototype.autoPlay=function(){
	this.auto_timer=setInterval(this.nextSlider.bind(this),5000);
}
//鼠标放上去自动轮播停止
Slider.prototype.stopPlay=function(){
	clearInterval(this.auto_timer);
}


//改变原点导航
Slider.prototype.changeNav=function(){
	this.oDiv.querySelector(".nav li.active").classList.remove("active");
	this.oDiv.querySelectorAll(".nav li")[this.curIndex].classList.add("active");
}

//改变图片
Slider.prototype.changeSlider=function(p){
	this.oDiv.querySelectorAll(".slider-ul .slider-li")[this.curIndex].style.opacity=p;

}














