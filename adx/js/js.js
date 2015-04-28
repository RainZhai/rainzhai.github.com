(function(){

//配置
var config = {
	'audio':{
		'icon':'audio-record-play',
		'text':true
	},
	'loading': 'loading-ic'
};

//loading
window.onload = function(){
	$('#loading').hide();
}

//
var pageIndex = 1,
	pageTotal = $('.page').length,
	towards = { up:1, right:2, down:3, left:4},
	isAnimating = false;

//禁用手机默认的触屏滚动行为
document.addEventListener('touchmove',function(event){
	event.preventDefault(); },false);

//
/*$(document).swipeUp(function(){ 
	if (isAnimating) return;
	if (pageIndex < pageTotal) { 
		pageIndex+=1; 
	}else{
		pageIndex=1;
	};
	pageMove(towards.up);
})*/
touch.on(document, "swipeup",function(e){
	if (isAnimating) return;
	if (pageIndex < pageTotal) { 
		pageIndex+=1; 
		pageMove(towards.up);
	} 
});
touch.on(document, "swipedown",function(e){
	if (isAnimating) return;
	if (pageIndex > 1) { 
		pageIndex-=1; 
		pageMove(towards.down);
	}else{
		pageIndex=1;
	};
});
//
function pageMove(tw){
	var lastPage;
	if(tw=='1'){
		if(pageIndex==1){
			lastPage = ".page-"+pageTotal;
		}else{
			lastPage = ".page-"+(pageIndex-1);
		}
		
	}else if(tw=='3'){
		if(pageIndex==pageTotal){
			lastPage = ".page-1";
		}else{
			lastPage = ".page-"+(pageIndex+1);
		}
		
	}

	var nowPage = ".page-"+pageIndex;
	
	switch(tw) {
		case towards.up:
			outClass = 'pt-page-moveToTop';
			inClass = 'pt-page-moveFromBottom';
			break;
		case towards.down:
			outClass = 'pt-page-moveToBottom';
			inClass = 'pt-page-moveFromTop';
			break;
	}
	isAnimating = true;
	$(nowPage).removeClass("hide");
	
	$(lastPage).addClass(outClass);
	$(nowPage).addClass(inClass);
	
	setTimeout(function(){
		$(lastPage).removeClass('page-current');
		$(lastPage).removeClass(outClass);
		$(lastPage).addClass("hide");
		$(nowPage).addClass('page-current');
		$(nowPage).removeClass(inClass);
		runpageanim();
		isAnimating = false;
	},600);
}
function runpageanim(){
	if(pageIndex===2){ 
                        $(".p2-1").velocity({ "opacity":'1'},1000,function(){ 
	                        $(".p2-2").velocity({ "opacity":'1'},1000,function(){ 
		                        $(".p2-3").velocity({ "opacity":'1'},1000,function(){ 
			                        $(".p2-4").velocity({ "opacity":'1'},1000,function(){ 
				                        $(".p2-5").velocity({ "opacity":'1'},1000,function(){  
				                        }); 
			                        }); 
		                        });  
	                        }); 
                        }); 
	}
	if(pageIndex===3){ 
                        $(".p3-1").velocity({ "opacity":'1'},1000,function(){ 
	                        $(".p3-2").velocity({ "opacity":'1'},1000,function(){ 
		                        $(".p3-3").velocity({ "opacity":'1'},1000,function(){  
		                        });  
	                        }); 
                        }); 
	}
	if(pageIndex===4){ 
                        $(".p4-1").velocity({ "opacity":'1'},1000,function(){ 
	                        $(".p4-2").velocity({ "opacity":'1'},1000,function(){ 
		                        $(".p4-3").velocity({ "opacity":'1'},1000,function(){ 
			                        $(".p4-4").velocity({ "opacity":'1'},1000,function(){ 
				                        $(".p4-5").velocity({ "opacity":'1'},1000,function(){  
				                        }); 
			                        }); 
		                        });  
	                        }); 
                        }); 
	}
	if(pageIndex===5){ 
                        $(".page-5").find(".qna-q").velocity({ "opacity":'1'},1000,function(){ 
	                        $(".page-5").find(".qna-a").velocity({ "opacity":'1'},1000,function(){  
	                        }); 
                        }); 
	}
	if(pageIndex===6){ 
                        $(".page-6").find(".qna-q").velocity({ "opacity":'1'},1000,function(){ 
	                        $(".page-6").find(".qna-a").velocity({ "opacity":'1'},1000,function(){  
	                        }); 
                        }); 
	}
	if(pageIndex===7){ 
                        $(".page-7").find(".qna-q").velocity({ "opacity":'1'},1000,function(){ 
	                        $(".page-7").find(".qna-a").velocity({ "opacity":'1'},1000,function(){  
	                        }); 
                        }); 
	}
}

})();