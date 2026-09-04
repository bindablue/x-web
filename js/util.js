

function Util(){
	
	
}
Util.prototype.getRequest=function(){
	
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

Util.prototype.isJSON=function(str){
	
	if(typeof str == 'string'){
		try{
			
			var obj=JSON.parse(str);
			return true;
			
		}catch(e){
			console.log(e);
			return false;
		}
	}
	return false;
	
}
 
Util.prototype.getParam=function(paramname){
	
	var request=this.getRequest();
	return request[paramname];
	
}

Util.prototype.getFormData=function(form){
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
Util.prototype.isWeixin=function(){
	
	 var ua=window.navigator.userAgent.toLowerCase();
	 if(ua.match(/MicroMessenger/i) =='micromessenger'){
	    return true;
	  }
	  return false;

}

Util.prototype.isCmbApp=function(){
	return navigator.userAgent.indexOf("MPBank")>-1;
}
Util.prototype.isCmbOA=function(){
	return navigator.userAgent.indexOf("CMBMobileOA")>-1;
}
Util.prototype.isMobile=function(){
	
	return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
}

/**
 * 显示有操作权限的控件
 */
Util.prototype.showControls=function(){
	
 
	var menu=window["localStorage"]["menus"];
 
	if(!menu) return;
	var menus=JSON.parse(menu);
	var ctrls=menus.filter(function(m){ return m.mtype=="c";});
	for(var i=0;i<ctrls.length;i++){
		$("."+ctrls[i]["mcode"]).show();
 
		$("."+ctrls[i]["mcode"]).removeClass("hidden");
 
	}
}
var util=new Util();


