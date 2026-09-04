      
function Page(){}

Page.prototype.tmpl="<tr><td>#uname#</><td>#ctime#</td><td>#content#</td><td ><a href='detail.html?id=#id#'>详情</a></td>"+
      "</tr>";
 Page.prototype.pageSize=10;
 Page.prototype.ppSize=10;
 Page.prototype.cntreq="/rest/forum/myordercount"; 
 Page.prototype.listreq="/rest/forum/myorder";
 Page.prototype.qryForm="qryForm";
 Page.prototype.data=[];
 Page.prototype.header="";
 Page.prototype.totalPage=1;
 Page.prototype.append=false;//是否追加
 Page.prototype.idx=0;
 Page.prototype.loading=false;
 Page.prototype.afterLoaded=function(data){};
 Page.prototype.noData="没有更多";
    
         
 Page.prototype.backward=function(cur,tt){
        	if(cur-this.ppSize>0){
        		this.loadPage(cur-this.ppSize);
        	}
        };
 Page.prototype.forward=function(cur,tt){
        	if(cur+this.ppSize<tt+1){
        		this.loadPage(cur+this.ppSize);
        	}
        	
        };
   
 Page.prototype.loadRecords=function(cnt,page){
	       var that=this;
        	console.log("total records:"+cnt);
        	if(cnt==0){
        		$("#jiazai").html("<div class='item' style='color:#DDD;padding:10px;' id='nodata'>"+that.noData+"</div>");
        		// this.loading=false;
        	}
        	
        	
        	this.totalPage=cnt%this.pageSize==0?cnt/this.pageSize:parseInt(cnt/this.pageSize)+1;//总页数
        	$("#tt").html(this.totalPage);
        	$("#trec").html(cnt);
        	console.log("total Page:"+this.totalPage)
        	var pp="";
        	var cur="";
        	pp+="<li><a onclick='page.backward("+page+","+this.totalPage+")'>&laquo;</a></li>";
        	var start=parseInt(page/this.ppSize)*this.ppSize+1;
        	console.log("start:"+start);
        	for(var p=start;p<this.totalPage+1&&p<=start+9;p++){
        		if(page==p){
        			cur=" class='active'";
        		}else{
        			cur="";
        		}
        		pp+="<li "+cur+"><a onclick='page.loadPage("+p+")' >"+p+"</a></li>";
        		
        	}
        	pp+="<li><a onclick='page.forward("+page+","+this.totalPage+")'>&raquo;</a></li>";
        	 $("#pp").html(pp);
        	var offset=(page-1)*this.pageSize;
        	console.log("page:"+page);
        	console.log("offset:"+offset)
        	
        	var obj=getFormJson("#"+this.qryForm);
             obj["PageSize"]=this.pageSize;
             obj["Offset"]=offset;
            
             if(!this.append||page==1){
            	 //$("#response").html("<div   style='text-align:center;line-height:100px;margin:100px auto;border:1px #DDD solid;border-radius:50px;width:100px;height:100px;'>正在加载!</div>");
            }else{
            	
            }
             var that=this;
             
           
            postData(obj,this.listreq,function(data){
             $("#jiazai").html("");
            // this.loading=false;
           	 try{
                 console.log(data);
                 var list=data;//JSON.parse(data);
                
                 that.data=data;
                 var html=that.header;
                 
                 
                 var regex;
                 for (var i in list){
                     var one=that.tmpl;
                     if(that.recompose){
                         one=that.recompose(list[i],one,i);
                         }
                     for(var key in list[i]){
                         regex=new RegExp("#"+key+"#","gi");
                         
                         one=one.replace(regex,list[i][key]);
                         
                     }
                   html+=one;     
                 }
                 
                 
                 if(that.append&&that.idx>1){
                	 console.log("append data.");
                	 $("#response").append(html);
                	 console.log(that.idx+":"+page);
                	  
                 }else{
                	 console.log("replace data.");
                	 $("#response").html(html);
                	 
                 }
                 
                 that.afterLoaded(data);
                 
             }catch(ex){
                 
                 $("#response").html(ex);
             }
         } );
        	
        };
        
     
     Page.prototype.loadPage=function(idx){  
    	
    	 var that=this;
//    	 if(idx==this.idx){//加载速度快的话，会再刷新！
//    		 return;
//    	 }
    	 if(this.totalPage<idx&&idx>1){
    		 console.log("no more page.");
    		 return;
    	 }
    	  
    	  // this.loading=true;
    	    this.idx=idx;
            var obj=getFormJson("#"+this.qryForm); 
            $("#jiazai").html("<div style='margin:10px auto;padding:10px auto;'> <img width='40' height='40' src='../../img/loading.gif'/><div>");
            postData(obj,this.cntreq,function(data){
            	console.log(data);
            	 var list=data;//JSON.parse(data);
            	var cnt=list[0]["count(1)"];
            	that.loadRecords(cnt,idx);
            	
            });
        }
        
     Page.prototype.setPageSize=function(ps){
        	this.pageSize=ps;
        	this.loadPage(1);
      }
     
     var cnt = 0;
		function setScroll() {
			$(window)
					.scroll(
							function() {

								//console.log("scroll");
								var scrollh = $(document).height();
								var scrollTop = Math
										.max(document.documentElement.scrollTop
												|| document.body.scrollTop);
								cnt++;
								if (cnt % 2 != 0) {
									 console.log("return..");
									//return;
								}
								if ((scrollTop + $(window).height()) >= scrollh-250) {
									 

//									var inter = setTimeout(
//											function() {
                                                 
												if (page.idx>=page.totalPage) {

													//$("#jiazai").show();
													if ($("#nodata").length == 0||page.totalPage==0) {
														$("#jiazai").html("<div class='item' style='color:#DDD;padding:10px;' id='nodata'>"+page.noData+"</div>");
													}
													return;

												} else if(page.totalPage==0){
													//$("#jiazai").html("<div class='item' id='nodata'>暂无数据</div>");
													
												}else{
													//$("#jiazai").html("<img width='30' height='30' src='../../img/loading.gif'/>");
												}
												page.append = true;
												console.log("loadPage:"
														+ (page.idx + 1));
												page.loadPage(page.idx + 1);
//											}, 1000);
								}
							});
		}
    