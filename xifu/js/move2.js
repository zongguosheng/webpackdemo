
window.onload=function (){
//	var oDiv=document.getElementById('play');
	var oDiv=$(".play-top")[0];
	var oDiv1=$("#play-top1")[0];
	console.log($(".play-top"));
	
	
	
	var aLi=oDiv.getElementsByTagName('dl')[0].getElementsByTagName('dd');
				console.log(oDiv.getElementsByTagName('dl')[0].getElementsByTagName('dd'));
	
	var aUl=oDiv.getElementsByTagName('ol')[0];
	
	
	var aLi1=oDiv1.getElementsByTagName('dl')[0].getElementsByTagName('dd');

	var aUl1=oDiv1.getElementsByTagName('ol')[0];

	var now=0;
	var now1=0;
	
	for(var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		aLi[i].onclick=function()
		{
			now=this.index;
			tab();
		};
	}
	
	function tab(){
		for(var i=0;i<aLi.length;i++)
			  {
				 aLi[i].className=''; 
			  }
		aLi[now].className='active';
			
		startMove(aUl,{top:-302*now});
		
	}
	function next(){
		
		now++;
		if(now==aLi.length)
		{
		  now=0;
		}
	
		tab();
	}
	//***********
	for(var i=0;i<aLi1.length;i++){
		aLi1[i].index=i;
		aLi1[i].onclick=function()
		{
			now1=this.index;
			tab1();
		};
	}
	
	function tab1(){
		for(var i=0;i<aLi1.length;i++)
			  {
				 aLi1[i].className=''; 
			  }
		aLi1[now1].className='active';
			
		startMove(aUl1,{top:-302*now1});
		
	}
	function next1(){
		
		now1++;
		if(now1==aLi1.length)
		{
		  now1=0;
		}
	
		tab1();
	}
	
	timer=setInterval(next,600000);
	timer=setInterval(next1,600000);
	oDiv.onmousemove=function(){
		clearInterval(timer);
	}
	oDiv.onmouseout=function(){
		timer=setInterval(next,600000);
	}
	oDiv1.onmousemove=function(){
		clearInterval(timer);
	}
	oDiv1.onmouseout=function(){
		timer=setInterval(next1,600000);
	}
	
};


//=========

function getStyle(obj,name)
      {
		  if(obj.currentStyle)
		    {
				return obj.currentStyle[name]; //IE
			}
			else 
			{
				return getComputedStyle(obj,false)[name]; //火狐和Chrome
			}
	  }
	 
function startMove(obj,json,fnEnd)
{
	 
	 clearInterval(obj.timer);
	 
	 obj.timer=setInterval(function() {
	   var bstop=true;
	   for(var attr in json)
	   {
		 //var cur=parseInt(getStyle(obj,attr)); //取整数，取非数字（例如字母）前的整数
		 var cur=0
		 if (attr=='opacity') //判断是不是透明度？ 如果是则特殊处理一下。
		 {
			 cur=Math.round(parseFloat(getStyle(obj,attr))*100);
		 }
		 else
		 {
			 cur=parseInt(getStyle(obj,attr)); //取整数，取非数字（例如字母）前 
		 }
		 var speed=(json[attr]-cur)/10;
		 speed=speed>0?Math.ceil(speed):Math.floor(speed);
		 
		 if(cur!=json[attr])
		
		   bstop=false;
		 
		   
			if (attr=='opacity')
			{
			    obj.style.filter='alpha(opacity:'+(cur+speed)+')'; //cur+speed本身就是数字，不能加在''之间。
				obj.style.opacity=(cur+speed)/100;
			}
			else
			{
				obj.style[attr]=cur+speed+'px'; 
			}	 
	   }
	   
	  if(bstop)
	     {
		     clearInterval(obj.timer);
			 if(fnEnd) fnEnd();
	     }
	 },30)

}