/*****
 * 
 * HttpObj
 * Ajax 数据通信
 * v1.1  20200616  新增showMsg方法，防止短时间内相同消息重复提示
 */
 
var globalTips=[];
var https=[];
setInterval(function(){
	//防止短时间内同样的消息重复提示
	//console.log("tick..");
	var msgs={};
 	var msg=globalTips.pop();
	while(msg){
		if(msgs.hasOwnProperty(msg)){
			msgs[msg]++;
		}else{
			msgs[msg]=1;
		}
		msg=globalTips.pop();
	}
 	//console.log(msgs);
	for(var k in msgs){		
		bootoast({message:k,type:"danger",position:"center",timeout:2});
	}
	
},900); 

function HttpObj(reqObj,url,callback,contentType){
	
	this.reqObj=reqObj;
	this.url=url;
	this.callback=callback;
	if(!contentType){
		contentType="application/json;charset=utf8";
	}
	this.contentType=contentType;
}

/**
 * 添加消息
 */
HttpObj.prototype.showMsg=function(msg){
	console.log("add "+msg)
	globalTips.push(msg);
	
}
HttpObj.prototype.errorHandler=function(){
	
	
};
HttpObj.prototype.completeHandler=function(){
	
	
};

HttpObj.prototype.post=function(){
	var that=this;
	$.ajax({
		type:'POST',
		url:that.url,
		data:JSON.stringify(that.reqObj),
		dataType:"json",
		contentType:that.contentType,
		success:function(res){
			that.callback(res);
		},error:function(req,sts,thr){
		   
			 that.errorHandler();
			 if(req.status==200){
				 return;
			 }
			 
			
			if(req.status==401){				 
			    that.goToLogin();
			    return;
			}
			
			var errmsg="服务不可用，请稍后再试!";
			if(req.responseJSON){
				var json=req.responseJSON;
				var info=[];
				for(var k in json){
					info.push(json[k]);
				}
				errmsg="<span class='text-left'><b>服务不可用，请稍后再试!</b></br><small> "
				 +info.join(",")+"<small> </span>";
				
			}else if(req.responseText){
				errmsg="服务不可用，请稍后再试!</br>"+req.responseText;
			}
			 
			//bootoast({message:errmsg,type:"danger",position:"top",timeout:2});
			that.showMsg(errmsg);
			
		},complete:function(req,sts){
			
			that.completeHandler();
			 
		}
		
	});
}
	
HttpObj.prototype.get=function(){
		var that=this;
		$.ajax({
			type:'GET',
			url:that.url,					 
			success:function(data){
				that.callback.call(this,data);
			},error:function(req,sts,thr){
				console.log(req);
				
				 that.errorHandler();
				 if(req.status==200){
					 return;
				 }
				
				if(req.status==401){					 
				    that.goToLogin(req);
				    return;
				}
				var errmsg="服务不可用，请稍后再试!";
				if(req.responseJSON){
					var json=req.responseJSON;
					var info=[];
					for(var k in json){
						info.push(json[k]);
					}
					errmsg="<span class='text-left'><b>服务不可用，请稍后再试!</b></br><small> "
					 +info.join(",")+"<small> </span>";
					
				}else if(req.responseText){
					errmsg="服务不可用，请稍后再试!</br>"+req.responseText;
				}
				 
				//bootoast({message:errmsg,type:"danger",position:"top",timeout:2});
				that.showMsg(errmsg);
			},complete:function(req,sts){
				
			}
			
		});
	
	
}
HttpObj.prototype.goToLogin=function(req){
	this.showMsg("请重新登录");
	//bootoast({message:"请重新登录",type:"danger",position:"top",timeout:2});
	
}
