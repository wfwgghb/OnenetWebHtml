	//手动制造30条数据
	var datas  = [];
	for(var i=0;i<30;i++){
		datas[i]={"berthid":"000001","age":"年龄："+i+"岁","sex":"男"+i}
	}
	
//	setInterval(
//		function(){
//  		getMsg();
//		}
//		,100000);
function getMsg(){		
	$.ajax(
        {
            type:"GET",
           url:"http://localhost:8081/userAjax/getAllSuperviseInformjson",
            contentType: 'application/json',
            dataType:"json",
            success:function(json){
                var data = json.msg;//要传入table的数据值
                //bootstrap-Table获取数据

       //finishingTask为table的id 
       $("#reportTable").bootstrapTable('load',data);
            },
            error:function(){
                alert("错误");
            }
        }
    )
	}
	$(function () {
		$('#reportTable').bootstrapTable({
			method: 'get',
			cache: false,
			url : '/bootstrap_table_demo',   // 请求url
			dataType : "json",  // 数据类型
			//height: 400,			
			striped: false,
			pagination: true,
			pageSize: 20,
			pageNumber:1,
			pageList: [10, 20, 50, 100, 200, 500],
			search: false,
			sortable: false,
			showToggle: false,
			showColumns: false,
			showRefresh: false,
			showExport: false,
			exportTypes: ['csv','txt','xml'],
			search: false,
			clickToSelect: true,
			sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*） 
			queryParams:queryParams,//请求服务器时所传的参数
			responseHandler:responseHandler,//请求数据成功后，渲染表格前的方法
			columns:
			[
				
				{field:"berthid",title:"泊位号",align:"center",valign:"middle",sortable:"true"},
				{field:"berthstat",title:"泊位状态",align:"center",valign:"middle",sortable:"true"},
				{field:"time",title:"时间",align:"center",valign:"middle",sortable:"true"},
				{field:"power",title:"电量",align:"center",valign:"middle",sortable:"true"},
				{field:"online",title:"在线状态",align:"center",valign:"middle",sortable:"true"},
				{field:"devid",title:"设备号",align:"center",valign:"middle",sortable:"true"},
				{field:"pairid",title:"配对号",align:"center",valign:"middle",sortable:"true"},
			],
			
		});										
	});	
	
function queryParams(params) {
    var param = {};
    $('#query-form').find('[name]').each(function () {
        var value = $(this).val();
        if (value != '') {
            param[$(this).attr('name')] = value;
        }
    });

    param['pageSize'] = params.limit;   //页面大小
    param['pageNumber'] = params.offset;   //页码

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
        data : result.rowDatas //行数据，前面的key要与之前设置的dataField的值一致.
    };
};

function customSearch(text) {
    $('#reportTable').bootstrapTable('refresh');//刷新Table，Bootstrap Table 会自动执行重新查询
}

function resetSearch() {
    $('#query-form').find('[name]').each(function () {
        $(this).val('');
    });
}