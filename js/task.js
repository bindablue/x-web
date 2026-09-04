
var dom = document.getElementById("echart");
var myChart = echarts.init(dom);
var app = {};
app.title = '时间分配图';
var viewmode="";
function displayChart(mday){
    var obj={};//
    obj["O"]="Q";
    obj["Class"]="CommonDataEngine";
    obj["C"]="count(distinct mday)";
    obj["T"]=" event e left join task t on e.tid=t.tid ";
    obj["W"]=" 1=1 AND csts!='D' and tsts!='D'";
    if(viewmode){
        obj["W"]+=" AND mday>'"+viewmode+"'";
    }
    var logdays=0;
    
    asyncommunicate(obj,function(data){
                    var json=JSON.parse(data);
                    logdays=json[0]["count(distinct mday)"];
                    showCircle(logdays,mday);
                    });
    
}

function showCircle(logdays,mday){
    
    if(!mday){
        mday=" 1=1 ";
        if(viewmode){
         mday=" mday>'"+viewmode+"'";
        }
    }else{
        logdays=1;//
        mday=" mday= '"+mday+"'";
    }
    var obj={};
    obj["Class"]="CommonDataEngine";
    obj["O"]="Q";
    obj["C"]="ttype,sum(e.mspan)";
    obj["T"]="task t left join event e  on  t.tid=e.tid";
    obj["W"]=mday+" AND e.csts!='D'  and t.tsts!='D' AND 1=1 group by t.ttype";
    var types=tasktype.map(function(o){return o.v;});
    asyncommunicate(obj,function(data){
                    //alert(data);
                    
                    var json=JSON.parse(data);
                    var dd=[];
                    var logmin=0;
                    
                    
                    for(var i=0;i<json.length;i++){
                    var o={};
                    o.value=json[i]["sum(e.mspan)"];
                    o.name=types[json[i]["ttype"]-1];
                    dd.push(o);
                    logmin+=parseInt(o.value);
                    
                    }
                    var nolog=logdays*24*60-logmin;
                    //alert(nolog+":"+logmin);
                     $("#logmin").html(logmin);
                    var loghour=parseFloat(logmin/60).toFixed(2);
                    $("#loghour").html(loghour);
                    var loggedday=parseFloat(loghour/24).toFixed(2);
                    $("#logday").html(loggedday);
                    if(nolog>0){
                    var o={};
                    o.name=lanMap["NOLOG"];
                    o.value=nolog;
                    dd.push(o);
                    }
                    
                    var option = {
                    tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c}"+lanMap["MINUTE"]+" ({d}%)"
                    },
                    
                    series: [
                             
                             {
                             name:lanMap["TIMEDIST"]+'('+logdays+lanMap["DAYS"]+')',
                             type:'pie',
                             radius: ['35%', '55%'],
                             
                             data: dd
                             }
                             ]
                    };
                    
                    
                    myChart.setOption(option, true);
                    
                    //timeline();
                    
                    });
    
    
    
}
