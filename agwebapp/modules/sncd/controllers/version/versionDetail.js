angular.module('sncd').controller('VersionDetailCtrl', ['$scope', 'VersionManageService','$state','$stateParams',
    function ($scope, VersionManageService, $state, $stateParams) {

        $scope.selectedTab = 1;
        $state.go('VersionInfo');

    }]);
