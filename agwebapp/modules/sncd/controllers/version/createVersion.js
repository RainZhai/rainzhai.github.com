angular.module('sncd').controller('CreateVersionCtrl', ['$scope', 'VersionManageService', '$state', '$stateParams',
    function ($scope, VersionManageService, $state, $stateParams) {
        var sysId = $stateParams.id;
        $scope.students = [
            { Name: '小李', Id: '201401201', Grade: '计算机技术' },
            { Name: '李磊', Id: '201401202', Grade: '计算机技术' }
        ];
        $scope.add = function () {       //添加学生函数
            $scope.students.push({ Name: $scope.newName, Id: $scope.newId, Grade: $scope.newGrade });
            $scope.newName = '';
            $scope.newId = '';
            $scope.newGrade = '';

            var params = { sysId: sysId, sysCnname: '项目1', processNum: 0, finishNum: 0, reposName: "wsd" };
            //add version
            VersionManageService.createVersion(params).then(function (result) {
                $state.go("VersionInProgress", {
                    data: result.data
                });
            });
        };
    }]);
