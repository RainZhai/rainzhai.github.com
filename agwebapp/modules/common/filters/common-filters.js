// vpn的状态tatus
angular.module('sncd').filter('vpnStatusFilter', function(){
  var typeEnum = {
	"0": "离线",
	"1": "在线"
  };
  return function(type){
    return typeEnum[type];
  }
});

//vm.ip.disk,fw-status,router-status
angular.module('sncd').filter('StatusFilter', function(){
    var typeEnum = {
        "ordered": "已订购",
        "timeout": "操作超时",
        "0": "未绑定",
        "1": "已绑定",
        "overdue": "欠费",
        "error": "新建失败",
        "unavailable": "未启用",
        "available": "可用",
        "enable": "启用",
        "disable": "禁用",
        "system": "系统",
        "loaded": "已加载",
        "assigned": "已分配",
        "stopped": "已关机",
        "deleted": "已删除",
        "running": "运行中",
        "creating": "新建中",
        "deleting": "删除中",
        "starting": "启动中",
        "stopping": "关机中",
        "restarting": "重启中",
        "assigning": "分配中",
        "removing": "移除中",
        "unbundling": "解绑中",
        "loading": "加载中",
        "unloading": "卸载中",
        "resetting": "重置中",
        "backuping": "备份中",
        "modifying": "修改中",
        "resizing": "更改大小中",
        "createimage": "制作映像中",
        "recovervolume": "制作硬盘中",
        "recovering": "备份恢复中",
        "closefailed": "关闭失败",
        "startfailed": "启动失败",
        "closed": "已关闭",
        "closing": "关闭中",
        "deploying": "发布中",
        "undepolyed": "未发布",
        "deployed": "已发布",
        "deployfailed": "发布失败",
        "deletefailed": "删除失败",
        "bindfailed": "绑定失败",
        "unboundfailed": "解绑失败",
        "unbound": "未绑定",
        "binding": "绑定中",
        "bound": "已绑定"

    };
    return function(type){
        return typeEnum[type];
    }
});