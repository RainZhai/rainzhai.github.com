angular.module("sncd").service("UserService", ["HttpService", function(HttpService) {
    return {
        "getUserinfo": function(params) {
            return HttpService.get("/user_massage.htm", params);
        }
    };
}]);