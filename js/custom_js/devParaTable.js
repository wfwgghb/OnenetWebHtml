	//手动制造30条数据
	var datas  = [];
	for(var i=0;i<30;i++){
		datas[i]={"name":"参数"+i+"号","age":"年龄："+i+"岁","sex":"男"+i}
	}
	
	$(function () {
		$('#reportTable').bootstrapTable({
			method: 'get',
			cache: false,
			//height: 400,
			striped: true,
			pagination: true,
			pageSize: 20,
			pageNumber:1,
			pageList: [10, 20, 50, 100, 200, 500],
			search: true,
			showColumns: true,
			showRefresh: false,
			showExport: false,
			exportTypes: ['csv','txt','xml'],
			search: true,
			clickToSelect: true,
			sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*） 
			columns: 
			[
				
				{field:"name",title:"测试姓名",align:"center",valign:"middle",sortable:"true"},
				{field:"age",title:"年龄",align:"center",valign:"middle",sortable:"true"},
				{field:"sex",title:"性别",align:"center",valign:"middle",sortable:"true"},
			],
			data:datas,
		});										
	});	