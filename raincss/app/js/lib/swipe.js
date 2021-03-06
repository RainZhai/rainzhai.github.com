(function($) {
    /**
     * 一个在手机端自动轮播,并且可以有滑动效果的插件---基于jquery.
     * @param {Object} obj Object对象。可以自定义传入的参数。
     * @return {Function} 返回的是一个公有的函数。
     */
    window.swipe = $.swipe = function(opt) {
        var o = $.extend({
            touchSelector: ".c_touch",
            imgArray: ['images/s1.jpg', 'images/s2.jpg', 'images/s1.jpg', 'images/s3.jpg'],
            linksArray: ['#1', '#', '#', '#'],
            time: 2500,
            autorun: true,
            width: 320,
            height: 95,
            responsive: true,
            fadeout: false,
            tipsClass: "bggrey",
            tipsActiveClass: "bgw",
            tipswrapStyle: {
                bottom: "10px",
                left: "5px"
            }
        }, opt || {});
        var touchobj = $(o.touchSelector).length > 0 ? $(o.touchSelector) : $('<div class="c_touch"></div>'),
            startX = 0, //开始点击的位置
            timer = o.time,
            i = 0, //图片计数器
            dirvalue = 0, //用于判断向左向右滑动
            _width = 0;
        var obj = {
            touchbox: null,
            touchlist: null,
            items: null,
            tipsitems: null,
            len: null,
            initHtml: function() {
                if(o.imgArray.length>0){
                    var imgContent = '',
                        iconContent = '',
                        html = '<div class="c_touhmain posr oh"><ul class=" lsn c_touhlist posa nom nop w-mx clearfix">',
                        IconHtml = '<ul class="c_touchicon lsn clearfix posa nom nop tipCir">';
                    if(o.fadeout){
                            $.each(o.imgArray, function(i) {
                                imgContent += '<li class=""><a class="block fullw fullh" href="' + o.linksArray[i] + '"><img class="fullw fullh" src=' + o.imgArray[i] + ' /></a></li>';
                                iconContent += '<li class="fl l posr c_tips mls"><i class="c_on round-10 w-1 h-1 block so bgw"></i></li>';
                            });
                    }else{
                            $.each(o.imgArray, function(i) {
                                imgContent += '<li class="fl l"><a class="block fullw fullh" href="' + o.linksArray[i] + '"><img class="fullw fullh" src=' + o.imgArray[i] + ' /></a></li>';
                                iconContent += '<li class="fl l posr c_tips mls"><i class="c_on round-10 w-1 h-1 block so bgw"></i></li>';
                            });
                    }
                    html = html + imgContent + '</ul></div>';
                    IconHtml = IconHtml + iconContent + '</ul>';
                    touchobj.addClass('posr').append(html + IconHtml);
                }else{
                    touchobj.addClass('posr');
                }
            },
            initSelector: function() {
                obj.touchbox = touchobj.find('.c_touhmain');
                obj.touchlist = touchobj.find('.c_touhlist');
                obj.tipsitems = touchobj.find('.c_tips');
                obj.items = obj.touchlist.find("li");
                obj.len = obj.items.length;
            },
            setWidth: function() {
                if(o.fadeout){
                    _width = "100%";
                }else{
                    if (o.responsive) {
                        _width = touchobj.width();
                    } else {
                        _width = o.width;
                    }
                }
            },
            getWidth: function() {
                return _width;
            },
            initUI: function() {
                obj.initSelector();
                obj.setWidth();
                var w = obj.getWidth();
                obj.touchbox.height(o.height).width(w);
                obj.touchlist.height(o.height);
                obj.items.height(o.height).width(w);
                obj.tipsitems.first().find('.c_on').removeClass(o.tipsClass).addClass(o.tipsActiveClass);
                touchobj.find('.c_touchicon').css(o.tipswrapStyle);
            },
            /**
             *绑定事件函数:touchstart,touchmove,touchend
             */
            bindEvent: function() {
                if(obj.len > 1){
                    if (util.supportTouch){
                        if(!o.fadeout){
                            touchobj[0].addEventListener('touchstart', obj.touchStart, false);
                            touchobj[0].addEventListener('touchmove', obj.touchMove, false);
                            touchobj[0].addEventListener('touchend', obj.touchEnd, false);
                        } 
                    }
                    if(o.fadeout){
                        touchobj.on("mouseenter",function(){
                        clearInterval(obj.timeHanlder);
                        });
                        touchobj.on("mouseleave",function(){
                        obj.timeHanlder = setInterval(obj.setTime, 2 * timer);
                        });
                    }
                    touchobj.find('.c_touchicon').find(".c_tips").on("click", function(){
                        var i = $(this).index();
                        obj.setItemShow(i);
                    });;
                }
            },
            /**
             *懒加载函数。
             *@param {Number} index 为li的下标
             *@param {Object} items jquery对象,关于li 的JQ对象。
             */
            lazyLoad: function(index, items) {
                var img = items.eq(index).find("img");
                if (img.attr("data-src")) {
                    img.attr("src", img.attr("data-src")).removeAttr("data-src");
                }
            },
            /**
             *touchstart事件,获取初始点击的坐标值，来确定向左还是向右滑动同时清除定时器。
             *@param {Object} evt Object对象,事件对象。
             */
            touchStart: function(evt) {
                obj.lazyLoad(i + 1, obj.items);
                clearInterval(obj.timeHanlder);
                var touch = evt.touches[0]; //获取第一个触点
                //记录触点初始位置
                startX = parseInt(touch.pageX, 10);
            },

            /**
             *touchmove事件,根据左右滑动来实现不同的效果。
             *@param {Object} evt Object对象,事件对象。
             */
            touchMove: function(evt) {
                evt.preventDefault();
                clearInterval(obj.timeHanlder);
                var w = obj.getWidth();
                var touch = evt.touches[0]; //获取第一个触点
                dirvalue = parseInt((touch.pageX - startX), 10);
                //判断滑动方向
                if (dirvalue < 0) {
                    obj.touchlist.find('li').slice(obj.len).remove();
                }
                obj.touchlist.css({
                    "left": -i * w + dirvalue
                });
            },

            /**
             *小图标显示函数
             */
            tipShow: function() {
                i === obj.len ? i = 0 : i;
                obj.tipsitems.find('.c_on').addClass(o.tipsClass).removeClass(o.tipsActiveClass);
                obj.tipsitems.eq(i).find('.c_on').addClass(o.tipsActiveClass).removeClass(o.tipsClass);
            },

            /**
             *touchend事件,最后来确定显示用户所滑动的图像。同时生成定时器。
             *@param {Object} evt Object对象,事件对象。
             */
            touchEnd: function(evt) {
                if (dirvalue === 0) {
                    return;
                }
                var w = obj.getWidth();
                if (dirvalue < 0) {
                    i++;
                    i >= obj.len ? i = obj.len - 1 : i;
                } else {
                    i--;
                    i < 0 ? i = 0 : i;
                }
                obj.touchlist.animate({
                    "left": -i * w
                }, function() {
                    if (o.autorun) {
                        obj.touchlist.find('li').slice(0, 1).clone(true).appendTo('.c_touhlist');
                        obj.timeHanlder = setInterval(obj.setTime, 2 * timer);
                    }
                });
                obj.tipShow();
                dirvalue = 0;
            },

            /**
             *定时轮播函数。
             */
            setTime: function() {
                var w = obj.getWidth();
                i++;
                if(!o.fadeout){
                    if (i > obj.len - 1) {
                        obj.touchlist.stop();
                        obj.touchlist.animate({"left": -i * w}, 1000, null, function() {
                            i = 0;
                            obj.touchlist.css({"left": 0});
                        });
                    } else {
                        obj.touchlist.stop(); 
                        obj.touchlist.animate({ "left": -i * w}, 1000, null, function() {});
                    }
                    obj.lazyLoad(i, obj.items);
                }else{ 
                    obj.items.css({"display":"none","position":"absolute"});  
                        if (i > obj.len - 1 || i===0) {
                            //obj.items.hide().find('img').hide();
                            //obj.items.eq(0).show().find('img').fadeIn();
                            obj.items.eq(obj.len-1).css({"display":"block"}).fadeOut(3000);
                            obj.items.eq(0).fadeIn(1000);
                            i=0;
                        }else {
                            //obj.items.hide();
                            //obj.items.eq(i).show().find('img').fadeIn();
                            obj.items.eq(i-1).css({"display":"block"}).fadeOut(3000);
                            obj.items.eq(i).fadeIn(1000);
                        }
                    } 
                obj.tipShow();
            },
            setItemShow: function(n){
                var w = obj.getWidth();
                i = n;
                if(!o.fadeout){
                    if (i > obj.len - 1) {
                        obj.touchlist.stop();
                        obj.touchlist.animate({"left": -i * w}, 1000, null, function() {
                            i = 0;
                            obj.touchlist.css({"left": 0});
                        });
                    } else {
                        obj.touchlist.stop(); 
                        obj.touchlist.animate({ "left": -i * w}, 1000, null, function() {});
                    }
                    obj.lazyLoad(i, obj.items);
                }else{
                    if (i > obj.len - 1) {
                        obj.items.hide().find('img').hide();
                        obj.items.eq(0).show().find('img').fadeIn();
                        i=0;
                    }else{
                        obj.items.hide();
                        obj.items.eq(i).show().find('img').fadeIn();
                    }
                }
                obj.tipShow();
            },
            init: function() {
                obj.initHtml();
                obj.initUI();
                obj.bindEvent();
                if (o.autorun && obj.len > 1) {
                    if(!o.fadeout) obj.touchlist.find('li').slice(0, 1).clone(true).appendTo('.c_touhlist');
                    obj.timeHanlder = setInterval(obj.setTime, timer);
                }
            },
            /**
             * 返回已进行拼合和事件注册的jq对象
             */
            getHtml: function() {
                return touchobj;
            }
        }
        obj.init();
        return obj.getHtml();
    }
})(window.jQuery || window.Zepto);