window.Common = {};
Common.home = function(){
  this.init();
};
Common.home.prototype = {
  init: function(){
    var me = this;
    me.initUI();
    me.registerEvent();
  },
  initUI: function(){
        //创建滑动广告头部
        var bigswipe = new $.swipe({ 
              touchSelector: ".c_touch2",
              imgArray: [],
              linksArray: [],
              time: 3000,
              autorun: true,
              width: $(window).width(),
              height: 450,
              responsive: false,
              fadeout: true,
              tipsClass: "bggrey",
              tipsActiveClass: "bgw",
              tipswrapStyle: {
                bottom: "10px",
                right: ($(window).width()-$(".c_touchicon").width())/2 +"px"
        }}); 
  },
  registerEvent: function(){ 
  }
}
