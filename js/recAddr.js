var recinfos=[];
function setAddr(id){
	for(var i=0;i<recinfos.length;i++){
		if(id==recinfos[i].id){
			for(var key in recinfos[i]){
				$("#"+key).val(recinfos[i][key]);
			}
			
			break;
		}
		
		
	}
	
	
	
}
function newRecInfo(){
			$('#id').val(0);
			//$('#addrarea').toggle();
			$('#pform')[0].reset();
			 $("#addarea").show();
			
		}

function loadRecInfo(){
    	   
    	   
    	   postData({uid:0},"/rest/shop/recinfos",function(data){
     		  
     		  console.log(data);
     		  recinfos=data;
     		  var options="";
     		  if(data.length==0){
     			  $("#addarea").show();
     		  }
     		  for(var i in data){
     			  options+="<option value='"+data[i]["id"]+"'>"
     			  +data[i]["recname"]+"("+data[i]["phone"]+")"
     			  +data[i]["state"]+data[i]["city"]
     			  +data[i]["district"]+data[i]["addr"]
     			  +"</option>";
     		  }
     		  $("#recinfos").html(options);
     		  $("#recinfos").trigger("change");
     	  });
       }
       
       function saveRecInfo(){
    	  var obj=getFormJson("#pform");
    	   postData(obj,"/rest/shop/saverecinfo",function(data){
    		   
    		   loadRecInfo();
    		   
    	   });
       }
       
       function removeRecInfo(){
    	   
    	   var obj=getFormJson("#pform");
    	   postData(obj,"/rest/shop/deleterecinfo",function(data){
    		   
    		   loadRecInfo();
    		   
    	   }); 
       }