//系统相关Service
angular.module('sncd').service('SystemService', ['mockService', 'HttpService', '$q', 'AlertService',
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


        //返回数据处理
        function handleRsp(data) {
            var defer = $q.defer(),
                errCode = data.errCode,
                errMsg = data.errMsg || '系统出了点小问题，请稍后重试！';

            switch (errCode) {
                case '0':
                    defer.resolve(data);
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
            //// 获取我的系统
            getMySystem: function (params) {
                return HttpService.post("/angular/system/mySystemPage.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },
            //获取系统详情
            sysDetailInfo: function (params) {
                return HttpService.post("/angular/system/sysDetailInfo.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },
            //获取系统进行中、已结束的版本数量
            getVersionNumByMySystem:function (params) {
                return HttpService.post("/angular/version/getVersionNumByMySystem.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },
            //获取全部系统
            getAllSystem: function (params) {
                return HttpService.post("/angular/system/allSystemPage.htm", params).then(function (data) {
                    return handleRspData(data);
                });
            },
            //更新一条系统信息
            updateItem: function (params) {
                return HttpService.post("/angular/system/updateSystem.htm", params).then(function (data) {
                    return handleRspData(data);
                });
            },
            //新增一条记录
            createSystem: function (params) {
                return HttpService.post("/angular/system/createSystem.htm", params).then(function (data) {
                    return handleRspData(data);
                });
            },
            //获取全部中心list
            getOrgList: function () {
                return HttpService.post("/angular/system/allOrgList.htm").then(function (data) {
                    return handleRspData(data);
                });
            },

            //获取系统团队
            getSystemTeam: function (params) {
                return HttpService.post("/angular/system/team/detail.htm", params).then(function (data) {
                    return handleRspData(data);
                });
            },
            //获取系统下的应用包
            getPackageBySys:function (params){
                return	HttpService.get("/angular/package/getPackageBySys.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },
            //获取系统下的应用包
            addPackageInit:function (params){
                return	HttpService.get("/angular/package/addPackageInit.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },
            //保存系统包
            savePackage:function (params){
                return	HttpService.post("/angular/package/savePackage.htm", params).then(function(data) {
                    return handleRsp(data);
                });
            },
            //校验包是否已经存在
            isSysPackageExist:function (params){
                return	HttpService.post("/angular/package/isSysPackageExist.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },
            //检查包是否已经配置
            packageIsConfig:function (params){
                return	HttpService.post("/angular/package/packageIsConfig.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },
            //删除包
            makePackageUnActive:function (params){
                return HttpService.post("/angular/package/makePackageUnActive.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },
            //校验包是否在使用
            isSysPackageUsing:function (params){
                return HttpService.post("/angular/package/isSysPackageUsing.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },
            //判断打包配置跳转情况
            createOrDetail:function (params){
                return HttpService.post("/angular/packageconfig/createOrDetail.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },
            //打包配置详情
            packageConfig:function (params){
                return HttpService.post("/angular/packageconfig/detail.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },
            //创建打包详情
            addPackageConfig:function (params){
                return HttpService.post("/angular/packageconfig/add.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },
            //保存打包JOB
            createPackageConfigJob:function (params){
                return HttpService.post("/angular/packageconfig/createjob.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },
            //检查是否正在打包中...
            checkbuild:function (params){
                return HttpService.post("/angular/packageconfig/checkbuild.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },
            //更新打包配置
            updatePackageConfig:function (params){
                return HttpService.post("/angular/packageconfig/updatePackageConfig.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },
            //删除打包配置
            deletePackageConfig:function (params){
                return HttpService.post("/angular/packageconfig/deletePackageConfig.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },
            //测试打包
            testPackageConfig:function (params){
                return HttpService.post("/angular/packageconfig/testPackageConfig.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            },
            //获取打包结果
            getPackageConfigConsole:function (params){
                return HttpService.post("/angular/packageconfig/getconsole.htm", params).then(function(data) {
                    return handleRspData(data);
                });
            }

        };

    }]);
