$('#execute').click(
	function() {
		jQuery.ajax({
			url : '/back/querySql.htm',// 跳转到 action
			data : {
				sql : $('#sql').val()
			},
			type : 'post',
			cache : false,
			dataType : 'json',
			success : function(data) {
				if (data.success == 1) {
					if (data.result.tableFieldList && data.result.tableFieldList.length != 0) {
						var fieldContent = '';
						for (i = 0; i < data.result.tableFieldList.length; i++) {
							fieldContent = fieldContent + '<th>' + data.result.tableFieldList[i]
							+ '</th>';
						}
						$('#filed').html(fieldContent);
						var rowSetContent = '';
						for (i = 0; i < data.result.rowSet.length; i++) {
							rowSetContent = rowSetContent + '<tr>';
							for (j = 0; j < data.result.rowSet[i].length; j++) {
								rowSetContent = rowSetContent + '<td>' + data.result.rowSet[i][j]
								+ '</td>';
							}
							rowSetContent = rowSetContent + '</tr>';
						}
						$('#rowset').html(rowSetContent);
					} else {
						alert('执行成功');
					}
				} else {
					alert(data.errorMessage);
				}
			},
			error : function() {
				alert('执行失败');
			}
		});
});