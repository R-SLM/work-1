window.onload = function(){


//封装禁止鼠标滚动事件

/*	function disabledMouseWheel() {  
	  if (document.addEventListener) {  
	    document.addEventListener('DOMMouseScroll', scrollFunc, false);  
	  }//W3C  
	  window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome  
	}  
	function scrollFunc(evt) {  
	  evt = evt || window.event;  
	    if(evt.preventDefault) {  
	    // Firefox  
	      evt.preventDefault();  
	      evt.stopPropagation();  
	    } else {  
	      // IE  
	      evt.cancelBubble=true;  
	      evt.returnValue = false;  
	  }  
	  return false;  
	}*/ 

//回到顶部	
	var clientHeight = document.documentElement.clientHeight;
	var toTop = document.getElementById("toTop");
	//不用document.body.clientHeight兼容


//第一个滚动函数
/*	window.onscroll = function(){

		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
			

		if(scrollTop>=(clientHeight/2)){
			toTop.style.display = "block";
		}
		else{
			toTop.style.display = "none";
		}

	}*/

//toTop点击回到顶部函数
	toTop.onclick = function(){
	
		clearInterval(timer);
		function scroll(){
			scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				if(scrollTop>0&&stop==true){
				var newscrollTop = document.body.scrollTop = 
				document.documentElement.scrollTop = Math.floor(scrollTop - (scrollTop/3));
				// console.log(newscrollTop);
				}
				else{
					clearInterval(timer);
				}
		}
		var timer = setInterval(scroll,50);
	}

	// 数组和数组的比较不能用恒等（===），内存地址不一样。

// 有关requestAnimationFrame???(定时器)替换settimeout和setinterval
/*	var timer;   

	function scroll(){
		scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
			if(scrollTop>0){
			var newscrollTop = document.body.scrollTop = 
			document.documentElement.scrollTop = scrollTop - 1;
			}
			else{
				cancelAnimationFrame(timer);
			}
			timer = requestAnimationFrame(scroll);
		}*/


// 同一个js文件可以执行，解决两个window.onscroll的问题。
	var navUl = document.querySelector(".nav-1");
	var navLi = navUl.getElementsByTagName("a");
	var container = document.getElementsByTagName("section");
	var navHeight = navUl.offsetHeight;
	var myNavbar = document.querySelector(".my-navbar");
	var myNavHeight = myNavbar.offsetHeight;

//第二个滚动函数（只能存在一个window.onscroll）
/*	var tabOnscrollTop = window.onscroll;
	if(typeof tabOnscrollTop == "function"){
		window.onscroll = function(){
			tabOnscrollTop.call(this);
			var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
			console.log(scrollTop);

			if(scrollTop>navHeight){
				myNavbar.style.background = "rgba(0,0,0,0.6)";
			}
			else{
				myNavbar.style.background = "none";
			}
		}
	}*/

//函数封装，多个滚动函数+兼容
	function addEvent(obj,type,fn){
	    if(obj.attachEvent){ //ie
	        obj.attachEvent('on'+type,function(){
	            fn.call(obj);
	            // 在obj中运行函数，用到index时
	        })
	    }else{
	        obj.addEventListener(type,fn,false);
	    }
	}
//回到顶部按钮的显示和隐藏的onscroll函数
	addEvent(window,'scroll',function(){
	    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	    	

	    if(scrollTop>=(clientHeight/2)){
	    	toTop.style.display = "block";
	    }
	    else{
	    	toTop.style.display = "none";
	    }
	});

//顶部导航的显示和隐藏的onscroll函数
	addEvent(window,'scroll',function(){
	    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	    // console.log(scrollTop);

	    if(scrollTop>navHeight){
	    	myNavbar.style.background = "rgba(0,0,0,0.6)";
	    }
	    else{
	    	myNavbar.style.background = "none";
	    }
	});

//滚动时tab导航字体颜色切换的onscroll函数
	addEvent(window,'scroll',function(){
	    var ScrollTop = document.documentElement.scrollTop || window.pageYOffset.scrollTop 
	    || document.body.scrollTop;
	    // console.log(scrollTop);
		for(i=0;i<container.length;i++){
			if(ScrollTop+myNavHeight>=container[i].offsetTop){
				for(j=0;j<navLi.length;j++){
					navLi[j].style.color = "";
				}
				navLi[i].style.color = "#39c9da";
			}
		}
	});

	//封装一个getElementByClassName函数
/*	function getClassName(claName,parent){
	var oParent = parent?getElementsById(parent):document;
	var eleArry = [];
	var elements = oParent.getElementsByTagName("*");
		for(var i=0; i<elements.length;i++){
			if(elements[i].className==claName){
				eleArry.push(elements[i]);
			}
		}
		return eleArry;
	}*/

//点击导航栏滚动到相应地方  Math.ceil的位置很重要,Math.floor.  var stop = true;
	var interval;
	var stop = true;
	for(i=0;i<navLi.length;i++){
		navLi[i].index = i;
		navLi[i].onclick = function(){
			var self = this;
			clearInterval(interval);
			interval = setInterval(function(){
				var scrollTop = document.documentElement.scrollTop 
				|| document.body.scrollTop;
				if(scrollTop+myNavHeight<container[self.index].offsetTop){
				scrollTop = document.body.scrollTop = document.documentElement.scrollTop 
					=Math.ceil(scrollTop + (container[self.index].offsetTop - scrollTop-myNavHeight)/3);
					stop = false;
				}
				else{
					if(scrollTop+myNavHeight==container[self.index].offsetTop){
						clearInterval(interval);
						stop = true;
					}
					else {
						scrollTop = document.body.scrollTop = document.documentElement.scrollTop 
						= Math.floor(scrollTop + (container[self.index].offsetTop - scrollTop - myNavHeight)/3);
						stop = false;
						console.log(scrollTop);
						if (scrollTop < 0) {
							scrollTop = document.body.scrollTop = document.documentElement.scrollTop 
							=0;
							clearInterval(interval);
							console.log(scrollTop);
							stop = true;
						}
					}
				}
			},50)
		}
	}


	// 点击图片，放大并显示详细信息以及关闭。
	var portfolioImg = document.getElementById("portfolio");
	var portfolioA = portfolioImg.getElementsByTagName("a");
	var clientheigth = document.documentElement.clientHeight;

	for(i=0;i<portfolioA.length;i++){
		portfolioA[i].onclick = function (){

			var Mask = document.createElement("div");
			Mask.id="mask";
			Mask.className ="mask-opacity0";
			document.body.appendChild(Mask);

			// (位置问题)放在这里不行？？？放在后面就可以（因为动态创建元素还没有完成？？？）
			// var divmask = document.getElementById("mask");
			// console.log(divmask);
			// divmask.style.opacity = '1';
			// var time = setTimeout("opacityChange()",10);

			var detial = document.createElement("div");
			var close = document.createElement("button");
			var detialContent= document.createElement("detialContent");

			close.innerHTML= "&times;"
			close.classList.add("closeType");
			detial.appendChild(close);

			detialContent.innerHTML = 
			"<div class='detial-content'><img src=''><p>Read More  a galley of type and scrambled it to book.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum</p></div>";
			detial.appendChild(detialContent);

			detial.id="detialBox";
			// detial.classList.add.apply(detial.classList,["col-md-4","col-md-offset-4","col-sm-6","col-sm-offset-3","col-xs-8","col-xs-offset-2"]);
			// detial.classList.add("col-md-4","col-md-offset-4","col-sm-6","col-sm-offset-3","col-xs-8","col-xs-offset-2");
			detial.classList.add("col-md-4");
			detial.classList.add("col-md-offset-4");
			detial.classList.add("col-sm-6");
			detial.classList.add("col-sm-offset-3");
			detial.classList.add("col-xs-8");
			detial.classList.add("col-xs-offset-2");
			document.body.appendChild(detial);

			var imgsrc = this.parentNode.getElementsByTagName("img")[0].getAttribute("src");
			detialContent.getElementsByTagName("img")[0].setAttribute("src",imgsrc);
			//注意上下文先后循序。

			var detialheigth = detial.offsetHeight;
			detial.style.top = (clientheigth-detialheigth)/2 + "px";

			//js+animation动态改变透明度。形成视差效果。（关于放置地点问题。。.）
			var divmask = document.getElementById("mask");
			var divdetialBox = document.getElementById("detialBox");
			// console.log(divmask);
			divmask.style.background = 'rgba(0,0,0,0.8)';
			divdetialBox.style.opacity = "1";
			divdetialBox.style.transform = "scale(1.05)";

			close.onclick = mask.onclick = function(){
				document.body.removeChild(Mask);
				document.body.removeChild(detial);
			}
			return false;
		}
	}
}

	// function opacityChange(){
	// 	var maskChange = document.getElementById("mask");
	// 	maskChange.addClass('mask-opacity1');
	// }