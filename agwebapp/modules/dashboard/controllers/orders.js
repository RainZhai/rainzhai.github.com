angular.module("sncd").controller("OrdersCtrl", ["$scope", "DashboardService", function($scope, DashboardService) {
    var vm = $scope;
    vm.pageSize = 10;

    function loadOrdersList(pageIndex){
        var para = {
            "pageNo": pageIndex,
            "pageSize": vm.pageSize
        };
        /*DashboardService.getOrdersList(para).then(function(data){
            if(data.success == 1) {
                vm.count = data.result.orders.totalCount;
                vm.orderList = data.result.orders.module;
                vm.totalDataCount = data.result.orders.totalCount;
            }
        });*/

    }

    vm.$on('sn.controls.pager:pageIndexChanged', function (evt,page) {
        // 分页操作
        evt.stopPropagation();
        loadOrdersList(page + 1);
    });

    vm.isShowPageIndex = function () {
        return (vm.totalDataCount > vm.pageSize);
    };

    vm.init = function() {
        loadOrdersList(1);
    };

}]);