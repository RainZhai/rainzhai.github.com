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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Wanbao = (function (_super) {
    __extends(Wanbao, _super);
    function Wanbao() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Wanbao.prototype.onAddToStage = function (event) {
        egret.Profiler.getInstance().run();
        console.log("Hello World!");
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.loadGroup("preload");
    };
    Wanbao.prototype.onGroupComplete = function () {
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
    };
    Wanbao.prototype.addBoom = function () {
        //点击后游戏特效
        this.boom = new egret.Bitmap();
        this.boom.texture = RES.getRes("boom");
        this.boom.width = 300;
        this.boom.height = 300;
        this.boom.x = 0;
        this.boom.y = 0;
        this.boom.alpha = 0;
        this.stage1.addChild(this.boom);
    };
    Wanbao.prototype.addSucc = function () {
        //点击后游戏特效
        this.succ = new egret.Bitmap();
        this.succ.texture = RES.getRes("succ");
        this.succ.width = 480;
        this.succ.height = 800;
        this.succ.x = 0;
        this.succ.y = 0;
        this.succ.alpha = 0;
        this.stage1.addChild(this.succ);
    };
    Wanbao.prototype.init = function () {
        //游戏开始界面和图标
        this.startbg = new egret.Bitmap();
        this.startbg.texture = RES.getRes("startbg");
        this.startbg.width = this.stage.stageWidth;
        this.startbg.height = this.stage.stageHeight;
        this.startbg.x = 0;
        this.startbg.y = 0;
        this.addChild(this.startbg);
        this.startbtn = new egret.Bitmap();
        this.startbtn.texture = RES.getRes("startbtn");
        this.startbtn.width = 120;
        this.startbtn.height = 40;
        this.startbtn.x = this.stage.stageWidth / 2 - 60;
        this.startbtn.y = this.stage.stageHeight - 100;
        this.addChild(this.startbtn);
        this.startbtn.touchEnabled = true;
        this.startbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startgameTouch, this);
    };
    //第一关设置
    Wanbao.prototype.initStage1 = function () {
        this.stage1 = new egret.Sprite();
        this.stage1.width = this.stage.stageWidth;
        this.stage1.height = this.stage.stageHeight;
        this.stage1bg = new egret.Bitmap();
        this.stage1bg.texture = RES.getRes("stage1");
        this.stage1bg.width = this.stage.stageWidth;
        this.stage1bg.height = this.stage.stageHeight;
        this.stage1bg.x = 0;
        this.stage1bg.y = 0;
        this.stage1.addChild(this.stage1bg);
        //this.baoshi = [{src:}];
        //设置宝石
        var bs = new egret.Bitmap();
        bs.texture = RES.getRes("baoshi1");
        bs.width = 50;
        bs.height = 50;
        bs.x = this.stage.stageWidth / 2 - bs.width / 2;
        bs.y = 500;
        this.stage1.addChild(bs);
        var bs2 = new egret.Bitmap();
        bs2.texture = RES.getRes("baoshi1");
        bs2.width = 50;
        bs2.height = 50;
        bs2.x = this.stage.stageWidth / 2 - bs.width / 2;
        bs2.y = 500;
        this.stage1.addChild(bs2);
        this.addBoom();
        this.addSucc();
        this.addChild(this.stage1);
        //设置移动动画 
        egret.Tween.get(bs, { loop: false }).to({ x: 350 }, 500).to({ x: 150 }, 500).to({ x: 350 }, 500).wait(500).to({ alpha: 0 }, 500);
        egret.Tween.get(bs2, { loop: false }).to({ x: 150 }, 500).to({ x: 350 }, 500).to({ x: 150 }, 500).wait(500).to({ alpha: 0 }, 500);
        //在点击后注册事件
        //开启spr1的Touch开关
        bs.touchEnabled = true;
        //注册事件
        bs2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        bs.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    Wanbao.prototype.startgameTouch = function (evt) {
        if (this.startbg) {
            this.removeChild(this.startbg);
        }
        if (this.startbtn) {
            this.removeChild(this.startbtn);
        }
        this.initStage1();
    };
    Wanbao.prototype.onTouch = function (evt) {
        egret.Tween.get(this.succ, { loop: false }).to({ alpha: 1 }, 200);
    };
    return Wanbao;
})(egret.DisplayObjectContainer);
Wanbao.prototype.__class__ = "Wanbao";
