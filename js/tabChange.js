	var navUl = document.querySelector(".nav-1");
	var navLi = navUl.getElementsByTagName("a");
	var container = document.getElementsByClassName("container-fluid");
	var navHeight = navUl.offsetHeight;
	var myNavbar = document.querySelector(".my-navbar");
	

/*	window.onscroll = function(){
		// 多个window.onscroll函数无效问题，解决办法???
		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		console.log(scrollTop);

		if(scrollTop>navHeight){
			myNavbar.style.background = "rgba(0,0,0,0.6)";
		}
	}*/

// 两个window.onscroll函数无效问题，解决办法（位置？不同js文件？）以及多个无效（可用函数封装）

	var tabOnscrollTop = window.onscroll;
	if(typeof tabOnscrollTop == "function"){
		window.onscroll = function(){
			tabOnscrollTop.call(this);
			var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
			console.log(scrollTop);

			if(scrollTop>navHeight){
				myNavbar.style.background = "rgba(0,0,0,0.6)";
			}
		}
	}