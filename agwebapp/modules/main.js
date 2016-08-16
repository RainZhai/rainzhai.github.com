app = angular.module("sncd", ["ui.router", "sn.controls"]);
 
//app = angular.module('sncd', []);
//使用mockjax方法覆盖Ajax请求
Mock.mockjax(app);
angular.module("sncd").value('baseUrl', '/webapp');

angular.module("sncd").config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/dashboard");

    $stateProvider
        //控制台主界面
        .state("DashBoard", {
            url: "/dashboard",
            templateUrl: 'modules/sncd/templates/home/home.html',
            controller: 'HomeCtrl'
        })

        //系统概览
        .state('Home', {
            url: '/home',
            templateUrl: 'modules/sncd/templates/home/home.html',
            controller: 'HomeCtrl'
        })

        //系统管理
        .state('SystemManage', {
            url: '/system-manage',
            templateUrl: 'modules/sncd/templates/system/system-manage.html',
            controller: 'SystemManageCtrl'
        })

        //版本管理
        .state('VersionManage', {
            url: '/version-manage',
            templateUrl: 'modules/sncd/templates/version/version-in-progress.html',
            controller: 'VersionInProgressCtrl'
        })
        .state('VersionInProgress', {
            url: '/version-in-progress',
            templateUrl: 'modules/sncd/templates/version/version-in-progress.html',
            controller: 'VersionInProgressCtrl'
        })
        .state('CreateVersion', {
            url: '/create-version',
            templateUrl: 'modules/sncd/templates/version/create-version.html',
            controller: 'CreateVersionCtrl'
        })
        .state('EndedVersion', {
            url: '/ended-version',
            templateUrl: 'modules/sncd/templates/version/ended-version.html',
            controller: 'EndedVersionCtrl'
        })
        .state('ReleaseList', {
            url: '/release-list',
            templateUrl: 'modules/sncd/templates/version/release-list.html',
            controller: 'ReleaseListCtrl'
        })
        .state('VersionDetail', {
            url: '/version-detail',
            templateUrl: 'modules/sncd/templates/version/version-detail.html',
            controller: 'VersionDetailCtrl'
        })

        // 系统和版本详情信息
        .state('VersionInfo', {
            parent: 'VersionDetail',
            url: '/version-info',
            templateUrl: 'modules/sncd/templates/sysAndVersInfo/version.html',
            controller: 'VersionInfoCtrl'
        })
        .state('SystemInfo', {
            parent: 'VersionDetail',
            url: '/version-info',
            templateUrl: 'modules/sncd/templates/sysAndVersInfo/system.html',
            controller: 'SystemInfoCtrl'
        })
        .state('CodeInfo', {
            parent: 'VersionDetail',
            url: '/code-info',
            templateUrl: 'modules/sncd/templates/sysAndVersInfo/code.html',
            controller: 'CodeInfoCtrl'
        })

        // 版本详情信息的各个子信息
        .state('VersionBranchBasic', {
            parent: 'VersionInfo',
            url: '/version-branch-basic',
            templateUrl: 'modules/sncd/templates/sysAndVersInfo/version-branch-basic.html',
            controller: 'VersionBranchBasicCtrl'
        })
        .state('VersionBranchAuth', {
            parent: 'VersionInfo',
            url: '/version-branch-auth',
            templateUrl: 'modules/sncd/templates/sysAndVersInfo/version-branch-auth.html',
            controller: 'VersionBranchAuthCtrl'
        })
        .state('VersionBranchPerson', {
            parent: 'VersionInfo',
            url: '/version-branch-person',
            templateUrl: 'modules/sncd/templates/sysAndVersInfo/version-branch-person.html',
            controller: 'VersionBranchPersonCtrl'
        })

        //质量中心
        .state('QualityCenter', {
            url: '/quality-center',
            templateUrl: 'modules/sncd/templates/quality/quality-center.html',
            controller: 'QualityCenterCtrl'
        })
        .state('QualityCompare', {
            url: '/quality-compare',
            templateUrl: 'modules/sncd/templates/quality/quality-compare.html',
            controller: 'QualityCompareCtrl'
        })
        .state('MyQuality', {
            url: '/my-quality',
            templateUrl: 'modules/sncd/templates/quality/quality-center.html',
            controller: 'QualityCenterCtrl'
        })

        //发布
        .state('Publish', {
            url: '/publish',
            templateUrl: 'modules/sncd/templates/publish/publish-list.html',
            controller: 'PublishListCtrl'
        })

});

angular.module("sncd").factory('noCacheInterceptor', function() {
    return {
        request: function(config) {
            if (config.method == 'GET') {
                var separator = config.url.indexOf('?') === -1 ? '?' : '&';
                config.url = config.url + separator + 'noCache=' + new Date().getTime();
            }
            return config;
        }
    };
});

angular.module("sncd").config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('noCacheInterceptor');
}]);