Mock.mock('/angular/home/getTrend.htm', {
    errCode: '0',
    errMsg: '',
    data: {
        permillageBugRates: "11123",
        technicalDebtRate: "123",
        commentRate: "235"
        //totalLine: [120000, 150000, 170000, 21000, 160000, 221000, 270000],
        //repeatedLine: [10000, 13000, 21000, 23000, 17000, 25000, 28000],
        //tbdLine: [8300, 9800, 7000, 9200, 8000, 7800, 10000]
    }
});

Mock.mock("/angular/home/getMyDynamicState.htm", {
    errCode: '0',
    errMsg: '',
    data: {
        datas: [
            {
                operator: 'suning001',
                project: 'AAA',
                task: '修复缺陷分支',
                updateTime: 1440056486854
            },
            {
                operator: 'suning002',
                project: 'CCC',
                task: '修复缺陷分支',
                updateTime: 1442592000000
            }
        ]
    }
});
Mock.mock("/angular/home/getSysBranchInfo.htm", {
    errCode: '0',
    errMsg: '',
    data: {
        totalDataCount: 13,
        pageNumber: 0,
        datas: [
            {
                sysName: 's001',
                branchName: 'test',
                techManager: '修复缺4陷分支'
            }, {
                sysName: 's002',
                branchName: 'test2',
                techManager: '修复缺4陷分支'
            }
        ]
    }
});
Mock.mock("/angular/home/getCustomerInfo.htm", {
    errCode: '0',
    errMsg: '',
    data: {
        userName: "kakaka",
        role: 0
    }
});
Mock.mock("/angular/home/getQualityAnalysis.htm", {
    errCode: '0',
    errMsg: '',
    data: {
        analysis: [
            { value: 335, name: '项目1' },
            { value: 310, name: '项目2' },
            { value: 234, name: '项目3' },
            { value: 135, name: '项目4' },
            { value: 1548, name: '项目5' },
            { value: 345, name: '项目6' }
        ]
    }
});
Mock.mock("/angular/home/getQualityAnalysis2.htm", {
    errCode: '0',
    errMsg: '',
    data: {
        analysis: [
            { value: 335, name: '项目1' },
            { value: 310, name: '项目2' },
            { value: 234, name: '项目3' },
            { value: 135, name: '项目4' },
            { value: 1548, name: '项目5' },
            { value: 345, name: '项目6' }
        ]
    }
});
//系统管理
Mock.mock("/angular/system/mySystemPage.htm", {
    errCode: '0',
    errMsg: '',
    data: {
        totalDataCount: 11,
        pageNumber: 1,
        datas: [
            { sysId: "111", sysCnname: '项目1', environment: 'linux', processNum: 1, finishNum: 2, reposName: "codebase" },
            { sysId: "112", sysCnname: '项目2', environment: 'window', processNum: 1, finishNum: 2, reposName: "base1" },
            { sysId: "113", sysCnname: '项目3', environment: 'unix', processNum: 1, finishNum: 2, reposName: "poke" },
            { sysId: "114", sysCnname: '项目4', environment: 'linux', processNum: 1, finishNum: 2, reposName: "uii" },
            { sysId: "115", sysCnname: '项目5', environment: 'window', processNum: 1, finishNum: 2, reposName: "hubo" },
            { sysId: "116", sysCnname: '项目6', environment: 'linux', processNum: 1, finishNum: 2, reposName: "quki" },
            { sysId: "117", sysCnname: '项目7', environment: 'window', processNum: 1, finishNum: 2, reposName: "goo" },
            { sysId: "118", sysCnname: '项目8', environment: 'linux2', processNum: 1, finishNum: 2, reposName: "codebase" },
            { sysId: "119", sysCnname: '项目9', environment: 'linux1', processNum: 1, finishNum: 2, reposName: "codebase" },
            { sysId: "120", sysCnname: '项目10', environment: 'linux3', processNum: 1, finishNum: 2, reposName: "codebase" },
            { sysId: "121", sysCnname: '项目11', environment: 'linux1', processNum: 1, finishNum: 2, reposName: "codebase" }
        ]
    }
});

//更新系统信息
Mock.mock("/angular/system/updateSystem.htm", {
    errCode: '0',
    errMsg: '',
    data: {
        data: { sysId: "111", sysCnname: '项目1', environment: 'linux22', processNum: 1, finishNum: 2, reposName: "codebase" }
        
    }
});

//进行中版本列表
Mock.mock("/angular/version/myversion.htm", {
    errCode: '0',
    errMsg: '',
    data: {
        totalDataCount: 11,
        pageNumber: 1,
        userId: "21323",
        operationBoMap: "11",
        sysCnname: "GIH代码平台",
        datas: [
            { vername: '版本1', state: 1, qualityTrend: "1" },
            { vername: '版本2', state: 1, qualityTrend: "1" },
            { vername: '版本3', state: 1, qualityTrend: "1" }
        ]
    }
});
//添加版本
Mock.mock("/angular/version/createVersion.htm", {
    errCode: '0',
    errMsg: '',
    data: {
        data:
        { sysCnname: 'aa', processNum: 0, finishNum: 0, reposName: "aa" }
    }
});