angular.module('sncd').controller('SystemManageCtrl', ['$scope', 'SystemService', 'ModalService', 'AlertService', '$state',
    function ($scope, SystemService, ModalService, AlertService, $state) {

        'use strict';

        var vm = $scope,
            formData = vm.formData = {},
            sysMap = {},
            pager = vm.pager = {
                currentPage: 1,
                itemsPerPage: 5,
                listSize: 5,
                totalItems: 0
            };

        vm.sysList = [];
        //$scope.currWorkNo = $rootScope.currUser && $rootScope.currUser.workNo;
        //tree
        vm.treelist = [{
            label: 'Glasses',
            value: 'glasses',
            children: [{
                label: 'Top Hat',
                value: 'top_hat'
            }, {
                    label: 'Curly Mustache',
                    value: 'mustachio'
                }]
        }];

        vm.awesomeCallback = function (node, tree) {
            // Do something with node or tree
        };

        vm.otherAwesomeCallback = function (node, isSelected, tree) {
            // Do soemthing with node or tree based on isSelected
        }
        //全选功能
        vm.selected = [];
        var updateSelected = function (action, id) {
            if (action == 'add' & vm.selected.indexOf(id) == -1) vm.selected.push(id);
            if (action == 'remove' && vm.selected.indexOf(id) != -1) vm.selected.splice(vm.selected.indexOf(id), 1);
        }

        vm.updateSelection = function ($event, id) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            updateSelected(action, id);
        };

        vm.selectAll = function ($event) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            for (var i = 0; i < vm.sysList.length; i++) {
                var entity = vm.sysList[i];
                updateSelected(action, entity);
            }
        };

        vm.getSelectedClass = function (entity) {
            return vm.isSelected(entity) ? 'selected' : '';
        };

        vm.isSelected = function (id) {
            return vm.selected.indexOf(id) >= 0;
        };

        vm.isSelectedAll = function () {
            return vm.selected.length === vm.sysList.length;
        };

        vm.removeSelectedItem = function () {
            if(vm.selected.length > 0){
                AlertService.confirm({
                    title: "删除",
                    content: "确定删除吗?"
                }).then(function (d) {
                    for(var i = 0; i<vm.selected.length; i++){
                        vm.sysList.splice(vm.sysList.indexOf(vm.selected[i]), 1);
                    }
                }, function () { }, function () { });
            }
        };

        function init() {
            getMySystemList(vm.pager.currentPage);
        }

        // 查询系统列表
        function getMySystemList(pageNumber) {

            var params = {
                pageNum: pageNumber,
                keyword: vm.keyword
            };

            SystemService.getMySystem(params).then(function (result) {
                vm.pager.totalItems = result.totalDataCount;
                //定位到某一页
                vm.pager.currentPage = result.pageNumber;
                vm.$broadcast('sn.controls.pager:toPage', vm.pager.currentPage);
                vm.sysList = result.datas;
            });
        }
        $scope.addSysDialog = function () {
            // DialogService.modal({
            //     url: "/angular/system/dialog.htm"
            // });
            ModalService.showModal({
                templateUrl: 'modules/sncd/templates/system/create-system.html',
                controller: 'CreateSystemCtrl'
            }).then(function (modal) {
                modal.close.then(function (result) {
                    vm.sysList.push(result);
                });
            });
        };

        $scope.deleteItem = function (item) {
            AlertService.confirm({
                title: "删除",
                content: "确定删除吗?"
            }).then(function (d) {
                //删除一行的内容
                $scope.sysList.splice($scope.sysList.indexOf(item), 1);
            }, function () { }, function () { });
        };

        $scope.getSystemVersions = function (sys, type) {
            $state.go("VersionManage", {
                sysId: sys.sysId,
                type: type
            });
        };

        //搜索
        $scope.search = function () {
            vm.pager.currentPage = 1;
            getMySystemList(vm.pager.currentPage);
        }


        $scope.createVersion = function (sys) {
            $state.go("CreateVersion", {
                id: sys.sysId
            });
        };
        //更新记录
        $scope.updateItem = function (sys) {
            SystemService.updateItem(sys).then(function (result) {
                if (result.data) {
                    AlertService.alert({
                        title: "更新成功",
                        content: result.data.sysCnname + "更新成功"
                    });
                }
            });
        };

        //跳转打包配置
        $scope.goPackageConfig = function (system) {
            SystemService.createOrDetail({ "sysId": system.sysId }).then(function (result) {
                if (result.showType == "1") {//进入详情
                    $state.go("PackageConfig", {
                        sysId: system.sysId
                    });
                } else {//进入新建
                    $state.go("AddPackageConfig", {
                        sysId: system.sysId
                    });
                }
            });
        }

        //Events
        //分页
        vm.$on('sn.controls.pager:pageIndexChanged', function (evt, page) {
            evt.stopPropagation();
            pager.currentPage = page.pageIndex + 1;
            getMySystemList(pager.currentPage);
        });

        init();
        return vm;


    }]);