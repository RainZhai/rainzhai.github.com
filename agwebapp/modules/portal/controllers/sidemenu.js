angular.module("sncd").controller('SideMenuCtrl', ["$rootScope", "$state", function ($rootScope, $state) {
    var vm = this;

    this.menus = [];

    var menus = [
        { code: "0", name: "系统概况", icon: "fa fa-dashboard", state: "Home" },
        { code: "1", name: "系统管理", icon: "fa fa-server", state: "SystemManage" },
        { code: "2", name: "版本管理", icon: "fa fa-cubes", state: "VersionManage" },

        { parent: "2", code: "2-0", name: "创建版本", icon: "fa fa-anchor", state: "CreateVersion" },
        { parent: "2", code: "2-1", name: "进行中版本", icon: "fa fa-hdd-o", state: "VersionInProgress" },
        { parent: "2", code: "2-2", name: "已结束版本", icon: "fa fa-anchor", state: "EndedVersion" },
        { parent: "2", code: "2-3", name: "我的发布单", icon: "fa fa-hdd-o", state: "ReleaseList" }
    ];

    var menuMap = {};
    var util = {};
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
        ns.supportStorage = "localStorage" in window;
        ns.supportOrientation = "orientation" in window;
        ns.supportDeviceMotion = "ondevicemotion" in window;
        ns.supportTouch = "ontouchstart" in window;
        ns.supportCanvas = document.createElement("canvas").getContext !== null;
        ns.cssPrefix = ns.isWebKit ? "webkit" : ns.isFirefox ? "Moz" : ns.isOpera ? "O" : ns.isIE ? "ms" : "";
    };
    detectBrowser(util);

    for (var i = 0; i < menus.length; i++) {
        var menuItem = menus[i];
        menuMap[menuItem.code] = menuItem;

        if (!menuItem.parent) {
            this.menus.push(menuItem);
        }
        else {
            var parent = menuMap[menuItem.parent];
            if (!parent.children) {
                parent.children = [];
            }
            parent.children.push(menuItem);
            menuItem.parentMenu = parent;
        }
    }

    this.selectedMenu = null;

    this.selectMenu1 = function (menu) {
        if (menu != this.selectedMenu) {
            this.selectedMenu = menu;
            if (menu.state) {
                $state.go(menu.state);
            }
        }else {
            this.selectedMenu = menu.parentMenu;
        }
        if(util.isMobile && util.supportTouch){
            //sidebar伸展
            $rootScope.sidebarCollapsed = !$rootScope.sidebarCollapsed;
        }
    };

    this.selectMenu2 = function (menu) {
        if (menu != this.selectedMenu) {
            this.selectedMenu = menu;
            if (menu.state) {
                $state.go(menu.state);
            }
        }
        if(util.isMobile && util.supportTouch){
            //sidebar伸展
            $rootScope.sidebarCollapsed = !$rootScope.sidebarCollapsed;
        }
    };

    this.isMenuSelected = function (menuItem) {
        if (this.selectedMenu) {
            if (this.selectedMenu.code.indexOf(menuItem.code) == 0) {
                return true;
            }
        }
        else {
            return false;
        }
    };

    $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
        menus.forEach(function (it) {
            if (it.state == toState.name) {
                vm.selectedMenu = it;
                console.log(it.state);
                return false;
            }
        });
    });
}]);