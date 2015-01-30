/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class Wanbao extends egret.DisplayObjectContainer{
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
 
    private onAddToStage(event:egret.Event){
        egret.Profiler.getInstance().run();
        console.log("Hello World!");
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
         RES.loadConfig("resource/resource.json", "resource/");
         RES.loadGroup("preload");
    }
     private onGroupComplete()
     {
        //设置背景
        /** 
        var img:egret.Bitmap = new egret.Bitmap();
         img.texture = RES.getRes("bgImage");
         this.addChild(img);
         var rect:egret.Rectangle = new egret.Rectangle(30,31,40,41);
         img.scale9Grid =rect; 
         this.addChild(img);
        **/
        this.init();
     }     

     private  startbg:egret.Bitmap; //开始背景
     private  startbtn:egret.Bitmap; //开始按钮
     private  replaybtn:egret.Bitmap; //重玩按钮
     private  getscorebtn:egret.Bitmap; //获取积分按钮
     private  stage1: egret.Sprite;//场景一容器
     private currentStage: number;//当前关卡
     private  stage1bg:egret.Bitmap; //第一关背景
     private  baoshi : any[];//宝石
     private  boom:egret.Bitmap;//爆炸效果
     private  succ:egret.Bitmap;//成功过关
     private  score: number;//分数
     private scorebar:  egret.TextField;//分数条
     private boomer:egret.Bitmap; //炸弹图片
     private man: egret.Bitmap; //小人
     private mansay:  egret.TextField;//小人说话
     private zan: string[] = ['你真牛','牛逼','厉害'];//赞的话
     private xu: string[] = ['失误了吧','弱了','靠。。。'];//吐槽的话
     private initBoom():void {
        //点击后游戏特效
        this.boom = new egret.Bitmap();
          this.boom.texture = RES.getRes("boomeff");
          this.boom.width = 480;
          this.boom.height = 440;
          this.boom.x = 0;
          this.boom.y = 0;
          this.boom.alpha = 0;
     }
     private initSucc():void {
        //点击后游戏特效
         this.succ = new egret.Bitmap();
         this.succ.texture = RES.getRes("succ");
         this.succ.width = 240;
         this.succ.height = 400;
         this.succ.x = 100 ;
         this.succ.y = 100 ;
         this.succ.alpha = 0;
     }
     //初始化分数条
     private initScorebar():void {
         this.scorebar = new egret.TextField();
         this.scorebar.text  = "当前积分";
         this.scorebar.width = 200;
         this.scorebar.height = 25;
         this.scorebar.x = 100 ;
         this.scorebar.y = 10; 
        this.scorebar.size = 25;
        this.scorebar.fontFamily = "微软雅黑";
     } 
     private init():void {
         //设置场景背景
        this.stage1 = new egret.Sprite();
        this.stage1.width = this.stage.stageWidth;
        this.stage1.height = this.stage.stageHeight;
         this.stage1bg = new egret.Bitmap();
         this.stage1bg.texture = RES.getRes("stage1");
         this.stage1bg.width = this.stage.stageWidth;
         this.stage1bg.height = this.stage.stageHeight;
         this.stage1bg.x = 0 ;
         this.stage1bg.y = 0 ;  

        this.score = 0;
        //游戏开始界面和图标
         this.startbg = new egret.Bitmap();
         this.startbg.texture = RES.getRes("startbg");
         this.startbg.width = this.stage.stageWidth;
         this.startbg.height = this.stage.stageHeight;
         this.startbg.x = 0 ;
         this.startbg.y = 0 ; 
         this.stage1.addChild(this.startbg);

         this.startbtn = new egret.Bitmap();
         this.startbtn.texture = RES.getRes("startbtn");
         this.startbtn.width = 120;
         this.startbtn.height = 40;
         this.startbtn.x = this.stage.stageWidth/2 - 60;
         this.startbtn.y = this.stage.stageHeight - 100 ;
         this.startbtn.touchEnabled = true;
         this.startbtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.startgameTouch, this );
         this.stage1.addChild(this.startbtn);
         //重玩按钮
         this.replaybtn = new egret.Bitmap();
         this.replaybtn.texture = RES.getRes("replaybtn");
         this.replaybtn.width = 60;
         this.replaybtn.height = 60;
         this.replaybtn.x = this.stage.stageWidth/2 - 60;
         this.replaybtn.y = this.stage.stageHeight/2;  
         this.replaybtn.alpha = 0;
         this.replaybtn.touchEnabled = true;

         //分数按钮
         this.getscorebtn = new egret.Bitmap();
         this.getscorebtn.texture = RES.getRes("getscorebtn");
         this.getscorebtn.width = 60;
         this.getscorebtn.height = 60;
         this.getscorebtn.x = this.stage.stageWidth/2 + 60;
         this.getscorebtn.y = this.stage.stageHeight/2;  
         this.getscorebtn.alpha = 0;

         //炸弹
         this.boomer= new egret.Bitmap();
         this.boomer.texture = RES.getRes("boomer");
         this.boomer.width = 50;
         this.boomer.height = 50;
         this.boomer.x = this.stage.stageWidth/2 -  25;
         this.boomer.y = 550 ;
         this.boomer.alpha = 1;
         this.boomer.touchEnabled = true;
         //小人
         this.man= new egret.Bitmap();
         this.man.texture = RES.getRes("man1");
         this.man.width = 50;
         this.man.height = 50;
         this.man.x = this.stage.stageWidth/2 -  25;
         this.man.y = 550 ;
         this.man.alpha = 0;
         
         this.mansay = new egret.TextField();
         this.mansay.text  = "低调低调低调低调低调低调低调低调";
         this.mansay.width = 200;
         this.mansay.height = 25;
         this.mansay.x = 100 ;
         this.mansay.y = 10; 
        this.mansay.size = 25;
        this.mansay.fontFamily = "微软雅黑";
        this.mansay.alpha = 0;

        this.initBoom();
        this.initSucc();
        this.initScorebar();
         this.stage1.addChild(this.succ);
         this.stage1.addChild( this.boom);
         this.stage1.addChild( this.scorebar);
         this.stage1.addChild(this.replaybtn);
         this.stage1.addChild(this.getscorebtn);
         this.stage1.addChild(this.man);
         this.stage1.addChild(this.mansay);
        this.addChild(this.stage1);
     }
     //第一关设置
     private initStage1():void {
        this.currentStage = 1;
         //设置宝石
         /**
         this.baoshi =new Array();
          this.baoshi.push({
            res: 'baoshi1',
            width: 50,
            height : 50,
            x : this.stage.stageWidth/2 -  bs.width/2 ,
            y : 500
          });**/
        this.stage1.addChild(this.boomer); 
        this.stage1.addChild(this.stage1bg); 
        this.stage1.setChildIndex( this.stage1bg, 0);
        this.playStage1();
     }
     private playStage1():void {
        if(this.stage1){  
            this.boom.alpha = 0;
            this.replaybtn.alpha = 0;
            this.getscorebtn.alpha = 0; 
            this.man.alpha = 0;
            this.mansay.alpha = 0;
            if(this.stage1.getChildByName( "bswrap" )){this.stage1.removeChild(this.stage1.getChildByName( "bswrap" )); }
        }
         var bs:egret.Bitmap = new egret.Bitmap(); 
         bs.texture = RES.getRes("baoshi1");
         bs.width = 50;
         bs.height = 50;
         bs.x = this.stage.stageWidth/2 -  bs.width/2 ;
         bs.y = 450;
         bs.touchEnabled = true;
         var bs2:egret.Bitmap = new egret.Bitmap(); 
         bs2.texture = RES.getRes("baoshi2");
         bs2.width = 50;
         bs2.height = 50;
         bs2.x = this.stage.stageWidth/2 -  bs.width/2 ;
         bs2.y = 450 ;
         bs2.touchEnabled = true;
         this.boomer.alpha = 1;
         var bswrap:egret.Sprite =new egret.Sprite();
         bswrap.name = "bswrap";
         bswrap.x=0;
         bswrap.y=0;
         bswrap.addChild(bs);
         bswrap.addChild(bs2);
         this.stage1.addChild(bswrap); 
         //设置移动动画 
        egret.Tween.get(bs, { loop: false }).to( {x:320}, 500 ).to( {x:150}, 500 ).to( {x:320}, 500 ).wait(500).to( {alpha:0.1}, 500 ); 
        egret.Tween.get(bs2, { loop: false }).to( {x:130}, 500 ).to( {x:350}, 500 ).to( {x:130}, 500 ).wait(500).to( {alpha:0.1}, 500 ); 
 
         //注册事件
         bs.addEventListener( egret.TouchEvent.TOUCH_TAP, this.diamondTouch, this );
         bs2.addEventListener( egret.TouchEvent.TOUCH_TAP, this.diamondTouch, this );
         this.boomer.addEventListener( egret.TouchEvent.TOUCH_TAP, this.boomerTouch, this );
     }
     //点击开始游戏
     private startgameTouch( evt:egret.TouchEvent ){
         if(this.stage1 ) {
            this.stage1.removeChild(this.startbg);
            this.stage1.removeChild(this.startbtn);
         }
         this.initStage1();
     }

     private diamondTouch( evt:egret.TouchEvent )
     {
         egret.Tween.get(this.succ, { loop: false }).to({ alpha: 1 }, 200);
         this.score  = this.score + 500;
         this.scorebar.text  = "当前积分 : "+ this.score;
     }
     //炸弹爆炸逻辑
     private boomerTouch( e:egret.TouchEvent )
     {
         this.boomer.alpha = 0;
         this.boom.x =  e.stageX - 240;
         this.boom.y =  e.stageY-420;
         this.boom.alpha = 1;
         this.replaybtn.alpha = 1;
         this.getscorebtn.alpha = 1; 
         //小人提示
         this.man.x =  e.stageX-50;
         this.man.y =  e.stageY-50;
         this.man.alpha = 1;
         this.mansay.x =  e.stageX;
         this.mansay.y =  e.stageY-40;
         this.mansay.alpha = 1;
         //计算分数
         if(this.score>100){ this.score  = this.score - 100; }
         else{ this.score = 0;}
         this.scorebar.text  = "当前积分 : "+ this.score;
         this.replaybtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.replayTouch, this );
     }
     //重玩按钮逻辑
     private replayTouch( e:egret.TouchEvent )
     {
        this.score = 0;
        if(this.currentStage ==1) this.playStage1();
     }

}