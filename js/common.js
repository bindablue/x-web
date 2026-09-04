/**
 常量
 192020
 **/

//var webapp="/PlanX";
var domain="https://dadadida.cn";
domain=document.location.protocol+"//"+window.location.host;

var pathName=window.document.location.pathname;
var webapp="/sys";
webapp=pathName.substring(0,pathName.substr(1).indexOf("/")+1);
console.log("webapp:"+webapp);
//var domain="http://localhost:8080";
var clvl=["default","info","warning","danger","success"];
/**
 时区
 **/
var datename=new Date();
var tz=(datename.getTimezoneOffset()/60);
if(tz<=0){
    var timefixed="+"+(-tz)+" hour";
}else{
    var timefixed="-"+(tz)+" hour";
}




function getFormJson(form) {
    var o = {};
    var a = $(form).serializeArray();
    $.each(a, function () {
           if (o[this.name] !== undefined) {
           if (!o[this.name].push) {
           o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
           } else {
           o[this.name] = this.value || '';
           }
           });
    return o;
}




//获取URL参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

/**判断是否app访问**/
function byApp(){
    //console.log("isApp:"+isApp)
    if(typeof isApp=="undefined"){
        return false;
    }
    return true;
}
/**判断是否是android访问**/
function byAndroid(){
    //console.log("isApp:"+isApp)
    if(typeof isAndroid=="undefined"){
        return false;
    }
    return true;
}

/**加载js**/
function getScriptTag(){
    
   var oScript=document.createElement("script");
    oScript.type = "text/javascript";
    return oScript;
}

function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    //alert(ua);
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

var lang;
function loadComScript(){
    var oScripts = document.getElementsByTagName('SCRIPT');
    var commonJS="";
    for(var i=0;i<oScripts.length;i++){
        if(typeof oScripts[i].src!="undefined"&&oScripts[i].src.indexOf("common.js")>-1){
            commonJS=oScripts[i].src;
            console.log(commonJS);
            break;
        }
    }
    
    
    
  
    var oScript=getScriptTag();
      if(byApp()){
         
        
        oScript.src=commonJS.replace("common.js","cordova.js");
        if(byAndroid()){
             oScript.src=commonJS.replace("common.js","acordova.js");
        }
        document.body.appendChild(oScript);
        
        
        oScript=getScriptTag();
        oScript.src=commonJS.replace("common.js","cordova_plugins.js");
        document.body.appendChild(oScript);
        
        oScript=getScriptTag();
        oScript.src=commonJS.replace("common.js","com_app.js");
        document.body.appendChild(oScript);

        
        
    }else{
        oScript.src=commonJS.replace("common.js","com_web.js");
        document.body.appendChild(oScript);
        
       
    }
    
    var atype=navigator.appName
    if (atype=="Netscape"){
        var lan = navigator.language
    }
    else{
        var lan = navigator.userLanguage
    }
    
    //alert(navigator.userLanguage+":"+navigator.language+":"+lan);
//取得浏览器语言的前两个字母
    lang = lan.substr(0,2);
    var metajs=getScriptTag();
   
    //alert(lang);
    if("zh"==lang){
        metajs.src=commonJS.replace("common.js","meta-zh.js");
        
    }else{
        metajs.src=commonJS.replace("common.js","meta.js");
        
    }
    
    document.body.appendChild(metajs);
    
    setTimeout(function(){
               /**动态加载js**/
                translate();;
               
               },500);
   
    
}

function generateUUID() {
  
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};

function localdatetime(delta){
    
    
       var format = "";
        var nTime = new Date();
        if(delta){
        nTime=new Date(nTime.getTime()+24*60*60*1000*delta);
        }
        format += nTime.getFullYear()+"-";
        format += (nTime.getMonth()+1)<10?"0"+(nTime.getMonth()+1):(nTime.getMonth()+1);
        format += "-";
        format += nTime.getDate()<10?"0"+(nTime.getDate()):(nTime.getDate());
        format += "T";
        format += nTime.getHours()<10?"0"+(nTime.getHours()):(nTime.getHours());
        format += ":";
        format += nTime.getMinutes()<10?"0"+(nTime.getMinutes()):(nTime.getMinutes());
        format += ":00";
    return format;
}


function translate(){
    //placeholder;
    for(var key in lanMap){
        if($(".PH-"+key).length>0){
            
            $(".PH-"+key).attr("placeholder",lanMap[key]);
        }
        
      if($(".LBL-"+key).length>0){
            $(".LBL-"+key).html(lanMap[key]);
      }
        
      
        
    }
     
    
    
    
   
    
    
}



/**判断是否需要登录访问**/
function needLogin(){
    
    
    if(!byApp()){
        if($(".navbar").length==0){
        //$("body").prepend('<nav class="navbar navbar-inverse" role="navigation"></nav>');
        }
       
        
    }
}


$(function(){
  
  
  setTimeout(function(){
	       
             /**动态加载js**/
             loadComScript();
             
    },400);
  /**100**/
  
  
  
  });

/**本网**/
function webGotoLocal(dir,page){
    if(byApp()){
        communicate({"op":"openlocal","Class":"WebDataEngine",
                    "page":page,
                    "dir":dir}
                    ,function(data){
                    
                    
                    });
    }else{
        
         window.location.href=webapp+"/"+dir+"/"+page;
    }
     
}

function showlogin(){
	if(byApp()){
		 communicate({"op":"showlogin","Class":"WebDataEngine",
             "url":""}
             ,function(data){
             
             
             });
		
	}
}


function showregist(){
    if(byApp()){
        communicate({"op":"showregister","Class":"WebDataEngine",
                    "url":""}
                    ,function(data){
                    
                    
                    });
        
    }
    
    
    
    
}

function safari(url){
    if(byApp()){
        communicate({"op":"safari","Class":"WebDataEngine",
                    "url":url}
                    ,function(data){
                    
                    
                    });
    }else{
        
        window.location.href=url;
    }
    
    
    
}

/**外网**/
function webGotoRemote(url){
    if(byApp()){
     communicate({"op":"openurl","Class":"WebDataEngine",
                "url":url}
                ,function(data){
                
                
                });
    }else{
        
        window.location.href=url;
    }
    
}

function dismiss(){
    
     if(byApp()){
         communicate({"op":"dismiss","Class":"WebDataEngine"},function(data){
                     
                     
                     });
        
     }else{
           
           self.location=document.referrer;
          //history.back();
     }
    
}


function getToday(){
    
    var dt=new Date();
    var yy=dt.getFullYear();
    var mm=(dt.getMonth()+1<10)?("0"+(dt.getMonth()+1)):(dt.getMonth()+1);
    var dd=dt.getDate();
    var tdy=yy+""+mm+""+dd;
    //alert(tdy);
    return tdy;
}

function getToday8(delta){
    
    var dt=new Date();
    if(delta){
        dt=new Date(dt.getTime()+24*60*60*1000*delta);
    }
    var yy=dt.getFullYear();
    var mm=(dt.getMonth()+1<10)?("0"+(dt.getMonth()+1)):(dt.getMonth()+1);
    var dd=dt.getDate()<10?("0"+dt.getDate()):dt.getDate();
    var tdy=yy+"-"+mm+"-"+dd;
    //alert(tdy);
    return tdy;
}
function formatDate8(dt){
    
    var yy=dt.getFullYear();
    var mm=(dt.getMonth()+1<10)?("0"+(dt.getMonth()+1)):(dt.getMonth()+1);
    var dd=dt.getDate()<10?("0"+dt.getDate()):dt.getDate();
    var tdy=yy+"-"+mm+"-"+dd;
    return tdy;
}
function addDays(date,delta){
    var vdate=date.replace(/-/g,"/");
    var oDate=new Date(vdate);
     var dt=new Date(oDate.getTime()+24*60*60*1000*delta);
    return formatDate8(dt);
    
}
function webback(){
    
    window.history.go(-1);
}

var req=0;
var res=0;
function showLoading(){
    
    if( req==res){
        $(".loading").hide();
    }else{
        $(".loading").show();
    }
}
function isArray(o){
	return Object.prototype.toString.call(o)=='[object Array]';
	}
function toast(mess,msec){
	if(!msec){
		msec=1500;
	}
	var str='<div class="mess alert alert-danger"   style="top:20%;position:fixed;padding:20px;text-align:center;left:50%;width:600px;margin-left:-300px;"><span></span></div>';
	$("body").append(str);
	$(".mess").fadeIn().find("span").html(mess);
	setTimeout(function(){$('.mess').fadeOut();},msec);
	
}
var tips=[];
var tipInt=setInterval(function(){
	if(tips.length==0){return;}
	var tip=tips.shift();
	toast(tip);
},1700);

function postData(obj,url,callback,contentType,reqType){
    if($(".loading").length==0){
        $("body").append('<div class="loading"><span></span><span></span><span></span> <span></span><span></span></div>');
    }

    //默认为post
    var reqMethod = reqType?reqType:'POST'

    var data = reqMethod == 'POST'?JSON.stringify(obj):$.param(obj);
    
    req++;
    showLoading();
    $.ajax({
           type: reqMethod,
           url: webapp+url,
           data:data,
           dataType:"json",
           contentType:"application/json;charset=utf8",
	           success: function(data){
	           callback(data);
	           },
           complete:function(data){
           res++;
           showLoading();
           
           },
            
           error:function(data){
	           console.log("err!");
	           console.log(data);
	           if(data.status==401){
	        	   var obj=window.parent?window.parent:window;
	        	   if(goLogin){
	        		   goLogin();
	        	   }
	        	  // obj.location.href="/user/login.html";
	           }
	           var info=[];
	           for(var k in data.responseJSON){
	        	   info.push(data.responseJSON[k]);
	           }
	           tips.unshift("<b>服务暂不可用，请刷新重试!</b><br/><small> "+info.join(",")+"</small>");
           }
           });
}



var menus=[];
function renderTable(jsondata){
	var data=menus;
	$(".noshow").hide();
	for(var i=0;i<data.length;i++){
   		 console.log(data[i]["ico"]);
   		   
   			  if(data[i]["ico"].indexOf("btn")>-1){
   				 $("."+data[i]["ico"]).show();
   			  }			     
   	  }
	
}
function loadorgmenu(orgcode){
	orgcode=$("#orgcode").val();
	if(!orgcode){
		orgcode='';
	}
	
	 
	postData({"orgcode":orgcode},"/rest/user/getorgmenu",function(ret){
	   	 
	   	 console.log(ret);
	     menus=ret.menus;				   	  
	   	 renderTable();
	   	 console.log(ret);
	   	 
	   	  var orgs=ret.orgs;
	   	 $("#orgcode").html("");
	   	  for(var i=0;i<orgs.length;i++){
	   		  var selected="";
	   		  if(orgs[i].orgcode==orgcode){
	   			  selected="selected";
	   		  }
	   		  var option="<option "+selected+" value='"+orgs[i].orgcode+"'>"+orgs[i].orgname+"</option>"
	   		  $("#orgcode").append(option);
	   		  
	   	  }
	   	  
	   	 
	   	 
	    });
}

function isMobile(){
	
	if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
	  return true; 
	}
	return false;
}
/**
 * 获取对应名称的cookie
 * @param name cookie的名称
 * @returns {null} 不存在时，返回null
 */
var getCookie = function (name) {
  var arr;
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
};
