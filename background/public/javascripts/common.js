/*
	文件路径不论是什么路径上传的文件，路径都变成了"C:\fakepath\"+文件名的形式，查询了下，这是ie下的安全设置问题。
	解决办法：
	1、工具 -> Internet选项 -> 安全 -> 自定义级别 -> 找到“其他”中的“将本地文件上载至服务器时包含本地目录路径”，选中“启用”即可。
	2.下面getPath(obj)方法：参数obj为input file对象，如：document.getElementById("upload")。
	*/
	//附带不用修改浏览器安全配置的javascript代码，兼容ie， firefox全系列
 //获取上传文件真实路径
	function getPath(obj)  
	{  
	  if(obj)  
	    {  
	    if (window.navigator.userAgent.indexOf("MSIE")>=1)  
	      {  
	        obj.select(); 
	        //obj.blur();
	        /**obj.blur();没有这行 document.selection.createRange().text会报错。
	        有这行当本页面作为子页面导致document.selection.createRange().text为空
	        window.top.document.body.focus();解决作为子页面，
	        在父亲页面上导致document.selection.createRange().text获取值为空的问题
	        */
	        window.top.document.body.focus();
	      return document.selection.createRange().text;  
	      }  
	 
	    else if(window.navigator.userAgent.indexOf("Firefox")>=1)  
	      {  
	      if(obj.files)  
	        {  
	 
	       // return obj.files.item(0).getAsDataURL();  火狐7.0getAsDataURL已经废弃 火狐出于浏览器安全问题（不容许脚本修改上传文件路径），已经废弃此方法。
	    	  return obj.files[0].name; //可以获取上传文件名称
	        }  
	      return obj.value;  
	      }  
	    return obj.value;  
	    }  
	} 
function Clock() {
	var date = new Date();
	this.year = date.getFullYear();
	this.month = date.getMonth() + 1;
	this.date = date.getDate();
	this.day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
	this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

	this.toString = function() {
		return "现在是:" + this.year + "年" + this.month + "月" + this.date + "日 " + this.hour + ":" + this.minute + ":" + this.second + " " + this.day; 
	};
	
	this.toSimpleDate = function() {
		return this.year + "-" + this.month + "-" + this.date;
	};
	
	this.toDetailDate = function() {
		return this.year + "-" + this.month + "-" + this.date + " " + this.hour + ":" + this.minute + ":" + this.second;
	};
	
	this.display = function(ele) {
		var clock = new Clock();
		ele.innerHTML = clock.toString();
		window.setTimeout(function() {clock.display(ele);}, 1000);
	};
}

function chagestyle(theme){
	createCookie('style',theme,365);
	var link = $('head').find('link:first');
	link.attr('href', doman+'/jquery-easyui-1.4/themes/'+theme+'/easyui.css');
	//alert($(window.frames["mainFrame"].document).find("head").html());
	var link2 = $(window.frames["mainFrame"].document).find("head").find('link:first');
	link2.attr('href', doman+'/jquery-easyui-1.4/themes/'+theme+'/easyui.css');
	//createCookie('style',theme,365);
}

/*$(document).ready(function() {
	$.ajaxSetup ({
		   cache: false //关闭AJAX相应的缓存
		});
	var c = readCookie('style');
	createCookie('style',c,365);
	var link = $('head').find('link:first');
	if(c=='null'){
		c='default';
	}
	link.attr('href', doman+'/jquery-easyui-1.4/themes/gray/easyui.css');
	/!*$('.styleswitch').click(function()
		{
			alert(this.getAttribute("rel"));
				chagestyle(this.getAttribute("rel"));
		});
	*!/
});*/

function switchStylestyle(styleName)
{
	$('link[rel=stylesheet][title]').each(function(i) 
	{
		this.disabled = true;
		if (this.getAttribute('title') == styleName) this.disabled = false;
	});
	
	$("iframe").contents().find('link[rel=stylesheet][title]').each(function(i) 
	{
		this.disabled = true;
		if (this.getAttribute('title') == styleName) this.disabled = false;
	});
	
	createCookie('style', styleName, 365);
}
//cookie
function createCookie(name,value,days)
{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0)
		{	return c.substring(nameEQ.length,c.length);
		
		}else{
			return "null";
		}
	}
	return null;
}
function eraseCookie(name)
{
	createCookie(name,"",-1);
}
// /cookie functions

//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return decodeURIComponent(r[2]);
	return null; //返回参数值
}