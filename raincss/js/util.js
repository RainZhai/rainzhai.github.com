/**
 * define util function
 */
(function(win, $) {
  win.util = util = {};
  util.touch = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    /** 触摸事件注册 */
    registerEvent: function(selector) {
      if (arguments[1] && $.isFunction(arguments[1])) {
        selector[0].addEventListener("touchstart", arguments[1], false);
      }
      if (arguments[2] && $.isFunction(arguments[2])) {
        selector[0].addEventListener("touchmove", arguments[2], false);
      }
      if (arguments[3] && $.isFunction(arguments[3])) {
        selector[0].addEventListener("touchend", arguments[3], false);
      }
    },
    removeEvent: function(selector) {
      if (arguments[1] && $.isFunction(arguments[1])) {
        selector[0].removeEventListener("touchstart", arguments[1], false);
      }
    },
    initTap: function() {
      // 基于jquery的tap
      var touch = {},
        tapTimeout;
      var now, delta;
      $(function() {
        $(document).on('touchstart', function(e) {
          now = Date.now();
          delta = now - (touch.last || now);
          var e = e.originalEvent;
          touch.el = $(e.touches[0].target);
          if (delta > 0 && delta <= 250) {
            touch.isDoubleTap = true;
          }
          touch.last = now
        }).on('touchmove', function(e) {
          var e = e.originalEvent;
          cancelAll()
        }).on('touchend', function(e) {
          if ('last' in touch)
            tapTimeout = setTimeout(function() {
              touch.el.trigger("tap");
              if (touch.isDoubleTap) {
                touch.el.trigger('doubleTap')
                touch = {}
              }
            }, 10);
        }).on('touchcancel', cancelAll);
      });

      function cancelAll() {
        if (tapTimeout) {
          clearTimeout(tapTimeout);
        }
        tapTimeout = null
        touch = {};
      }
      ['doubleTap', 'tap'].forEach(function(m) {
        $.fn[m] = function(callback) {
          return this.on(m, callback);
        };
      });
    },
    /**
     * @method 指定元素可滚动效果
     * @param scrollHandler
     */
    scrollable: function(scrollHandler) {
      var css = {
        "-webkit-overflow-scrolling": "touch",
        "overflow-y": "auto"
      };
      var preventDefault = function(e) {
        e.preventDefault();
      };
      var stopPropagation = function(e) {
        e.stopPropagation();
      }
      var stopeve2 = function(e) {
        if (e.currentTarget.scrollTop === 0) {
          e.currentTarget.scrollTop = 1;
        } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
          e.currentTarget.scrollTop -= 1;
        }
      };
      if (arguments.length === 1) {
        $(scrollHandler).css(css);
        //Uses document because document will be topmost level in bubbling
        $(document).on('touchmove', function(e) {
          preventDefault(e);
        });
        //Uses body because jQuery on events are called off of the element they are
        //added to, so bubbling would not work if we used document instead.
        $('body').on('touchstart', scrollHandler, function(e) {
          stopeve2(e);
        });
        //Stops preventDefault from being called on document if it sees a scrollable div
        $('body').on('touchmove', scrollHandler, function(e) {
          stopPropagation(e);
        });
      }
      if (arguments.length > 1 && arguments[1] == "off") {
        $(scrollHandler).css({});
        $(document).off('touchmove');
        $('body').off('touchstart');
        $('body').off('touchmove');
      }
    }
  };
  if(util.supportTouch){ util.touch.initTap(); }
  if (!win.console) {
    win.console = function() {};
    win.console.info = win.console.debug = win.console.warn = win.console.log = win.console.error = function(str) {
      alert(str);
    }
  };
  win.log = function() {
    if (arguments.length > 0) {
      var s = '';
      for (var i = 0, l = arguments.length; i < l; i++) {
        s = s + arguments[i] + ',';
      }
      console.log(util.clearLastComma(s));
    }
  };
  //设置手机端基本宽高
  if(util.isAndroid){
    win.w = win.document.body.offsetWidth;
    win.h = win.document.body.offsetHeight;
  }else{
    win.w = win.screen.width;
    win.h = win.screen.height;
  }
  //判断并设置事件
  if(util.supportTouch){
    util.touch.click = 'tap';
  }else{
    util.touch.click = 'click';
  }

  /**
   * 浏览器的特性的简单检测，并非精确判断。
   */
  function detectBrowser(ns) {
    var ua = ns.ua = navigator.userAgent;
    ns.isWebKit = (/webkit/i).test(ua);
    ns.isMozilla = (/mozilla/i).test(ua);
    ns.isIE = (/msie/i).test(ua);
    ns.isFirefox = (/firefox/i).test(ua);
    ns.isChrome = (/chrome/i).test(ua);
    ns.isSafari = (/safari/i).test(ua) && !this.isChrome;
    ns.isMobile = (/mobile/i).test(ua);
    ns.isOpera = (/opera/i).test(ua);
    ns.isIOS = (/ios/i).test(ua);
    ns.isIpad = (/ipad/i).test(ua);
    ns.isIpod = (/ipod/i).test(ua);
    ns.isIphone = (/iphone/i).test(ua) && !this.isIpod;
    ns.isAndroid = (/android/i).test(ua);
    ns.supportStorage = "localStorage" in win;
    ns.supportOrientation = "orientation" in win;
    ns.supportDeviceMotion = "ondevicemotion" in win;
    ns.supportTouch = "ontouchstart" in win;
    ns.supportCanvas = document.createElement("canvas").getContext !== null;
    ns.cssPrefix = ns.isWebKit ? "webkit" : ns.isFirefox ? "Moz" : ns.isOpera ? "O" : ns.isIE ? "ms" : "";
  };
  detectBrowser(util);
  /* 清除字符串尾部的逗号 */
  util.clearLastComma = function(str) {
    str = str.replace(/,$/, '');
    return str;
  };
  /*检查对象属性*/
  util.checkprop = function(propName, obj) { /*obj.hasOwnProperty */
    return propName in obj;
  };
  util.queryByTag = function(t) {
    return document.getElementsByTagName(t);
  };
  util.queryById = function(t) {
    return document.getElementById(t);
  };
  /** 获取随机数 */
  util.getRandomNum = function(min /*number*/ , max /*number*/ ) {
    if (max > min) {
      var Range = max - min;
      var Rand = Math.random();
      return (min + Math.round(Rand * Range));
    }
    return 0;
  }
  util.setCookie = function(c_name, value, expiredays) {
    if(c_name && value){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    }
  }
  util.getCookie = function(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
          c_start = c_start + c_name.length + 1;
          c_end = document.cookie.indexOf(";", c_start);
          if (c_end == -1) {
            c_end = document.cookie.length;
          }
          return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
  }
  //删除cookies
util.delCookie = function(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = Common.getCookie(name);
  if (cval != null) document.cookie = name +"="+cval + ";expires ="+exp.toGMTString();
}
//交换数组元素
util.swapItems = function(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
};
//设置列表记录id
util.setlist = function(name,val) {
      var list = Common.getCookie(name);
      if (list) {
             var arr = list.split(",");
            if (arr.length < 5) {
                    if (arr.indexOf(val) > 0) {
                      var i = arr.indexOf(val);
                      Common.swapItems(arr, 0, i);
                    } else { 
                      arr.unshift(val);//在数组前添加元素
                    }
                    Common.setCookie(name, arr.join(","));
            }else{
                    if (arr.indexOf(val) > 0) {
                        var i = arr.indexOf(val);
                        Common.swapItems(arr, 0, i);
                    } else { 
                        arr.unshift(val);//在数组前添加元素
                    }
                    arr.pop();//删除最后一个元素
                    Common.setCookie(name, arr.join(","));
            }
      }else{
            Common.setCookie(name, val);
      }
}
  /*增加历史状态*/
  util.pushState = function(obj) {
    if (history && util.checkprop('pushState', history)) {
      var opt = $.extend({
        data: {},
        title: ''
      }, obj || {});
      history.pushState(opt.data, opt.title, opt.url);
    }
  };
  /*替换历史状态*/
  util.replaceState = function(obj) {
    if (history && util.checkprop('replaceState', history)) {
      var opt = $.extend({
        data: {},
        title: '',
        url: ''
      }, obj || {});
      history.replaceState(opt.data, opt.title, opt.url);
    }
  };
  /*获取当前状态*/
  util.state = function() {
    if (history && util.checkprop('state', history)) {
      return history.state;
    }
  };
  /*获取当前页面title*/
  util.getTitle = function() {
    var t = util.queryByTag('title');
    if (t.length > 0) {
      return t[0].innerText;
    }
    return '';
  };
  /*注册状态改变事件*/
  util.registerStateChange = function(callback) {
    if ('onpopstate' in win) {
      win.onpopstate = function() {
        callback();
      }
    }
  };
  /*获取地址参数值并调用对象方法*/
  util.initObjByUrl = function(obj) {
    var urlparam = location.href.split("?")[1];
    if (urlparam && obj && urlparam in obj) {
      obj[urlparam]();
    }
  };

  /*添加本地存储*/
  util.savedata = function(k, v) {
    if (util.supportStorage && k && v) {
      localStorage.setItem(k, v);
    }
  };
  /*获取本地存储*/
  util.getdata = function(k) {
    if (util.supportStorage && k) {
      return localStorage.getItem(k);
    }
    return null;
  };
  /**监听url变化
  var o1 = new util.urlChanger();
  var o2 = new util.urlObservers(function(){});
  o1.addObserver(o2);
  o1.changeUrl('/nav-2');
   */
  util.urlChanger = function() {
    var _this = this;
    _this.observers = [];
    //添加观察者
    _this.addObserver = function(obj) {
      _this.observers.push(obj);
    };
    //删除观察者
    _this.deleteObserver = function(obj) {
      _this.observers.slice(0, _this.observers.length);
    };
    //通知观察者
    _this._notifyObservers = function() {
      var length = _this.observers.length;
      console.log(length);
      for (var i = 0; i < length; i++) {
        _this.observers[i].update();
      }
    };
    //改变url
    _this.changeUrl = function(hash) {
      window.location.hash = hash;
      _this._notifyObservers();
    };
  };
  //监听类
  util.urlObservers = function(callball) {
    var _this = this;
    if (typeof(callball) == 'function') {
      _this.update = callball;
    }
  };
  util.routes = {};
  util.routeopen = false;
  util.addRoute = function(path, templateId, controller) {
    util.routes[path] = {
      templateId: templateId,
      controller: controller
    };
    if (!util.routeopen) {
      util.routeopen = true;
      util.registerHashchange();
    }
  };
  util.removeRoute = function(path) {
    util.routes[path] = null;
  };
  util.router = function() {
    //目前的路径url（在哈希中去除"#"）
    var url = location.hash.slice(1) || '/';
    //通过url获取路径
    var route = util.routes[url];
    //我们同时拥有一个视图和路径吗？   
    if (route && route.controller) {
      //使用模板引擎渲染路径的模板   
      route.controller();
    }
  };
  util.registerHashchange = function() {
    if ('onhashchange' in win) {
      win.onhashchange = function() {
        util.router();
      };
      win.onload = function() {
        util.router();
      };
    }
  };
  //监听哈希变化
  //window.onhashchange = util.router();
  //监听页面载入
  //window.addEventListener('load',util.router);
  /**
   * @description 类式继承
   * @method
   * @param {Function} subClass - 子类
   * @param {Function} superClass - 父类
   * @example $.freehtml.extend(Author, Person);
   */
  util.extend = function(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;

    subClass.superclass = superClass.prototype;
    if (superClass.prototype.constructor == Object.prototype.constructor) {
      superClass.prototype.constructor = superClass;
    }
  };
  /**
   * @description 原型继承
   * @method
   * @param {object} object 对象 - 要进行克隆的对象
   * @example var a = $.freehtml.clone(Person)
   */
  util.clone = function(object) {
    function F() {};
    F.prototype = object;
    return new F;
  };
  /**
   * @description Augment function, improved.
   * @method
   * @param {object} receivingClass - 接受mixin的对象
   * @param {object} givingClass - 提供mixin的对象
   * @example var a = $.freehtml.augment(Teacher,Person);
   */
  util.augment = function(receivingClass, givingClass) {
    if (arguments[2]) { // Only give certain methods.
      for (var i = 2, len = arguments.length; i < len; i++) {
        receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
      }
    } else { // Give all methods.
      for (methodName in givingClass.prototype) {
        if (!receivingClass.prototype[methodName]) {
          receivingClass.prototype[methodName] = givingClass.prototype[methodName];
        }
      }
    }
  };
  var emptyConstructor = function() {};
  /**
   * 继承方法。
   * @param {Function} childClass 子类。
   * @param {Function} parentClass 父类。
   */
  util.inherit = function(childClass, parentClass) {
    emptyConstructor.prototype = parentClass.prototype;
    childClass.superClass = parentClass.prototype;
    childClass.prototype = new emptyConstructor();
    childClass.prototype.constructor = childClass;
  };
  /**
   * 把props参数指定的属性或方法复制到obj对象上。
   * @param {Object} obj Object对象。
   * @param {Object} props 包含要复制到obj对象上的属性或方法的对象。
   * @param {Boolean} strict 指定是否采用严格模式复制。默认为false。
   * @return {Object} 复制后的obj对象。
   */
  util.merge = function(obj, props, strict) {
    for (var key in props) {
      if (!strict || obj.hasOwnProperty(key) || obj[key] !== undefined) obj[key] = props[key];
    }
    return obj;
  };
  /**
   * 把图片转换成dataURL格式的位图。
   * @param {DisplayObject} obj 要缓存的显示对象。
   * @param {Boolean} toImage 指定是否把缓存转为DataURL格式的。默认为false。
   * @param {String} type 指定转换为DataURL格式的图片mime类型。默认为"image/png"。
   * @return {Object} Image对象。
   */
  util.cacheImg = function(obj, type, callback) {
    var w = obj.width,
      h = obj.height;
    var canvas = util.createDOM("canvas", {
      width: w,
      height: h
    });
    var image = new Image();
    image.src = obj.src;
    if (canvas === null) {
      return false;
    }
    var context = canvas.getContext("2d");
    context.fillStyle = "#EEEEFF";
    context.fillRect(0, 0, w, h);
    image.onload = function() {
      context.drawImage(image, 0, 0);
      var img = new Image();
      img.width = w;
      img.height = h;
      img.src = canvas.toDataURL(type || "image/png");
      callback(img);
    };
  };
  /**
   * 创建一个指定类型type和属性props的DOM对象。
   *
   * @param {String}
   *            type 指定DOM的类型。比如canvas，div等。
   * @param {Object}
   *            props 指定生成的DOM的属性对象。
   * @return {HTMLElement} 新生成的DOM对象。
   */
  util.createDOM = function(type, props) {
    var dom = document.createElement(type);
    for (var p in props) {
      var val = props[p];
      if (p == "style") {
        for (var s in val) dom.style[s] = val[s];
      } else {
        dom[p] = val;
      }
    }
    return dom;
  };
  /**
   * @method binarySearch
   * @param {Object} 数组对象
   * @param {Number} 要查找的值
   * @return {Number} 返回一个索引值或最接近的较大值
   */
  util.binarySearch = function(srcArray, des) {
    var low = 0;
    var high = srcArray.length - 1;
    while (low <= high) {
      var middle = parseInt((low + high) / 2, 10);
      if (des == srcArray[middle].name) {
        return middle;
      } else if (des < srcArray[middle].name) {
        high = middle - 1;
      } else {
        low = middle + 1;
      }
    }
    return high + 1;
  };
  /**
   * @method filter
   * @param {String}
   * @return {String} 返回已过滤特殊字符的字符串
   */
  util.filter = function(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&dash;—|{}【】‘；：”“'。，、？ % + ]");
    var rs = "";
    for (var i = 0; i < s.length; i++) {
      rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
  }
  /*
   * 数据双向绑定 DataBinder by javascript
   *
   * @param {object_id} String
   * @return {Object} 返回pubSub对象
   */
util.dataBinder = function(object_id) {
    // 创建一个简单的pubSub对象
    var pubSub = {
        callbacks: {},
        on: function(msg, callback) {
          this.callbacks[msg] = this.callbacks[msg] || [];
          this.callbacks[msg].push(callback);
        },
        publish: function(msg) {
          this.callbacks[msg] = this.callbacks[msg] || [];
          for (var i = 0, len = this.callbacks[msg].length; i < len; i++) {
            this.callbacks[msg][i].apply(this, arguments);
          }
        }
      },

      data_attr = "data-bind-" + object_id,
      message = object_id + ":change",

      changeHandler = function(event) {
        // IE8兼容
        var target = event.target || event.srcElement,
          prop_name = target.getAttribute(data_attr);
        if (prop_name && prop_name !== "") {
          pubSub.publish(message, prop_name, target.value);
        }
      };

    // 监听事件变化，并代理到pubSub
    if (document.addEventListener) {
      document.addEventListener("keyup", changeHandler, false);
    } else {
      // 兼容IE8
      document.attachEvent("onkeyup", changeHandler);
    }
    // 界面修改变化
    pubSub.on(message, function(event, prop_name, new_val) {
      var elements = document.querySelectorAll("[" + data_attr + "=" + prop_name + "]"),
        tag_name;
      for (var i = 0, len = elements.length; i < len; i++) {
        tag_name = elements[i].tagName.toLowerCase();
        if (tag_name === "input" || tag_name === "textarea" || tag_name === "select") {
          elements[i].value = new_val;
        } else {
          elements[i].innerHTML = new_val;
        }
      }
    });

    return pubSub;
  }
  
/**
 * 图片上传预览 preview
 * @param {Object} file文件对象
 * @param {Function} 回调
 * @return {null}
 */
util.preview = function(file,callback) {
      var reader = new FileReader()
      reader.onload = function(e) {
          var $img = $('<img>').attr("src", e.target.result);
          if(typeof(callback) == 'function'){
            callback($img);
          }
      }
      reader.readAsDataURL(file);
  }

  /**
   * 通用loader对象
   * @param {Object} 参数对象
   * @return {Object} 返回一个公有对象
   */
  util.loading = $.fn.loading = $.loading = function(obj) {
    var opt = $.extend({
      icon: true,
      content: "", //文本
      loadingStyle: {}, //loading的样式
      loadingClass: "", //loading class。
      textStyle: {
        "font-size": "1.2em"
      }, //文本的样式
      textClass: "" //文本的class
    }, obj || {});
    var randomStr = Math.round(Math.random() * 1e6 + 1) + "",
      _content = opt.content;
    var o = {
      htmlobj: null,
      /** 初始化 */
      init: function() {
        o.initHtml();
        o.initUI();
      },
      /** 初始化html*/
      initHtml: function() {
        if (!o.html) {
          o.html = $('<div id="j_loader' + randomStr + '" class="j_loader' + randomStr + ' ui-loader  posa fullh fullw hide"><div class="j_loadermain loadermain mlrauto round-5"><span class="j_icon ui-icon-loading block center roundall o-5"></span><div class="j_content tac"></div></div></div>');
        }
        if (_content) {
          o.html.find('.j_content').html(_content);
        }
        return o.html;
      },
      /** 设置样式*/
      initUI: function() {
        o.html.find('.j_loadermain').addClass(opt.loadingClass);
        if (!opt.icon) {
          o.html.find('.j_icon').hide();
        }
        o.html.find('.j_loadermain').css(opt.loadingStyle);
        o.html.find('.j_content').css(opt.textStyle);
        o.html.find('.j_content').addClass(o.textClass);
        $('body').append(o.html);
      },
      /**
       * 设置文本内容
       * @param {string} 文本
       */
      setContent: function(s) {
        o.html.find('.j_content').html(s);
        return o;
      },
      /** loading图标隐藏 */
      showIcon: function(v) {
        if (!v) {
          o.html.find('.j_loadermain').hide();
        } else {
          o.html.find('.j_loadermain').show();
        }
        return o;
      },
      /** loading显示 */
      show: function(delay) {
        o.html.show();
        if (delay > 0) {
          setTimeout(function() {
            o.html.hide();
          }, delay);
        }
        return o;
      },
      /** loading隐藏 */
      hide: function() {
        o.html.hide();
        return o;
      },
      getHtml:function(){
        return o.html;
      }
    };

    o.init();
    return o;
  };
  /**
   * 通用列表加载方法
   * @param {Object} 参数对象
   * @return {function} 回调函数
   */
  util.listload = $.listload = function(obj, callback) {
    var opt = $.extend({
      lastItemHandle: '.list:last-child',
      loadurl: "",
      params: null,
      wrapHandle: '#listbox',
      loading: null,//加载提示框对象
      stop: false,
      scrollObj: window
    }, obj || {});
    var win = $(opt.scrollObj);
    var wrapbox = $(opt.wrapHandle);
    var stop = opt.stop;
    var o = {
      /**
       * @method 获取列表容器对象
       * @public
       */
      getDatabox: function() {
        return wrapbox;
      },
      /**
       * @method 设置获取数据参数
       * @public
       * @param {object} 参数对象
       */
      setParams: function(obj) {
        opt.params = obj;
      },
      /** @method 设置获取数据参数 */
      getParams: function() {
        return opt.params;
      },
      /** @method 设置可用数据
       *  @public
       *  @param {object} 对象
       */
      setData: function(d) {
        o.data = d;
      },
      /** @method 获取可用数据 */
      getData: function() {
        return o.data
      },
      setStop: function(v /*Boolean*/){
        stop = v;
      },
      init: function() {
//div滚动的判断
/**var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
var nScrollTop = 0;   //滚动到的当前位置
var nDivHight = $("#div1").height();

$("#div1").scroll(function(){
  nScrollHight = $(this)[0].scrollHeight;
  nScrollTop = $(this)[0].scrollTop;
  if(nScrollTop + nDivHight >= nScrollHight)
  alert("滚动条到底部了");
});*/
        win.scroll(function() {
          //手机端滚动到底部加载height=device-height;
          log(stop);
          if (!stop && $(opt.lastItemHandle).is(':visible')) {
            if (win.scrollTop() + win.height() >= $(document).height()) {
              o.setStop(true);
              if (opt.loadurl) {
                var p = o.getParams();
                if (opt.loading) opt.loading.show();
                $.getJSON(opt.loadurl, p, function(data) {
                  o.setData(data);
                  if ($.isFunction(callback)) callback();
                });
              }
            }
          }
        });

        //侧边栏滚动自动定位到相应的链接
        $(document).ready(function() {
          var a = $,
            b = document,
            c = a(".j_mainContent "),
            d = a(".j_sidebar");
          if (d.length > 0) {
            var e = d.offset().top,
              f = d.find(".anchor-btn"),
              g = function() {
                for (var b = [], c = 0; c < f.length; c++) b.push(a(a(f[c]).attr("href")).offset().top);
                return b
              },
              h = g(),
              i = function(b) {
                for (var c, b = b + 86, d = 0; d < h.length; d++)
                  if (b < h[d + 1]) {
                    c = d;
                    break
                  }
                void 0 == c && (c = d - 1), f.parent("li").find("a").removeClass("on"), a(f[c]).parent("li").find("a").addClass("on")
              },
              j = function(a) {
                a > e && !d.hasClass("tab-fix-top") && (d.addClass("tab-fix-top")), e > a && d.hasClass("tab-fix-top") && (d.removeClass("tab-fix-top"));
                /*, d.css("width", "auto"))*/
              };
            a(window).on("scroll", function(c) {
              var d = a(b).scrollTop();
              j(d), i(d)
            }), a(window).on("resize", function(e) {
              d.hasClass("tab-fix-top");
              var f = a(b).scrollTop();
              j(f), i(f)
            }), a(".anchor-btn").on("click", function(b) {
              var c = a(this);
              setTimeout(function() {
                f.parent("li").find("a").removeClass("on"), c.parent("li").find("a").addClass("on")
              }, 50)
            });
            var k = a(b).scrollTop();
            j(k)
          }
        });
      }
    };
    o.init();
    return o;
  };

})(window, window.jQuery || window.Zepto);