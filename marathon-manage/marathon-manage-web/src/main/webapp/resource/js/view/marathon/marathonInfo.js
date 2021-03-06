$(function () {
    $('#grid').bootstrapTable({
        url: path + '/marathon/query',         //请求后台的URL（*）
        method: 'post',                      //请求方式（*）
        toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        queryParams:queryParams,            //传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: false,                  //是否显示所有的列
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "marathonUuid",             //每一行的唯一标识，一般为主键列
        showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        columns: [
            {
                field: "marathonUuid", title: "序号", width: 40, align: 'center',
                formatter: function (value, row, index) {
                    return index + 1;
                }
            },
            {field: "marathonName", title: "赛事名称", width: 100, valign: 'middle'},
            {field: "marathonStarttimeStr", title: "开始时间", valign: 'middle'},
            {field: "marathonEndtimeStr", title: "结束时间", valign: 'middle'},
            {field: "marathonCreater", title: "创建人", valign: 'middle'},
            {field: "marathonCreatetimeStr", title: "创建时间", valign: 'middle'}
        ]
    });


    $('.form_datetime').each(function(){
        var getTimeId = $(this).find("input");
        setTimer = {
            pickerPosition : "bottom-left",
            autoclose : true,
            format : 'yyyy-mm-dd hh:ii',
            pickDate: true,
            pickTime: true,
            hourStep: 1,
            minView : 1,
            minuteStep: 5
        }
        getTimeId.datetimepicker(setTimer);
    });

    function queryParams(params) {
        var parameter= {
            limit: params.limit,
            offset: params.offset
        };
        return parameter;
    }

    $('#marathon-add-btn').click(function(){
       gridBtnAdd();
    });

    $('#saveMarathonBtn').click(function(){
        saveMarathon();
    });

});

function gridBtnAdd() {
    $('#modal-title').html("新建赛事");
    $('#marathon-name-input').val("");
    $('#marathon-address-input').val("");
    $('#create-marathon-modal').modal('show');
}

function saveMarathon(){
    var marathon={};
    marathon.marathonName=$.trim($("#marathon-name-input").val());
    marathon.marathonStarttimeStr= $.trim($("#marathon_startTime").val());
    marathon.marathonEndtimeStr=$.trim($("#marathon_endTime").val());
    marathon.marathonAddress=$.trim($("#marathon-address-input").val());

    $.ajax({
        url: path + '/marathon/add',
        method: 'post',
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(marathon),
        success: function (response) {
            if (!response.success) {
                bootbox.alert(response.message);
            } else {
                bootbox.alert("添加赛事成功！", function () {
                    $('#create-marathon-modal').modal('hide');
                    $("#grid").bootstrapTable('refresh');
                });
            }
        },
        error: function (response) {
            bootbox.alert("error");
        }
    });
}