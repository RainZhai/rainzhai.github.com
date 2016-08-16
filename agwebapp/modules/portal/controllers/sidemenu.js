angular.module("sncd").controller('SideMenuCtrl', ["$rootScope", "$state", function ($rootScope, $state) {
    var vm = this;

    this.menus = [];

    var menus = [
        {code: "0", name: "系统概况", icon: "fa fa-dashboard", state: "Home"},
        {code: "1", name: "系统管理", icon: "fa fa-server", state: "SystemManage"},
        {code: "2", name: "版本管理", icon: "fa fa-cubes", state: "VersionManage"},
        {code: "3", name: "质量中心", icon: "fa fa-heartbeat",state:"QualityCenter"},
        {code: "4", name: "发布", icon: "fa fa-cloud",state:"Publish"},
        // {code: "5", name: "SPA自动化部署", icon: "fa fa-cubes",state:""},
        // {code: "6", name: "技术组件库", icon: "fa fa-server",state:""},
        // {code: "7", name: "文档部门库", icon: "fa fa-cubes", state: ""},
        // {code: "8", name: "动态", icon: "fa fa-heartbeat",state:""},
        // {code: "9", name: "运维管理", icon: "fa fa-cloud",state:""},
        // {code: "10", name: "配置审计", icon: "fa fa-cubes",state:""},
        // {code: "11", name: "平台管理", icon: "fa fa-cloud",state:""},
        // {code: "12", name: "工具视图", icon: "fa fa-cubes", state: ""},

        {parent: "2", code: "2-0", name: "创建版本", icon: "fa fa-anchor", state: "CreateVersion"},
        {parent: "2", code: "2-1", name: "进行中版本", icon: "fa fa-hdd-o", state: "VersionInProgress"},
        {parent: "2", code: "2-2", name: "已结束版本", icon: "fa fa-anchor", state: "EndedVersion"},
        {parent: "2", code: "2-3", name: "我的发布单", icon: "fa fa-hdd-o", state: "ReleaseList"},

        {parent: "3", code: "3-0", name: "质量对比", icon: "fa fa-umbrella", state: "QualityCompare"},
        {parent: "3", code: "3-1", name: "我的质量", icon: "fa fa-stethoscope", state: "MyQuality"},

        // {parent: "5", code: "5-0", name: "SPA请求号", icon: "fa fa-umbrella", state: ""},
        // {parent: "5", code: "5-1", name: "SPA发布单", icon: "fa fa-stethoscope", state: ""},

        // {parent: "9", code: "9-0", name: "脚本管理", icon: "fa fa-umbrella", state: ""},
        // {parent: "9", code: "9-1", name: "操作日志", icon: "fa fa-stethoscope", state: ""}
    ];

    var menuMap = {};

    for (var i=0; i<menus.length; i++) {
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
        }
        else {
            this.selectedMenu = menu.parentMenu;
        }
    };

    this.selectMenu2 = function (menu) {
        if (menu != this.selectedMenu) {
            this.selectedMenu = menu;

            if (menu.state) {
                $state.go(menu.state);
            }
        }
    };

    this.isMenuSelected = function(menuItem) {
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
        menus.forEach(function(it) {
            if (it.state == toState.name) {
                vm.selectedMenu = it;
                console.log(it.state);
                return false;
            }
        });
    });
}]);