angular.module("sncd").controller("HeaderCtrl", ["$scope", "$rootScope", "AlertService", "UserService", function($scope, $rootScope, AlertService, UserService) {
    var vm = $scope;
    vm.username = "张三";
    /*UserService.getUserinfo().then(function(data){
        if(data.success == 1){
            vm.username = data.result.userVO.userName;
        }
    });*/
    vm.toggleSidebar = function() {
        $rootScope.sidebarCollapsed = !$rootScope.sidebarCollapsed;
    };

    vm.toggleControlSidebar = function() {
        $rootScope.controlSidebarOpened = !$rootScope.controlSidebarOpened;
    };

 /*   vm.logout = function(){
        AlertService.confirm({
            title: "确认",
            content: "确定要退出登录吗？"
        }).then(function() {
                UserService.logout();
            });

    };*/
}]);