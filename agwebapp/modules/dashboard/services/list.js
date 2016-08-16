angular.module("sncd").service("DashboardService", ["HttpService", function(HttpService) {
    return {
        "getLogList": function(params) {
            return HttpService.get("/log/list.htm", params);
        },
        "getOrdersList": function(params) {
            return HttpService.get("/platform/list_order.htm", params);
        },
        "getOrdersCount": function(params) {
            return HttpService.get("/platform/count_order.htm", params);
        },
        "getResourceUsage": function(params) {
            return HttpService.get("/platform/resourceList.htm", params);
        },
        "getDeployInfo": function(params) {
            return HttpService.get("/topology/undeployedList.htm", params);
        },
        "autodeploy": function(params) {
            return HttpService.get("/topology/auto_assemble.htm", params);
        }
    };
}]);