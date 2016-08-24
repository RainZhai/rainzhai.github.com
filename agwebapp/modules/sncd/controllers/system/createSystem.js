angular.module('sncd').controller('CreateSystemCtrl', ['$scope', 'SystemService', '$state', '$stateParams', 'close',
    function ($scope, SystemService, $state, $stateParams, close) {
        var vm = $scope;
        vm.sysCnname = "", vm.processNum = 0, vm.finishNum = 0, vm.reposName = "", vm.environment = "mac";
        $scope.close = function (result) {
            close();
        };

        $scope.save = function (result) {
            var params = { sysId: "3656", sysCnname: "bali", processNum: 0, finishNum: 0, reposName: "cooke", environment: "linux" };
            //add version
            SystemService.createSystem(params).then(function (result) {
                close(result.data);
            });
        };
    }]);
