angular.module('sncd').service('VersionManageService', ['mockService', 'HttpService', '$q', 'AlertService',
    function (mockService, HttpService, $q, AlertService) {
        'use strict';

        //返回数据处理
        function handleRspData(data) {
            var defer = $q.defer(),
                errCode = data.errCode,
                errMsg = data.errMsg || '系统出了点小问题，请稍后重试！';

            switch (errCode) {
                case '0':
                    defer.resolve(data.data);
                    break;
                default:
                    AlertService.alert({
                        title: '提示信息',
                        content: errMsg
                    });
                    defer.reject(errMsg);
                    break;
            }

            return defer.promise;
        }

        //接口
        return {

            //获取系统下的版本
            getAllVers: function (params) {
                return HttpService.get("/angular/version/getVersionBySys.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },

            //创建分支
            createVersion: function (params){
                return	HttpService.get("/angular/version/createVersion.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },

            //检查版本号是否已经存在
            isVersionExist:function (params){
                return	HttpService.get("/angular/version/isVersionExist.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },

            //保存分支
            saveVersion: function (params){
                return	HttpService.get("/angular/version/saveVersion.htm", params).then(function(data) {
                    return data;
                });
            },

            // 获取我的版本
            getMyVersion: function (params) {
                return HttpService.post("/angular/version/myversion.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },
            // 封板
            freezenVersion: function (params) {
                return HttpService.post("/angular/version/freezen.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },
            //是否有未完成的发布单
            isBranchHasUnFinishRequest: function (params) {
                return HttpService.post("/angular/version/isBranchHasUnFinishRequest.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },

            //解版页面数据获取
            unfreezenVersionInit: function (params) {
                return HttpService.post("/angular/version/unfreezenVersionInit.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },

            //解版
            unfreezenVersion: function (params) {
                return HttpService.post("/angular/version/unfreezenVersion.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },
            //封板
            abandonVersion:function (params){
                return HttpService.post("/angular/version/abandonVersion.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },

            //合并分支
            mergeVersion:function (params){
                return HttpService.post("/angular/version/mergeVersion.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            }
        };

    }]);
