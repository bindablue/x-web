
	function showCartNum(){
		var cartNum=0;
		 var cartstr=sessionStorage.getItem("carts");
		 if(cartstr==null){
			 sessionStorage.setItem("carts","[]");
			 $("#cartNum").html(0);
			 $("#totalAmt").html("￥0.00");
			 return;
		 } 
		 
			var carts=JSON.parse(sessionStorage.getItem("carts"));
			var totalAmt=0.0;
			for (var i=0;i<carts.length;i++){
				 
					
					cartNum+=carts[i]["qty"];
					var cc=parseFloat(carts[i]["full_price"])/100;
		            var amt=(cc*carts[i]["qty"]).toFixed(2);
		            totalAmt+=parseFloat(amt);
				
			}
			$("#cartNum").html(cartNum);
			$("#totalAmt").html("￥"+totalAmt.toFixed(2));
			
	}
	 function addToCart(pid){
		 var product=null;
		 for(var i=0;i<page.data.length;i++){
			 
			 if(pid==page.data[i]["pid"]){
			 
				 product=page.data[i];
			 }
		 }
		 
		 if(product==null){
			 $("#cartNum").html(0);
			 return;
		 }
		 
		 var cartstr=sessionStorage.getItem("carts");
		 if(cartstr==null){
			 sessionStorage.setItem("carts","[]");
			 
		 } 
		 
			var carts=JSON.parse(sessionStorage.getItem("carts"));
			var exist=false;
			for (var i=0;i<carts.length;i++){
				if(carts[i]["pid"]==pid){
					
					carts[i]["qty"]++;
					 
					exist=true;
				} 
				
			}
			if(!exist){
				product["img"]=product["logo"];
				product["qty"]=1;
				carts.push(product);
			}
			sessionStorage.setItem("carts",JSON.stringify(carts));
			 showCartNum();
			 
		 }
		 
		 function showCart(){
			 var  header="<tr><td></td><td colspan='2' > 您的购物车清单</td></tr>";
				
			 $("#cartlist").html(header);
			 $('#payModal').modal('show');
			 var carts=sessionStorage.getItem("carts");
			 if(carts==null){
				 showCartNum();
				 return;
			 }
			 var carts=JSON.parse(sessionStorage.getItem("carts"));
				var tpl="<tr ><td  ><img src='#logo#' style='width:50px;height:auto;'></td><td >#pname# #skuname# " 
					+
						 
				  "<br/> #full_price# <i class='glyphicon glyphicon-minus' onclick='decNum(#pid#)'></i>  #qty#  <i onclick='incNum(#pid#)' class='glyphicon glyphicon-plus'></i> ￥#amt#  "
						+"</td><td   onclick='rmCart(#pid#)'><i class='glyphicon glyphicon-remove'></i></td></tr>"
						;
			 
				var total=0;
			 var totalAmt=0.00;
				for(var i=0;i<carts.length;i++){
				 var one=tpl;
				
				  var cc=parseFloat(carts[i]["full_price"])/100;
	           	  var amt=(cc*carts[i]["qty"]).toFixed(2);
	           	  one=one.replace("#full_price#","￥"+cc.toFixed(2));
	           	  one=one.replace("#amt#",amt);
	           	  
	           	  total+=carts[i]["qty"];
	           	  totalAmt+=parseFloat(amt);
           	  
				 for(var k in carts[i]){
					var regex=new RegExp("#"+k+"#","gi");
					 
		            one=one.replace(regex,carts[i][k]);
		              
					
				 }
				 $("#cartlist").append(one);
				 
			 }
				
				var paybtn=[
					'<div id="btngrp" class="btn-group"    >',

					'<button class="btn   pull-center  "',

					'onclick="preorder(\'NATIVE\');"><img style="width:50px;height:50px;border-radius:15px;"src="img/wxpay.jpg" /></button>',

					'<button id="btn-ali" ',

					'	class="btn   pull-center  "',

					'	onclick="preorder(\'ALIWEB\');"><img style="width:50px;height:50px;border-radius:15px;"src="img/alipay.jpg" /> </button>',

					' </div>' ];
				
				$("#cartlist").append('<tr><td colspan="3"><input  name="msg" class="form-control" id="msg" maxlength="32" cols="64" style="width:100%;" placeholder="留言"> </td></tr>');
			 
				$("#cartlist").append("<tr><td></td> " +
					" "+
					"<td  ><span class='badge alert-success  '>"+(total)+"</span> <span class='badge alert-danger'>￥"+totalAmt.toFixed(2)+" </span> </td><td><img  onclick=\"preorder('NATIVE');\" style='width:50px;height:50px;border-radius:15px; ' src='img/wxpay.jpg' /> <img  onclick=\"preorder('ALIWEB');\" style='width:50px;height:50px;border-radius:15px; ' src='img/alipay.jpg' /></td></tr>");
			 showCartNum();
			 
		 }
		
	 function rmCart(pid){
		 $("#cartlist").html("");
		 var carts=sessionStorage.getItem("carts");
		 if(carts==null){
			 showCartNum();
			 return;
		 }
		 var carts=JSON.parse(sessionStorage.getItem("carts"));
		 
		 for(var i=0;i<carts.length;i++){
			 if(carts[i]["pid"]==pid){
				 carts.splice(i,1);
				 break;
			 }
		 }
		 console.log(carts);
		 sessionStorage.setItem("carts",JSON.stringify(carts));
		 showCart();
	 }
	 function decNum(pid){
		 var cartstr=sessionStorage.getItem("carts");
		 if(cartstr==null){
			 sessionStorage.setItem("carts","[]");
			 
		 } 
		 
			var carts=JSON.parse(sessionStorage.getItem("carts"));
			 
			for (var i=0;i<carts.length;i++){
				if(carts[i]["pid"]==pid){
					if(carts[i]["qty"]>1){
						carts[i]["qty"]-=1;
					}
					 break;
				} 
				
			}
			 sessionStorage.setItem("carts",JSON.stringify(carts));
			showCart();
	 }
	 function incNum(pid){
		 var cartstr=sessionStorage.getItem("carts");
		 if(cartstr==null){
			 sessionStorage.setItem("carts","[]");
			 
		 } 
		 
		 var carts=JSON.parse(sessionStorage.getItem("carts"));
		 
			for (var i=0;i<carts.length;i++){
				if(carts[i]["pid"]==pid){
					   
						carts[i]["qty"]+=1;
				 
					 break;
				} 
				
			}
			 sessionStorage.setItem("carts",JSON.stringify(carts));
			showCart();
	 }
	 
	 
	 
	 showCartNum();
	 
	 