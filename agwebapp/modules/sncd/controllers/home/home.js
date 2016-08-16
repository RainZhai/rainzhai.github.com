angular.module('sncd').controller('HomeCtrl', ['$scope', 'HomeService', '$state',
    function ($scope, HomeService, $state) {
        'use strict';

        var vm = $scope;
        var formData = $scope.formData = {},
            pager = vm.pager = {
                pageNumber: 1,
                totalCount: 0, //总条数
                pageSize: 5
            };

        /////////////functions///////////////

        // 获取当前n个月
        function getDates(n) {

            formData.dates = [];

            for (var i = n - 1; i >= 0; i--) {
                var preDate = new Date((new Date()).getFullYear(), (new Date()).getMonth() - i);
                formData.dates.push('' + preDate.getFullYear() + '年' + (preDate.getMonth() + 1) + '月');
            }

            return formData.dates;
        }

        function init() {

            $scope.selectedTab = 3;

            //获取质量趋势
            qualityTrend();
            var params = {
                pageNumber: $scope.pager.pageNumber,
                pageSize: $scope.pager.pageSize
            };
            //获取用户信息
            getCustomerInfo(params);
            //获取关注系统
            getSysBranchInfo(params);
            //获取我的动态
            getMyDynamicState();


        }


        function qualityTrend() {
            var params = {
                month: 6
            };

            HomeService.getTrend(params).then(function (result) {

                $scope.option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['千行bug率', '技术债务率', '注释率']
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: getDates(6)
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} %'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '千行bug率',
                            type: 'line',
                            data: result.permillageBugRates
                        },
                        {
                            name: '技术债务率',
                            type: 'line',
                            data: result.technicalDebtRate
                        },
                        {
                            name: '注释率',
                            type: 'line',
                            data: result.commentRate
                        }
                    ]
                };

            });
            var params = {
                severity: "BLOCKER"
            };
            //填充左图数据
            HomeService.getOption2(params).then(function (result) {
                var analysis = result.analysis;
                var arr = [];
                for (var i = 0, len = analysis.length; i < len; i++) {
                    arr.push(analysis[i].name);
                }
                $scope.option2.legend.data = arr;
                $scope.option2.series[0].data = result.analysis;
            });
            var params = {
                severity: "CRITICAL"
            };
            //填充右图数据
            HomeService.getOption3(params).then(function (result) {
                var analysis = result.analysis;
                var arr = [];
                var arrValue = [];
                for (var i = 0, len = analysis.length; i < len; i++) {
                    arr.push(analysis[i].name);
                    arrValue.push(analysis[i].value);
                }
                $scope.option3.legend.data = arr;
                $scope.option3.xAxis[0].data = arr;
                $scope.option3.series[0].data = arrValue;
            })
        }

        $scope.option2 = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                data: []
            },
            calculable: true,
            series: [
                {
                    name: '阻塞原因',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        },
                        emphasis: {
                            label: {
                                show: true,
                                position: 'center',
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        }
                    },
                    data: []
                }
            ]
        };

        $scope.option3 = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                data: []
            },
            //color: ['#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B'],
            calculable: true,
            grid: {
                borderWidth: 0,
                y: 80,
                y2: 60
            },
            xAxis: [
                {
                    type: 'category',
                    show: false,
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    show: false
                }
            ],
            series: [
                {
                    name: '严重原因',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                // build a color map as your need.
                                var colorList = [
                                     '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B'
                                ];
                                //return colorList[params.dataIndex]
                                return colorList[1]
                            },
                            label: {
                                show: true,
                                position: 'top',
                                formatter: '{b}\n{c}'
                            }
                        }
                    },
                    data: []
                }
            ]
        };

        function getCustomerInfo(params) {
            HomeService.getCustomerInfo(params).then(function (result) {
                $scope.userName = result.userName;
                $scope.role = result.role;
            });
        }

        function getSysBranchInfo(params) {
            HomeService.getSysBranchInfo(params).then(function (result) {
                $scope.pager.totalCount = result.totalDataCount;
                $scope.pager.pageNumber = result.pageNumber;
                $scope.$broadcast('sn.controls.pager:toPage', $scope.pager.pageNumber);
                $scope.branchList = result.datas;
            });
        }

        function getMyDynamicState(params) {

            var params = {
                pageNumber: 1,
                pageSize: 5
            };
            HomeService.getMyDynamicState(params).then(function (result) {
                /* for(var i = 0; i < result.length; i++){
                     var dt = new Date(result[i].time);
                     result[i].date = $filter('date')(dt, 'yyyy-MM-dd');
                     result[i].day = $filter('date')(dt, 'EEEE');
                     result[i].time = $filter('date')(dt, 'hh:mm:ss');
                 }*/
                $scope.dynamicState = result.datas;
            });
        };

        function qualityCompare(type, name) {

            var params = {
                type: type,
                name: name
            };
            HomeService.getQualityCompare(params).then(function (result) {
                $scope.codeQualityList = result.codeQualityList;
            });
        };
        ////////////////$scope functions/////////////////

        $scope.selectTab = function (tabNo) {
            $scope.selectedTab = tabNo;
            if (tabNo === 1) {
                qualityTrend();
            } else if (tabNo === 2) {
                formData.quaLevel = 0;
                var params = {
                    type: formData.quaLevel
                };
                HomeService.getQualityCompare(params).then(function (result) {
               	    formData.quaLevel = 1;
                    $scope.codeQualityList = result.codeQualityList;
                });
            } else {
                var params = {
                    severity: "BLOCKER"
                };
                //填充左图数据
                HomeService.getOption2(params).then(function (result) {
                    var analysis = result.analysis;
                    var arr = [];
                    for (var i = 0, len = analysis.length; i < len; i++) {
                        arr.push(analysis[i].name);
                    }
                    $scope.option2.legend.data = arr;
                    $scope.option2.series[0].data = result.analysis;
                });
                var params = {
                    severity: "CRITICAL"
                };
                //填充右图数据
                HomeService.getOption3(params).then(function (result) {
                    var analysis = result.analysis;
                    var arr = [];
                    var arrValue = [];
                    for (var i = 0, len = analysis.length; i < len; i++) {
                        arr.push(analysis[i].name);
                        arrValue.push(analysis[i].value);
                    }
                    $scope.option3.legend.data = arr;
                    $scope.option3.xAxis[0].data = arr;
                    $scope.option3.series[0].data = arrValue;
                })
            }
        };

        $scope.getDetail = function (cq) {


            if (formData.quaLevel == 1) {
                var params = {
                    type: formData.quaLevel,
                    name: cq.orgId
                };
                HomeService.getQualityCompare(params).then(function (result) {
                    $scope.codeQualityList = result.codeQualityList;;
                    formData.quaLevel = 2;
                });
            } else if (formData.quaLevel == 2) {
                var params = {
                    type: formData.quaLevel,
                    name: cq.techChief
                };
                HomeService.getQualityCompare(params).then(function (result) {
                    $scope.codeQualityList = result.codeQualityList;
                    formData.orgFirId = cq.orgId;
                    formData.quaLevel = 3;
                });
            }
        };

        $scope.backQuaComp = function () {
            if (formData.quaLevel == 3) {
                formData.quaLevel = 2;
                var params = {
                    type: 1,
                    name: formData.orgFirId
                };
                HomeService.getQualityCompare(params).then(function (result) {
                    $scope.codeQualityList = result.codeQualityList;
                });
            } else if (formData.quaLevel == 2) {
                formData.quaLevel = 1;
                var params = {
                    type: 0,
                    name: formData.orgFirId
                };
                HomeService.getQualityCompare(params).then(function (result) {
                    $scope.codeQualityList = result.codeQualityList;
                });
            }
        };



        $scope.dynamic = function (tabNo) {
            $state.go("Dynamic", {
                type: tabNo
            });
        };

        ///////////////////watches//////////////////////////////

        ///////////////////Events///////////////////

        vm.$on('sn.controls.pager:pageIndexChanged', function (evt, page) { // 分页操作
            evt.stopPropagation();
            var params = {
                pageNumber: page.pageIndex + 1,
                pageSize: $scope.pager.pageSize
            };
            getSysBranchInfo(params);
        });
        init();

        return vm;

    }
]);
