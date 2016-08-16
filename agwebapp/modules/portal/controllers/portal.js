angular.module("sncd").controller("PortalCtrl", ["$rootScope", "DialogService", "AlertService", function($rootScope, DialogService, AlertService) {

    this.sidebarCollapsed = function() {
        return $rootScope.sidebarCollapsed;
    };

    $rootScope.$on("$stateChangeSuccess", function() {
        DialogService.dismissAll();
        AlertService.dismissAll();
    });
}]);