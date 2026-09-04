function communicate(json, succHandler) {
	$.ajax({
		type : 'POST',
		url : webapp + "/task/dataChannel",
		data : json,
		dataType : "text",
		success : function(data) {
			succHandler(data);
		}
	});

}

function asyncommunicate(json, succHandler) {
	$.ajax({
		type : 'POST',
		url : webapp + "/task/dataChannel",
		data : json,
		dataType : "text",
		success : function(data) {
			succHandler(data);
		}
	});
}

var obj = GetRequest();

if (isWeiXin()) {
	$(".btn-back").hide();
} else {
	$(".navbar").show();

}
if (typeof nologin == "undefined") {//如果没有定义nologin则需要登录

	var reqObj = {
		"op" : "loginSts"
	};

	if (obj) {
		if (obj["wxtoken"]) {
			reqObj["wxtoken"] = obj["wxtoken"];
		}
	}
	//alert(JSON.stringify(reqObj));
	postData(
			reqObj,
			'/user/userAccount/renewal',
			function(data) {
				if (data["code"] != "0000") {
					if (isWeiXin()) {
						var proxy = 0;
						if (GetRequest()["proxy"]) {
							proxy = GetRequest()["proxy"];
						}
						 
						request = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="
								+ wxappid
								+ "&redirect_uri=https%3a%2f%2f"+window.location.host+webapp+"/rest/shopuser/wxlogin?proxy="
								+ proxy
								+ "&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
						window.location.href = request;
					} else if (byApp()) {
						showlogin();
					} else {

						//alert("请登录");
						window.location.href = webapp
								+ "/html/user/login.html?fromurl="
								+ encodeURIComponent(window.location.href);
					}

				} else {
					if (typeof firstcall != "undefined") {
						setTimeout(firstcall, 100);

					}
				}
			});

} else {

	if (typeof firstcall != "undefined") {
		setTimeout(firstcall, 100);
	}
}

var menus = [];
function renderTable(jsondata) {
	var data = menus;
	$(".noshow").hide();
	for (var i = 0; i < data.length; i++) {
		console.log(data[i]["ico"]);

		if (data[i]["ico"].indexOf("btn") > -1) {
			$("." + data[i]["ico"]).show();
		}
	}

}
function loadorgmenu(orgcode) {
	orgcode = $("#orgcode").val();
	if (!orgcode) {
		orgcode = '';
	}

	postData({
		"orgcode" : orgcode
	}, "/rest/user/getorgmenu", function(ret) {

		console.log(ret);
		menus = ret.menus;
		renderTable();
		console.log(ret);

		var orgs = ret.orgs;
		$("#orgcode").html("");
		for (var i = 0; i < orgs.length; i++) {
			var selected = "";
			if (orgs[i].orgcode == orgcode) {
				selected = "selected";
			}
			var option = "<option " + selected + " value='" + orgs[i].orgcode
					+ "'>" + orgs[i].orgname + "</option>"
			$("#orgcode").append(option);

		}

	});
}
