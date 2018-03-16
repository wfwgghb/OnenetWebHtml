	//手动制造30条数据

	
	$(function () {
		$('#devhisTable').bootstrapTable({
			method: 'get',
			url : '/geohistorydata/findAll',
			cache: false,
			dataType : "json",  // 数据类型
			//height: 400,
			striped: true,
			pagination: true,
			pageSize: 20,
			pageNumber:1,
			pageList: [10, 20, 50, 100, 200, 500],
			search: false,
			showColumns: true,
			showRefresh: true,
			showExport: false,
			exportTypes: ['csv','txt','xml'],
			queryParams: queryParams,
			//responseHandler: responseHandler,
			clickToSelect: true,
			sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*） 
			//dataField: 'data', //后端 json 对应的表格数据 key
			columns: 
			[
				//{field:"id",title:"序号",align:"center",valign:"middle",sortable:"true"},
//				{field:"devpostion",title:"泊位号",align:"center",valign:"middle",sortable:"true"},
//				{field:"devarea",title:"区域号",align:"center",valign:"middle",sortable:"true"},
//				{field:"tcc",title:"停车场",align:"center",valign:"middle",sortable:"true"},
				{field:"devid",title:"设备号",align:"center",valign:"middle",sortable:"true"},
				{field:"initx",title:"初始x值",align:"center",valign:"middle",sortable:"true"},
				{field:"inity",title:"初始y值",align:"center",valign:"middle",sortable:"true"},
				{field:"initz",title:"初始z值",align:"center",valign:"middle",sortable:"true"},
				{field:"curx",title:"环境x值",align:"center",valign:"middle",sortable:"true"},
				{field:"cury",title:"环境y值",align:"center",valign:"middle",sortable:"true"},
				{field:"curz",title:"环境z值",align:"center",valign:"middle",sortable:"true"},
				{field:"carinfo",title:"泊位状态",align:"center",valign:"middle",sortable:"true"},
				{field:"rtc",title:"时间",align:"center",valign:"middle",sortable:"true"},
				{field:"pairid",title:"配对号",align:"center",valign:"middle",sortable:"true"},
			],
			
		});										
	});	
	
function queryParams(params) {
    var param = {};
    $('#query-form').find('[name]').each(function () {
        var value = $(this).val();
        console.log(value);
        if (value != '') {
        	console.log(value);
            param[$(this).attr('name')] = value;
        }
    });
 $('#datetimepicker1').find('[name]').each(function () {
        var value = $(this).val();
         
        if (value != '') {
        	console.log(value);
            param[$(this).attr('name')] = value;
        }
    });
     $('#datetimepicker2').find('[name]').each(function () {
        var value = $(this).val();
         
        if (value != '') {
        	console.log("the stoptime is :",value);
            param[$(this).attr('name')] = value;
        }
    });
    param['pageSize'] = params.limit;   //页面大小
    param['pageNumber'] = params.offset/params.limit +1;   //页码
    console.log(param);
    return param;
}

//请求成功方法
function responseHandler(result){
    var errcode = result.errcode;//在此做了错误代码的判断
    if(errcode != 0){
        alert("错误代码" + errcode);
        return;
    }
    //如果没有错误则返回数据，渲染表格
    return {
        total : result.dataLength, //总页数,前面的key必须为"total"
        rows : result.rowDatas //行数据，前面的key要与之前设置的dataField的值一致.
    };
};

function customSearch(text) {
    $('#devhisTable').bootstrapTable('refresh');//刷新Table，Bootstrap Table 会自动执行重新查询
}

function resetSearch() {
    $('#query-form').find('[name]').each(function () {
        $(this).val('');
    });
}