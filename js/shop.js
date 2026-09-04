/**
 * 产品类型
 * 
 * @returns
 */
function loadProType(){
    	  var obj={};
    	
    	  postData(obj,"/rest/shop/alltype",function(data){
    		  $("#types").html("");
    		  console.log(data);
    		  $("#types").append("<li ><h5><a onclick=\"goHtml('productlist.html')\">全部</a><h5></li>")
    		  var tpl="<li ><h5><a onclick=\"goHtml('productlist.html?code=#code#')\">#name#</a><h5></li>";
    		  for(var i=0;i<data.length;i++){
    			  var one=tpl;
    			  for(var k in data[i]){
    				  one=one.replace("#"+k+"#",data[i][k]);
    				  
    			  }
    			  $("#types").append(one);
    			  
    		  }  
    		  
    	  });
    	  
      }
  /**
	 * 产品区域
	 * 
	 * @param code
	 * @returns
	 */  
function loadAreaProduct(code){
	
	var obj={acttype:code,PageSize:10,Offset:0};
	  
	  postData(obj,"/rest/shop/miniproduct",function(data){
		  
		  console.log(data);
		  var tpl="<div class='product col-xs-6 col-sm-4 col-md-3 col-lg-2' onclick='goHtml(\"prodetail.html?pid=#pid#\")'><div class='logo'><img style='width:100%;height:auto;' src='#logo#'/></div><div ><span class='pname'>#pname##skuname#</span><div><div class='price'>#full_price#</div></div>";
			
		  if(isWeiXin()||isMobile()){
			  var tpl="<div class='product col-xs-6 col-sm-4 col-md-3 col-lg-2' onclick='goHtml(\"mprodetail.html?pid=#pid#\")'><div class='logo'><img style='width:100%;height:auto;' src='#logo#'/></div><div ><span class='pname'>#pname##skuname#</span><div><div class='price'>#full_price#</div></div>";	
		  }
		  $("#"+code).html("");
		   for(var i=0;i<data.length;i++){
			  var one=tpl;
			  for(var k in data[i]){
				 
				  
				 var ext = [".jpg", ".jpeg", ".png", ".gif"];
			     var v=data[i][k];
				 if(k=="logo"){
				  logo=data[i][k];
			      if(logo.indexOf("webstore")==-1){
			        continue;
			      }
			       logo =logo.replace("webstore/temp", "img");
			      for (var j = 0; j < ext.length; j++) {
			         logo = logo.replace(ext[j], "_260x260" + ext[j]);
			      }
			      data[i][k]=logo;
			    }
				 if(k=="full_price"){
					v=parseFloat(v).toFixed(2)/100;
					data[i][k]="¥"+v;
					  
				 }
				 
				 one=one.replace("#"+k+"#",data[i][k]);
			  }
			  
			$("#"+code).append(one);
			
			 
			  
		  }
		$("#"+code).append("<div style='clear:both;width:100%'></div>");
		 $("#"+code).parent().append("<div style='clear:both;width:100%;height:10px;'></div>");
		  //
		 if(byApp()||isMobile()){
			 var width=document.body.clientWidth*0.5-30;
	      	  $(".product img").css("width",width+"px");
		 }
		  
          
	  });
	
	
}

/**
 * 首页基础信息
 * 
 * @returns
 */
function basicinfo(){
	   
	   var obj={};
	 
	  postData(obj,"/rest/shop/basicinfo",function(data){
		  $("#banners").html("");
		  console.log(data);
		  var banners=data.banner;
		  var link=data.banlinkweb; 
		 
		  for(var i=0;i<banners.length;i++){
		   if(banners[i].img){ 
			   var goto='';
			   if(link[i]){
				   goto="onclick='goHtml(\""+link[i]+"\")'";
			   }
			   var one='<div  class="swiper-slide " style="background-repeat:no-repeat;background-size:100% auto;" '+goto+'><img style="width:100%;height:auto;" src="'+banners[i].img+'" /></div>';
				$("#banners").append(one);
		   }
			
		  }
		  
		  
		  var areas=data.area;
		  $("#areas").html("");
		  for(var i=0;i<areas.length;i++){
			 var goto='';
			 if(areas[i].arealinkweb){
				 goto="onclick='goHtml(\""+areas[i].arealinkweb+"\")'";
			 }
			  var one='<div class="area-area" '+goto+'> <div class="areaname"><h3>'
				  +areas[i].areaname+
				  '</h3></div><div   class="area" style="background-repeat:no-repeat;background-size:100% auto;"><img style="width:100%;height:auto;"  src="'+areas[i].areaimg+'"/></div><div  id="'+areas[i].areacode+'" class="area-list"></div></div>';
			 $("#areas").append(one);
			loadAreaProduct(areas[i].areacode);
		  }
		  
		
		  
		  
		 var swiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: 2500,
          autoplayDisableOnInteraction: false
          });
	  });
	   
	  
	   
}

setTimeout(function(){
	if(byApp()){$(".menu").hide();}else{
		$(".menu").show();
	}
},200);

var uid=0;
setTimeout(function(){queryUserInfo();},1000);
function queryUserInfo(){
	
	queryUserStatus(function(data){
		  uid=data["UID"];
		  $(".menu ul [href='html/user/login.html']").html("欢迎！"+data["UNAME"]+"【"+data["UID"]+"】");
		  $(".menu ul [href='html/user/login.html']").attr("href","#");
		  $("#btngrp").show();
		
	},function(data){
		$("#logintip").html("下单需要登录或微信扫二维码直接购买～");
		  setTimeout(function(
				  
		  ){if(byApp()){
			  $("#logintip").html('<a onclick=\'$("#loginModal").modal("show");\'>请登录购买</a>');
				
		  }},1000);
		  
		 
		  $(".menu ul [href='#']").html("登录");
		  $(".menu ul [href='#']").attr("href","html/user/login.html");
		
	});
}


if(byApp()){$(".menu").hide();}
setInterval(function(){
	queryUserInfo();
	}
,60000);
function queryUserStatus(logFunc,nologFunc){
	
	 
  postData({},"/rest/shopuser/status",function(data){
	  
	  console.log("user status");
	  console.log(data);
	  if(data.CODE=="0000"){
		  if(logFunc){
			  logFunc(data);
		  }
		
	  }else{
		  if(nologFunc){
			  nologFunc(data);
		  }
	  }
	  
  });
}

$(function(){
	
	var navs=['<div id="nav" class="btn-group-vertical">',
   '<button type="button" class="btn btn-primary " onclick="goTop();">顶部</button>',
	'<button type="button" class="btn btn-default" onclick="toggle()"><span class="glyphicon glyphicon-chevron-up"></span></button>',

    
	'<button type="button" class="btn btn-danger btns" onclick="goHtml(\'shopindex.html\')">首页</button>',
	'<button type="button" class="btn btn-warning btns" onclick="goHtml(\'ownorder.html\')">订单</button>',
	 
'</div>'];
	navs=[ 
	'<div id="tab-bars" class="btn-group btn-group-justified" role="group" aria-label="...">',
	  '<div class="btn-group" role="group">',
	   ' <button type="button" class="btn btn-lg btn-primary" onclick="goHtml(\'shopindex.html\')">首页</button>',
	  '</div>',
	  '<div class="btn-group" role="group">',
	    '<button type="button" class="btn  btn-lg btn-warning" onclick="goHtml(\'ownorder.html\')">订单</button>',
	  '</div>',
	 ' <div class="btn-group" role="group">',
	   ' <button type="button" class="btn btn-lg btn-default" onclick="goTop();"><span class="glyphicon glyphicon-chevron-up"></span></button>',
	 ' </div>',
	'</div>',
	]
	 
	// $("body").append(navs.join(""));
	
	firstcall();
	
	if(GetRequest()["from"]=="app"){
		
		 
	}else{
		$(".menu").show();
	}



});



var proxy=0;

// 微信公众号配置
function configwx(title, imgUrl, desc) {
 
	if(!isWeiXin()){
		return;
	}
	postData({
		"wxappid" : wxappid,
		"requrl" : window.location.href
	 
	}, "/rest/wechat/wxconfig", function(data) {
		
        var request=window.location.href;
        if(data.appId){
    		wxappid=data.appId;
    	}
        if(data.UUID){// 已登录
        	if(request.indexOf("?")==-1){
        		request+="?proxy="+data.UUID;
        	}else{
        		
        		request+="&proxy="+data.UUID;
        	}
   
        }else{// 未登录
        	var proxy=0;
        	if(GetRequest()["proxy"]){
        		proxy=GetRequest()["proxy"];
        	}
        	
        	request="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+wxappid+"&redirect_uri=https%3a%2f%2f"+window.location.host+webapp+"/rest/shopuser/wxlogin?proxy="+proxy+"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
	    	window.location.href=request;
        }

		wx.config({
			debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId : wxappid, // 必填，公众号的唯一标识
			timestamp : data.timestamp, // 必填，生成签名的时间戳
			nonceStr : data.nonceStr, // 必填，生成签名的随机串
			signature : data.signature,// 必填，签名，见附录1
			jsApiList : [ "onMenuShareTimeline",
			              "onMenuShareAppMessage",
					      "chooseWXPay" ]
		// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});// end config

		wx.error(function(res) {
			console.log(JSON.stringify(res));
		});

		wx.ready(function() {

			wx.onMenuShareTimeline({
				title : title, // 分享标题
				link : request,// , // 分享链接
				imgUrl : imgUrl,
				type : 'link',
				success : function() {
					// 用户确认分享后执行的回调函数
					// alert("分享成功");
				},
				cancel : function() {
					console.log(request)
					// 用户取消分享后执行的回调函数
					// alert("分享取消");
				},
				fail : function(res) {
					// alert("分享失败，请重新尝试");
					console.log(request)
				}
			});

			wx.onMenuShareAppMessage({
				title : title, // 分享标题
				link : request,// // 分享链接
				imgUrl : imgUrl,
				desc : desc, // 分享描述
				type : 'link', // 分享类型,music、video或link，不填默认为link
				// dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success : function() {
					console.log(request);
					// 用户确认分享后执行的回调函数
				},
				cancel : function() {
					console.log(request);
					// 用户取消分享后执行的回调函数
				}
			});
		});// end ready

	});// end postData

}// end configwx

function goHtml(url){
	var dir=domain+webapp;
	if(url.indexOf("http")==-1){
		url=dir+"/"+url;
	}
	// alert(dir);
	webGotoRemote(url);
}
function wxrelogin(){
	var proxy=0;
	if(GetRequest()["proxy"]){
		proxy=GetRequest()["proxy"];
	}
	
	postData({
		"wxappid" : wxappid,
		"requrl" : window.location.href
	 
	}, "/rest/wechat/wxconfig", function(data) {
		 if(data.appId){
	    		wxappid=data.appId;
	    }
		var request="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+wxappid+"&redirect_uri=https%3a%2f%2f"+window.location.host+webapp+"/rest/shopuser/wxlogin?proxy="+proxy+"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
		window.location.href=request;
	}
	 );
	
}


/**
 * 下单
 * 
 * @param tp
 * @returns qty,pform
 */
function preorder(tp){// 参数交易类型
	var prolist=[];
	if(currproduct!=null){
		 currproduct.qty=$("#qty").val();
		 prolist.push(currproduct);
	}else{
		prolist=JSON.parse(sessionStorage.getItem("carts"));
	}
	if(prolist==null || prolist.length==0){
		alert("当前购物车为空！");
		return;
	}
	
	 
    var obj=getFormJson("#pform");
    console.log(obj);
    for(var k in obj){
    	if(k=="id"){
    		continue;
    	}
    	if(!obj[k]){
    		alert("收货信息，请填写完整！");
    		return;
    	}
    }
	obj["recName"]=obj["recname"];
	obj["wxappid"]=wxappid;// 以后从二级域名获取
	obj["proliststr"]=JSON.stringify(prolist);
	obj["msg"]=$("#msg").val();
	obj["url"]=window.location.href;
	 
	 
	obj["tradetype"]=tp;// 非微信内打开，采用二维码
	  
	 
	if(isWeiXin()&&tp!=="ALIWEB"){
		obj["tradetype"]="JSAPI";// 微信支付
		
	} 
    if(tp=="ALIWEB"&&byApp()){
    	obj["tradetype"]="ALIAPP";
    }
    if(tp=="NATIVE"&&byApp()){
    	obj["tradetype"]="MWEB";
    }
 
	
	 postData(obj,
				"/rest/shop/preorder",
				function(data){
			    	console.log(data);
			    	if(data.ok){
			    		if(currproduct==null){sessionStorage.removeItem("carts"); showCart();}
			    		
			    		if(tp=="ALIWEB"){
			    			
			    			if(byApp()){// 手机app
			    				var obj=data;
			    			     obj["op"]="alipay";
			    			     obj["Class"]="WebDataEngine";
			    				 asyncommunicate(obj,function(data){
			    					 console.log(data);
			    					 
			    				 });
			    				
			    			}else{// 网页
			    				 $("body").prepend(data.ret);
			    			}
			    	    	// $("#eventModal").modal("show");
			    		}else{
			    			wxChoose(data);
			    		}
			    		
			    	}else if(data.CODE=="NOLOGIN"){
			    		var proxy=0;
			    		if(GetRequest()["proxy"]){
			    			proxy=GetRequest()["proxy"];
			    		}
			    		if(isWeiXin()){// 微信端
			             window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+wxappid+"&redirect_uri=https%3a%2f%2f"+window.location.host+webapp+"/rest/shopuser/wxlogin?proxy="+proxy+"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
			    		}else{
			    			
			    			alert("请先登录");
			    			
			    				showlogin();	    		
			    		}
			    	} else{
			    		alert(data.msg);
			    	}
		    	console.log(data);
			    	
			    	
			    }
			    );
	
}




function wxChoose(o){
	
	if(!isWeiXin()){
	    // alert(JSON.stringify(o));
	    if(o.qrcode){
	    	var img='<img src="https://dododido.cn/store/payqrcode/'+o.qrcode+'"></img>';
	    	$("#wxpaycode").html(img);
	    	
	    	if(byApp()){// 跳转到微信进行支付
	    		// 唤起微信
	    		safari(o.code_url);
	    	}else{
	    		$("#eventModal").modal("show");
	    		
	    	}
	    }
		return;
	}
	// 公众号支付
	wx.chooseWXPay({  
	    timestamp: o.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
	    nonceStr: o.nonce_str, // 随机串
	    package: "prepay_id="+o.prepayid, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
	    signType: "MD5",     
	    paySign: o.sign, // 微信签名
	    success: function (res) {  
	        // 支付成功后的回调函数
	    	// alert(JSON.stringify(res));
	        
	        // 调整到orderid
	        location.href="ownorder.html";
	      
	    },fail:function(res){
	    	 alert(JSON.stringify(res));
	    }
	}); 
	 }

 


