angular.module('sncd')
    .filter('quaTrendFilter', function () {
        var quaTrend = {
            0: "↑",
            1: "↓",
            2: "--",
            "0":"↑",
            "1":"↓",
            "2": "--"
        };

        return function (state) {
            return quaTrend[state];
        };
    });
