angular.module('sncd').service('QuaService', ['mockService', 'HttpService', '$q', 'AlertService',
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

            getMyQuality: function (params) {
                //// 获取我的质量
                return HttpService.post("/angular/quality/getMyQuality.htm", params).then(function (data) {
                    return handleRspData(data);
                });

            }

        };

    }]);

