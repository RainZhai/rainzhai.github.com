angular.module('sncd').controller('VersionInProgressCtrl', ['$scope', 'VersionManageService', 'DialogService', '$state', '$stateParams',
    function ($scope, VersionManageService, DialogService, $state, $stateParams) {

        var vm = $scope,
            formData = vm.formData = {},
            pager = vm.pager = {
                pageNumber: 1,
                totalCount: 0, //总条数
                pageSize: 10
            };
        function init() {
            queryMyVersion($scope.pager.pageNumber);
        }


        // 查询版本列表
        function queryMyVersion(pageNumber) {

            var params = {
                type: $stateParams.type,
                pageNumber: pageNumber,
                sysId: $stateParams.sysId
            };

            VersionManageService.getMyVersion(params).then(function (result) {
                $scope.pager.totalCount = result.totalDataCount;
                $scope.pager.pageNumber = result.pageNumber;
                $scope.$broadcast('sn.controls.pager:toPage', $scope.pager.pageNumber);

                $scope.userId = result.userId;
                $scope.versList = result.datas;
                $scope.type = $stateParams.type;
                $scope.operationBoMap = result.operationBoMap;
                $scope.sysCnname = result.sysCnname;
                $scope.sysId = $stateParams.sysId;
            });
        }

        //Events
        //分页
        vm.$on('sn.controls.pager:pageIndexChanged', function (evt, page) {
            evt.stopPropagation();
            pager.pageNumber = page.pageIndex + 1;
            queryMyVersion(pager.pageNumber);
        });

        init();

        //封板
        $scope.freezen = function (version, index) {
            if (version.backMerged == '0') {
                alert("该分支尚未完成代码回合，无法封版。请联系技术负责人或分支技术经理，确认代码回合后，再进行封版操作。");
                return false;
            }

            if (confirm("封版后所有人员将不能往SVN服务器提交代码\u000d确定要封版吗？")) {
                var params = {
                    versionId: version.branchId,
                    sysId: version.sysId,
                    versionUrl: version.branchUrl
                };

                VersionManageService.freezenVersion(params).then(function (result) {
                    if (result.isFrezenSuc) {
                        alert("封版成功!");
                        $scope.versList[index].status = '060';
                    } else {
                        alert("封版失败，请联系cici(11010068)!");
                    }
                })
            }

        }


        //解版
        $scope.unFreezen = function (version) {

            VersionManageService.isBranchHasUnFinishRequest({ versionId: version.branchId }).then(function (result) {
                if (result.isHas) {
                    alert("此分支有尚未结束的生产发布单【" + result.requestNo + "】，请与申请人【" + result.userName + "】联系,生产单关闭前，不能解版!");
                    return false;
                } else {//跳转解版页面
                    $state.go("UnfreezenVersion", { versionId: version.branchId })
                }
            })
        }

        //废弃
        $scope.abandonVersion = function (versionId) {
            if (confirm("废弃后，系统将自动关闭该分支，收回分支写权限。确定废弃？")) {
                VersionManageService.abandonVersion({ versionId: versionId }).then(function (result) {
                    if (result.falg) {
                        alert("废弃成功!");
                        $state.go("VersionManage");
                    } else {
                        alert("分支废弃失败，请确认分支路径是否正确，如有疑问，请联系朱文静(11010068)!");
                    }
                })
            }
        }


        //合并分支
        $scope.mergeVersion = function (version) {
            if (confirm("请确认分支内容是否已成功发布到生产，\n如果没有，请成功发布生产后再合并分支。\n分支合并后，将被关闭，不能解版或继续使用，是否仍然需要合并分支?\n如继续执行“合并分支”则点击“确认”，反之则点击“取消”按钮")) {
                DialogService.modal({
                    key: "version.mergeVersionInfoDialog",
                    url: "partials/versionManage/merge-version-dialog.html"
                }, {
                        version: version,
                        type: "1"
                    });
            }
        }

        //合并分支详情
        $scope.mergeVersionInfo = function (version) {
            DialogService.modal({
                key: "version.mergeVersionInfoDialog",
                url: "partials/versionManage/merge-version-dialog.html"
            }, {
                    version: version,
                    type: "2"
                });
        }

        //打包地址
        $scope.packageUrl = function (version) {
            //判断是否配置打包
            VersionManageService.isPackageConfig({ sysId: version.sysId }).then(function (result) {
                if (result.jobName == '') {
                    alert("打包配置未完整，请完成配置！");
                    return false;
                } else {
                    DialogService.modal({
                        key: "version.packageUrlDialog",
                        url: "partials/versionManage/package-url-dialog.html"
                    }, {
                            version: version
                        });
                }

            })
        }

        //类型创建
        $scope.createSimilarVersion = function (sysId, versionId) {

            $state.go("CreateVersion", {
                id: sysId,
                versionId: versionId
            })
        };


        return vm;


    }]);