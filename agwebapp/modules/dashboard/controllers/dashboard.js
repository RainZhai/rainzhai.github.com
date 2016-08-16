angular.module("sncd").controller("DashBoardCtrl",["$scope", "$state", "$filter", "DashboardService", "DialogService", "AlertService",
    function($scope, $state, $filter, DashboardService, DialogService, AlertService){

        var vm = $scope;
        vm.pageSize = 10;

        vm.salesTab = [{
            title: "销售统计"
        }, {
            title: "销售明细"
        }, {
            title: "销售排行"
        }];
        vm.sumTab = [{
            title: "日汇总"
        }, {
            title: "周汇总"
        }, {
            title: "月汇总"
        }];

        vm.selectedSales = vm.salesTab[0];
        vm.selectedSum = vm.sumTab[0];
        vm.selectSales = function(item) {
            vm.selectedSales = item;
            if(vm.selectedSales.title == "销售统计"){
                console.log("销售统计Tab");
            }else if(vm.selectedSales.title == "销售明细"){
                console.log("销售明细Tab");
            }else if(vm.selectedSales.title == "销售排行"){
                console.log("销售排行Tab");
            }

        };
        vm.selectSum = function(item) {
            vm.selectedSum = item;
            if(vm.selectedSum.title == "日汇总"){
                console.log("日汇总Tab");
            }else if(vm.selectedSum.title == "周汇总"){
                console.log("周汇总Tab");
            }else if(vm.selectedSum.title == "月汇总"){
                console.log("月汇总Tab");
            }

        };










    }]);