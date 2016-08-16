angular.module('sncd').controller('VersionInfoCtrl', ['$scope', 'VersionManageService','$state','$stateParams',
    function ($scope, VersionManageService, $state, $stateParams) {

        $scope.selectedTab = 1;
        $state.go('VersionBranchBasic');

    }]);
