/**
 *
 * DIV :ID
 * #pfTpl 分页尾部
 * #editFieldTpl 编辑字段模板
 *  * #objHeader 表格头模板
 * #tbody 表格主体
 * #total 总数
 *
 * #frmObj 编辑表单
 * #modal-table 表单弹出框
 *
 */

function Table() {
    this.tableData = [];
}

Table.prototype.dealRow = function (row) {
    return row;
}
Table.prototype.columns = {};
Table.prototype.appended = false;
Table.prototype.noData="查无数据";
Table.prototype.noDataTips=true;
Table.prototype.firstLoaded=true;//渲染完加载数据
Table.prototype.loadObjs = function (page) {
    if (page < 1) page = 1;
    if (page > this.totalPage) {
        page = this.totalPage;
    }
    this.idx = page;
    var obj = {};
    this.pageNum = page;
    obj.pageNum = this.pageNum;
    obj.pageSize = this.pageSize;
    var query = util.getRequest();
    for (var key in query) {
        obj[key] = query[key];
    }
    var qfrm = util.getFormData("#frmQuery");
    for (var k in qfrm) {
        obj[k] = qfrm[k];
    }

    var that = this;

    var http = new HttpObj(obj, this.op["list"] + "/" + this.pageNum + "/" + this.pageSize,
        function (res) {
            console.log(res);
            if (res.msg) {
                bootoast({message: res.msg, type: "warning", position: "top", timeout: 2});

            }
            var list = res.data.list;
            if (!that.appended || page == 1) {
                $(that.config["tbody"]).html("");
            }

            if ((!list || list.length == 0)&&that.noDataTips) {
                bootoast({message: that.noData, type: "warning", position: "top", timeout: 2});
                if (that.afterLoaded) {
                    that.afterLoaded();
                }
                return;
            }
            $(that.config["total"]).html("共" + res.data.total + "条");
            that.tableData = list;

            var headerTpl = "";
            //放到columns
            for (var k = 0; k < that.displayFields.length; k++) {
                that.columns[that.displayFields[k]] = that.fieldsNames[k];
            }

            for (var k in that.columns) {
                headerTpl += "<th>" + that.columns[k] + "</th>";

            }
            headerTpl = $(that.config["objHeaderTpl"]).html().replace(
                "<th>#fieldsName</th>", headerTpl);
            if (!that.appended || page == 1) {
                $(that.config["objHeader"]).html(headerTpl);
            }


            for (var i = 0; i < list.length; i++) {
                var row = that.dealRow(list[i]);
                var tmpl = $("#rowTpl").html();
                var fields = "";
                for (var k in that.columns) {

                    if (row.hasOwnProperty(k)) {
                        fields += "<td>#" + k + "#</td>";
                    } else {
                        fields += "<td></td>";
                    }

                }
              
                tmpl = tmpl.replace("<td>#fields#</td>", fields);

           //多主键
                    if(that.objKey.indexOf(",")>-1){
	                  var keys=that.objKey.split(",");
                      var keyValues=[];
                       for(var k in keys){
	                      keyValues.push(row[keys[k]]);
                        }
 
                       var   regex = new RegExp("#objKey#", "gi");
                       tmpl = tmpl.replace(regex, keyValues.join(","));

                    }

                for (var key in row) {
                    var v = row[key];
                    var regex = new RegExp("#" + key + "#", "gi");
                    tmpl = tmpl.replace(regex, v);
          
                    if (key == that.objKey) {
                        regex = new RegExp("#objKey#", "gi");
                        tmpl = tmpl.replace(regex, v);
                    }
                  

                }


                $(that.config["tbody"]).append(tmpl);
            }

            if (that.afterLoaded) {
                that.afterLoaded();
            }
            var pages = res.data.navigatepageNums;
            var pagefooter = "";
            var pf = $(that.config["pfTpl"]).html();
            var active = "";
            var pre = '<li class="prev "><a  onclick="table.loadObjs(' + (that.pageNum - 10) + ')" > <i class="ace-icon fa fa-angle-double-left"></i></a></li>';
            var next = '<li class="next" ><a  onclick="table.loadObjs(' + (that.pageNum + 10) + ')"> <i class="ace-icon fa fa-angle-double-right"></i></a></li>';
            //首页
            pagefooter += "<li class='none' ><a  onclick='table.loadObjs(1)' ><i class='ace-icon fa fa-step-backward'></i></a></li>";

            pagefooter += pre;


            for (var i = 0; i < pages.length; i++) {
                if (that.pageNum == pages[i]) {
                    active = "active";
                } else {
                    active = "none";
                }
                pagefooter += "<li class='" + active + "' ><a  onclick='table.loadObjs(" + pages[i] + ")' >" + pages[i] + "</a></li>";
            }
            pagefooter += next;
            //最后一页

            pagefooter += "<li class='none' ><a  onclick='table.loadObjs(" + res.data.pages + ")' ><i class='ace-icon fa fa-step-forward'></i></a></li>";

            that.totalPage = res.data.pages;
            if (!that.appended) {
                $(that.config["pagefooter"]).html(pf.replace("<li>#pf#</li>", pagefooter));
            } else {
                $(that.config["pagefooter"]).hide();
            }
        }, this.contentType);

    http.post();

}
//表单提交前			
Table.prototype.preSaveObj = function (obj) {
    return true;
}
Table.prototype.saveObj = function () {

    var obj = util.getFormData(this.config["frmObj"]);
    var query = util.getRequest();
    for (var key in query) {
        obj[key] = query[key];
    }
    var contentType = "application/json;charset=utf8";
    var url = this.op["add"];
    //obj[this.objKey] &&
    if ( this.op["update"] && this.config.op == "update") {
        url = this.op["update"];
    }
    var ok = true;
    if (this.preSaveObj) {
        ok = this.preSaveObj(obj);
    }
    if (!ok) {
        return;
    }
    var that = this;
    var http = new HttpObj(obj, url, function (data) {
        console.log(data);
        bootoast({message: data.msg, type: "warning", position: "top", timeout: 2});

        if (data.code != '0000') {

        } else {
        	that.resetObj();
            that.loadObjs(that.pageNum);
            $(that.config["modaltable"]).modal("hide");
           
        }

    }, contentType);
    http.post();
};

Table.prototype.delObj = function (id) {
    var ok = confirm("确认删除");
    if (!ok) {
        return;
    }


    var obj = {};
    obj[this.objKey] = id;
    //多主键
    var args = arguments;
    var keys = this.objKey.split(",");
    for (var i = 0; i < keys.length; i++) {
        obj[keys[i]] = args[i];
    }

    var query = util.getRequest();
    for (var key in query) {
        obj[key] = query[key];
    }
    var contentType = "application/json;charset=utf8";
    var that = this;
    var http = new HttpObj(obj, this.op["del"], function (data) {
        console.log(data);
        bootoast({message: data.msg, type: "warning", position: "top", timeout: 2});

        that.loadObjs(that.pageNum);
    }, contentType);
    http.post();
}
Table.prototype.beginEdit = function (row) {

    return true;
}
Table.prototype.editObj = function (id) {
    if (!id) {
        $(this.config["modaltable"]).modal("show");
        //this.resetObj();
        this.config.op = "add";
    } else {
    	this.resetObj();
        this.config.op = "update";
    }

    var ids=id.split(",");
    var objKeys=this.objKey.split(",");
    for (var i = 0; i < this.tableData.length; i++) {
        var row = this.tableData[i];
        //多主键
        var matched=true;
        for(var idx in ids){
	       matched=matched&&row[objKeys[idx]]==ids[idx];
        }

        if(matched){
       // if (row[this.objKey] == id) {
            var ok = true;
            if (this.beginEdit) {
                ok = this.beginEdit(row);
            }
            if (!ok) {
                return;
            }
            $(this.config["modaltable"]).modal("show");
            for (var key in row) {

                for (var k in this.editFields) {
                    if (key == k) {
                        $(this.config["frmObj"] + " " + this.editFields[k]["input"] + "[name='" + key + "'] ").val(
                            row[key]);
                    }

                }
            }

            if (this.afterEdit) {
                this.afterEdit(row);
            }

            break;
        }
    }


}

Table.prototype.resetObj = function () {
    $(this.config["frmObj"])[0].reset();
}


Table.prototype.resetQuery = function () {
    $(this.config["frmQuery"])[0].reset();
}
Table.prototype.initForm = function () {
    var form = "";

    for (var key in this.editFields) {
        var obj = this.editFields[key];
        var tpl = $(this.config["editFieldTpl"]).html();
        var one = tpl;
        var regex = new RegExp("#" + key + "#", "gi");
        one = one.replace(regex, key);
        for (var k in obj) {
            var regex = new RegExp("#" + k + "#", "gi");
            var v = obj[k];
            one = one.replace(regex, v);

        }
        //拼组件
        var options = obj["options"];
        var opt = "";
        if (options) {
            for (var k in options) {

                opt += "<option value='" + k + "'>" + options[k] + "</option>";

            }
        }
        var clazz = "";
        if (obj["class"]) {
            clazz = "class='" + obj["class"] + "'";
        }
        var component = '<div class="col-sm-9 ">';
        component += "<" + obj["input"] + "  placeholder='" + obj["placeholder"] + "' " + clazz + "  " + obj["attr"] + " name='" + key + "'  class='col-xs-10 col-sm-8' >" + opt + "</" + obj["input"] + ">";
        component += "</div>";
        one = one.replace("#component#", component);
        form += one;

    }
    $(this.config["frmObj"]).html(form);


    this.initControl();
    if (this.after) {
        this.after();
    }
    //
}

Table.prototype.initControl = function () {

    if (typeof userbox != "undefined") {
        userbox.init();
    }

    if ($(".datatime").length > 0) {

        $(".datetime").datetimepicker({
            locale: moment.locale('zh-cn'),
            format: "YYYY-MM-DD HH:mm:ss"


        });
    }

    if ($(".timepicker").length > 0) {

        $(".timepicker").timepicker({
            minuteStep: 1,
            showSeconds: false,
            showMeridian: false,
            icons: {
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down'
            }

        }).on('focus', function () {
            $(this).timepicker('showWidget');
        });
    }


}

Table.prototype.renderQuery = function () {

    var form = "";

    for (var key in this.queryFields) {
        var obj = this.queryFields[key];
        var tpl = $(this.config["editFieldTpl"]).html();
        var one = tpl;
        var regex = new RegExp("#" + key + "#", "gi");
        one = one.replace(regex, key);
        for (var k in obj) {
            var regex = new RegExp("#" + k + "#", "gi");
            var v = obj[k];
            one = one.replace(regex, v);

        }
        //拼组件
        var options = obj["options"];
        var opt = "";
        if (options) {
            for (var k in options) {

                opt += "<option value='" + k + "'>" + options[k] + "</option>";

            }
        }
        var clazz = "";
        if (obj["class"]) {
            clazz = "class='" + obj["class"] + "'";
        }
        var pclazz="";
		if(obj["pclass"]){
			pclazz= obj["pclass"] ;
		}
		var component='<div class="col-sm-9   ">';
        component += "<" + obj["input"] + "  placeholder='" + obj["placeholder"] + "' " + clazz + "  " + obj["attr"] + " name='" + key + "'  class='col-xs-10 col-sm-8' >" + opt + "</" + obj["input"] + ">";
        component += "</div>";
        one=one.replace("#pclass#",pclazz);
        one = one.replace("#component#", component);
        form += one;

    }
    if (form) {
        $(this.config["frmQuery"]).html(form);
    }

 
};


Table.prototype.init = function () {
    this.renderQuery();
    this.initForm();
    if(this.firstLoaded){
    	this.loadObjs(this.pageNum);
    }
  

}

var table = new Table();
table.idx = 0;
table.objKey = "id";
table.displayFields = [];
table.fieldsNames = [];
table.queryFields = {};

table.editFields =
    {};

table.pageSize = 10;
table.pageNum = 1;
table.contentType = "application/json;charset=utf8";
table.tableData = [];
table.totalPage = 10;
table.op = {
    "list": "",
    "update": ""
};
table.config = {
    op: "add",//默认为添加
    editFieldTpl: "#editFieldTpl",// 编辑字段模板
    objHeader: "#objHeader",// 表格头ID
    objHeaderTpl: "#objHeaderTpl",//头模板
    rowTpl: "#rowTpl",//行
    tbody: "#tbody", //表格主体
    total: "#total", //总数
    frmObj: "#frmObj",// 编辑表单
    frmQuery: "#frmQuery",// 查询表单
    pagefooter: "#pagefooter",//分页
    pfTpl: "#pfTpl",//分页模板
    modaltable: "#modal-table"// 表单弹出框

};

//$(document).on('DOMSubtreeModified',$(table.config.frmObj),function(e){
//	//table.initControl();
//	console.log(e)
//});

var cnt = 0;

function setScroll() {
    $(window)
        .scroll(
            function () {


                var scrollh = $(document).height();
                var scrollTop = Math
                    .max(document.documentElement.scrollTop
                        || document.body.scrollTop);
                cnt++;
                if (cnt % 2 != 0) {
                    console.log("return..");
                    //return;
                }
                if ((scrollTop + $(window).height()) >= scrollh - 250) {

                    if (table.idx >= table.totalPage) {
                        if ($(".alert").length == 0) {
                            bootoast({message: "没有更多数据了", type: "warning", position: "top", timeout: 2});

                        }


                        return;

                    } else if (table.totalPage == 0) {
                        //$("#jiazai").html("<div class='item' id='nodata'> </div>");

                    } else {
                        //$("#jiazai").html("< img width='30' height='30' src='../../img/loading.gif'/>");
                    }
                    table.appended = true;
                    console.log("loadPage:"
                        + (table.idx + 1));
                    table.loadObjs(table.idx + 1);
//									}, 1000);
                }
            });
}	

			
		