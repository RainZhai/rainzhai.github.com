angular.module("sncd").controller("ControlSidebarCtrl", ["$rootScope", function($rootScope) {
    this.opened = function() {
        return $rootScope.controlSidebarOpened;
    };
}]);