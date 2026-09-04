function communicate(json,succHandler){
    
    
    window.plugins.DataChannel.communicate(function(data){
                                           if(succHandler){
                                           succHandler(data);
                                           }
                                           
                                           },function(data){
                                           alert(data);
                                           },JSON.stringify(json));
}

function asyncommunicate(json,succHandler){
    
    
    window.plugins.DataChannel.asyncommunicate(function(data){
                                               if(succHandler){
                                               succHandler(data);
                                               }
                                               
                                               },function(data){
                                               alert(data);
                                               },JSON.stringify(json));
}


setTimeout(function(){
           if(typeof firstcall!="undefined"){
           firstcall();
           }
           },100);

