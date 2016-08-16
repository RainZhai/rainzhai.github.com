angular.module('sncd').filter('versionStatusFileter', function () {
    var versStatus = {
        "059": "进行中",
        "060": "已封板",
        "063":"已合并",
        "178":"已废弃"
    };

    return function (state) {
        return versStatus[state];
    };
});