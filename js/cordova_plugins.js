/****
 * 数据通道
 */
function DataChannel(){
	
}
if(cordova){
    DataChannel.prototype.communicate=function(successCallback,failureCallback,str){
        cordova.exec(successCallback, failureCallback, "DataChannel", "communicate", [str]);
        
    };
    
    DataChannel.prototype.asyncommunicate=function(successCallback,failureCallback,str){
        cordova.exec(successCallback, failureCallback, "DataChannel", "asyncommunicate", [str]);
        
    };
    /**
     * 加载对象
     */
    cordova.addConstructor(function() {
                           if(!window.plugins){
                           window.plugins = {};
                           }
                           console.log(".. constructor..");
                           window.plugins.DataChannel=new DataChannel();
                           });
}




 



window.onerror = function(err) {
    console.log('window.onerror: ' + err)
}

function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__dadadida__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
window.plugins={};


setupWebViewJavascriptBridge(function(bridge) {
                             DataChannel.prototype.communicate=function(successCallback,failureCallback,data){
                             bridge.callHandler('DataChannel', data, function(response) {
                                                console.log('JS got response', response)
                                                successCallback(response)
                                                })
                             };
                             
                             DataChannel.prototype.asyncommunicate=function(successCallback,failureCallback,data){
                             
                             bridge.callHandler('DataChannel', data, function(response) {
                                                console.log('JS got response', response)
                                                successCallback(response)
                                                })
                             
                             };
                             window.plugins.DataChannel=new DataChannel();
                             
                             //                             //调用后端
                             //                             bridge.callHandler('testObjcCallback', {'foo': 'bar'}, function(response) {
                             //                                                log('JS got response', response)
                             //                                                });
                             //
                             //                             //读取后端发送的消息
                             //                             bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {
                             //
                             //                                                    var responseData = { 'Javascript Says':'Right back atcha!' }
                             //                                                    log('JS responding with', responseData)
                             //                                                    responseCallback(responseData)
                             //                                                    })
                             
                             
                             
                             
                             
                             });
