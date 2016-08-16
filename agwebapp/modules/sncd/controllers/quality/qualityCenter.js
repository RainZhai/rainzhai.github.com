angular.module('sncd').controller('QualityCenterCtrl', ['$scope', 'QuaService', '$state',
    function ($scope, QuaService, $state) {

        var formData = $scope.formData = {};
        $scope.pager = {
            pageNumber: 1,
            totalCount: 0, //总条数
            pageSize: 10
        };


        /////////////functions///////////////
        function init() {
            queryQuaList($scope.pager.pageNumber);
        }


        // 查询质量列表
        function queryQuaList(pageNumber) {
            var params = {
                pageNumber: pageNumber,
                searchName: formData.queryParam
            };
            QuaService.getMyQuality(params).then(function (result) {
                $scope.pager.totalCount = result.totalDataCount;
                $scope.pager.pageNumber = result.pageNumber;
                $scope.$broadcast('sn.controls.pager:toPage', $scope.pager.pageNumber);
                $scope.quaList = result.datas;
            });
        }

        ////////////////$scope functions/////////////////

        $scope.search = function () {
            formData.queryParam.pageNumber = 1;
            queryQuaList(formData.queryParam.pageNumber);
        };


        ///////////////////watches//////////////////////////////

        ///////////////////Events///////////////////
        //分页
        $scope.$on('sn.controls.pager:pageIndexChanged', function (evt, page) { // 分页操作
            evt.stopPropagation();
            queryQuaList(page.pageIndex + 1);
        });


        init();

    }]);
