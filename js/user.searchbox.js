/**
 * 
 * OA 用户查询控件
 * 
 * 引用
 *  <link rel="stylesheet" href="../../assets/css/chosen.min.css" />
 *  <script src="../../assets/js/chosen.jquery.min.js"></script>
 * 
 */
function UserBox(){
	
}

UserBox.prototype.keyword="keyword";

UserBox.prototype.adjustChosen=function(){
	 
	 setInterval(function(){
		 
		 $('.chosen-select').each(function() {
			 var $this = $(this);				 
			 if($this.parent().width<$this.next().width){
				 
				$this.next().css({'width': $this.parent().width()});
				console.log("adjust");
			 }
			
			
		});
		 
		 $(window).trigger('resize.chosen');
		 
	 },1500);
		 
  
}

UserBox.prototype.renderChosen=function(){
	if(!ace.vars['touch']) {
		$('.chosen-select').chosen({
			allow_single_deselect:true,
			search_contains:true,
			no_results_text:"查无数据！"
			}
		); 
		//resize the chosen on window resize

		$(window)
		.off('resize.chosen')
		.on('resize.chosen', function() {
			$('.chosen-select').each(function() {
				 var $this = $(this);				 
				 $this.next().css({'width': $this.parent().width()});
			})
		}).trigger('resize.chosen');
		//resize chosen on sidebar collapse/expand
		var that=this;
		$(document).on('settings.ace.chosen', function(e, event_name, event_val) {
			if(event_name != 'sidebar_collapsed') return;
			$('.chosen-select').each(function() {
				 var $this = $(this);				 
				 $this.next().css({'width': $this.parent().width()});
				
				
			});
		});	
		 
		 $(".chosen-search input").blur(function(){
			 var kw=$(this).val();
			 var chosenCtrl=$(this).parent().parent().parent().prev();
		    // that.searchUser(kw,chosenCtrl);
		 }); 
	 
	}

}

UserBox.prototype.searchUser=function(kw,ctrl){
	
	//if(!kw) return;
	var contentType = "application/json;charset=utf8";
	console.log(kw);
	var keyword=ctrl.data("keyword");
	if(!keyword){keyword="keyword";}
	 
	var obj={"pageNum":1,"pageSize":2500};
	obj[keyword]=kw;
	var that=this;
	var local=ctrl.data("local");
	if(local){
		if(ctrl.data("options")){
			
			var options=ctrl.data("options");
			var optionArray="";
			for(var ke in options){
				optionArray+="<option value='"+ke+"'>"+options[ke]+"</option>";
				
			}
			 ctrl.html(optionArray);
		}
		 ctrl.trigger("chosen:updated");
		 //$(".chosen-select").trigger("chosen:resize");
		 ctrl.chosen();
		 this.adjustChosen();
		 return;
	}
	var key=ctrl.data("key");
	var fields=ctrl.data("fields");
	var url=ctrl.data("url");
	var param=ctrl.data("param");
	var valueBreak=ctrl.data("vbreak");
	var nameBreak=ctrl.data("nbreak");
	if(param){
		var reqObj=(param);
		for(var k in reqObj){
			obj[k]=reqObj[k];
		}
	}
	
	//兼容旧的用户查询 
	if(!url){url="/oauser/user/info";}
	if(!key){ key="uid";}
	if(!fields){fields="uid,realName,uniqueUserID";}
	//默认分隔符
	if(!valueBreak){ valueBreak="/";}
	if(!nameBreak){  nameBreak="/";}
	
	var http = new HttpObj(obj,url,function(res){
		console.log(res);
		 var list=res.data.list;
		 var farr=fields.split(",");
		 /*变动*/
		var keyFarr=key.split(",");

		 var options='<option value=""></option>';
		 for(var i=0;i<list.length;i++){
			 var fnames=[];
			 /*变动*/
			 var keyFnames=[];

			 for(var k in farr){
				// if(list[i][farr[k]]){
					fnames.push(list[i][farr[k]]);
				 //}
				 
			 }
			 /*变动*/
			 for(var k in keyFarr){
			 	keyFnames.push(list[i][keyFarr[k]]);
			 }

			 options+='<option value="'+keyFnames.join(valueBreak)+'"> '+
			 fnames.join(nameBreak)+' '+'</option>';			
		 }
		 //以下要定位到具体的select 
		 ctrl.html(options);	
		 ctrl.data("list",list);
		 ctrl.trigger("chosen:updated");
		 //$(".chosen-select").trigger("chosen:resize");
		 ctrl.chosen();
		 that.adjustChosen();
		
	},contentType);
	
	http.post();
}
UserBox.prototype.init=function(){
    $(".chosen-select").html("");			
	this.renderChosen();
	var that=this;
	$('.chosen-select').each(function() {
		that.searchUser("",$(this));
	});
	
	 
}
var userbox=new UserBox();
 