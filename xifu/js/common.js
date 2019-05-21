

// 账户设置
$(function(){

	$('.resetpw').click(function(){
		showAndHide(this,"xiugai");
	});
	// 修改密码 修改手机
	var showAndHide = function(obj,classname){
		var p = $(obj).parent().prev().prev().children("p");
		var ul = $(obj).parent().prev().prev().children("ul");
		console.log($(obj))
		if($(obj).hasClass("xiugai")){
			p.show();
			ul.hide();
			$(obj).removeClass("xiugai");
		}else{
			ul.show();
			p.hide();
			$(obj).addClass("xiugai");
		}
	}
	//修改用户名
	
	$(".resetusername").click(function(){
		$(".retusername").removeAttr("readonly")
	})

	$(".retusername").focusout(function(){
		
		$(".retusername").attr("readonly","readonly")
		
	})
	
	

})





















