angular.module("sncd").controller("DeployCtrl", ["$scope", "DialogService", "DashboardService", "AlertService", function($scope, DialogService, DashboardService, AlertService) {
        var vm = $scope,
        error = vm.error ={},
        formData = vm.formData = {},
        errsMsg = vm.errsMsg = {
            pwdErrMsg: ""
        };

        vm.init = function() {

        };

        vm.ok = function() {
            var form = $scope.deployForm;
            var regpwd = /^[a-zA-Z0-9]{8,24}$/;
            var pwd = formData.password;
            if(form.password.$invalid || !regpwd.test(pwd)){
                error.password = true;
                errsMsg.pwdErrMsg = "密码包含大小写字母、数字中的任意字符，长度8-24位";
            }else{
                error.password = false;
                errsMsg.pwdErrMsg = "";
            }

            if(error.password){
                return;
            }

            var para = {
                "orderId" : $scope.$parent.orderId,
                "password": formData.password
            };
            /*DashboardService.autodeploy(para).then(function(data){
                if(data.success == 1) {
                    DialogService.accept("IaaS.Dashboard.DeployDialog",vm.formData);
                } else {
                    AlertService.alert({
                        title: "警告",
                        content: "部署失败"
                    })
                }
            });*/
            vm.close();
        };

        vm.close = function() {
            DialogService.dismiss("IaaS.Dashboard.DeployDialog");
        };

        vm.cancel = function() {
            DialogService.refuse("IaaS.Dashboard.DeployDialog");
        };
    }]);