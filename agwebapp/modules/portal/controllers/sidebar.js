angular.module("sncd").controller("SideBarCtrl", ["$scope", "$rootScope", "UserService", function($scope, $rootScope,UserService) {
    var vm = $scope;
    vm.username = "张三";
    /*UserService.getUserinfo().then(function(data){
        if(data.success == 1){
            vm.username = data.result.userVO.userName;
        }
    });*/
}]);