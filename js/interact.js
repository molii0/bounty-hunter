// hero, zone, text: 通过选择器获取页面中的元素。
// timing: 用于存储定时器的ID。
// pos, front, back, left, right: 用于控制角色移动的方向。
let hero=document.querySelector('.hero');
let zone=document.querySelector('.window');
let text=document.querySelector('.text');
let timing=null;
let pos=0,front=0,back=0,left=0,right=0;
var page_now=0,skip;
// 该函数用于判断是否需要停止角色的移动，当有交互对象、人物对话、转换场景或处于推理模式时返回 true。
function stop(){
	return (person!='none' || obj!='none' || trans!='none');
}// person是end的时候不能移动，再按一下变成none才能移动

// 键盘按下事件处理函数。根据不同的按键代码，设置角色的移动方向或触发特定的交互行为。
document.onkeydown=function(event){	
	if(event.keyCode==87&&!option_now) front=1;
	else if(event.keyCode==83&&!option_now) back=1;
	else if(event.keyCode==65&&!option_now) left=1;
	else if(event.keyCode==68&&!option_now) right=1;
	else if(event.keyCode==69&&!option_now){//对应E
		if(person!='none'){
			if(person!='end') dialog(person);
			else{
				person='none';
				text.style.display='none'; // 对话结束后关闭对话框
				$('.dialog_zone').css('display','none'); 
			}//在这里检测到end，再移除掉对话框，所以person是end的时候不能移动，再按一下变成none才能走
		} else if (obj!='none'){ // 这里照搬npc对话的结束逻辑
			if(obj!='end') interact(obj);
			else{
				obj='none';
				text.style.display='none'; // 对话结束后关闭对话框
				$('.dialog_zone').css('display','none'); 
			}
		}
		else{ //注意，person，trans，obj不为none时，会阻止移动，这一切必须在按下E之后触发，不然路过就被卡住了
			for(var i=0;i<object.length;i++){
				if(hotzone(hero.offsetLeft,hero.offsetTop,object[i])) obj=object[i][3];
			} // 检查是否靠近物品，如果靠近某个物品，就把这个物品的名字赋值给obj，这是原游戏没有的功能
			for(var i=0;i<npc.length;i++){
				if(hotzone(hero.offsetLeft,hero.offsetTop,npc[i])) person=npc[i][3]; 				
			} // 检查是否靠近NPC，如果靠近某个npc，就把这个npc的名字赋值给person，调用dialog进入对话
			for(var i=0;i<door.length;i++){
				if(hotzone(hero.offsetLeft,hero.offsetTop,door[i])) trans=door[i][3];
			} // 检查是否靠近门，如果靠近某个门，就把这个门的名字赋值给trans，调用transform换地图
			if(person!='none') dialog(person);
			else if(obj!='none') interact(obj);
			else if(trans!='none') transform(trans);
		}
	}
	// else if (event.keyCode == 70 && !option_now) {//对应f
	// 	if (map==0) {
	// 		map = 1;
	// 		page_now = 0;
	// 		// $(".board").css('animation-name','');
	// 		// $(".board").css('margin-left','0');
	// 		// $(".board").css('display','block');
	// 		// 显示图片
	// 		if (now_phase == 'shenyuan') {
	// 			$("#myImage").attr("src", "./img/lead/shenyuan.png").show().css("z-index", "9999");
	// 		}
	// 		else if (now_phase == 'yidianyuan') {
	// 			$("#myImage").attr("src", "./img/lead/yidianyuan.png").show().css("z-index", "9999");
	// 		}
	// 		else if (now_phase == 'dengta') {
	// 			$("#myImage").attr("src", "./img/lead/dengta.png").show().css("z-index", "9999");
	// 		}
	// 		else if (now_phase == 'guangchang') {
	// 			$("#myImage").attr("src", "./img/lead/guangchang.png").show().css("z-index", "9999");
	// 		}
	// 		else if (now_phase == 'neicheng') {
	// 			$("#myImage").attr("src", "./img/lead/neicheng.png").show().css("z-index", "9999");
	// 		}
	// 		else if (now_phase == 'home') {
	// 			$("#myImage").attr("src", "./img/lead/home.png").show().css("z-index", "9999");
	// 		}
	// 		else if (now_phase == 'gaodiyanjiusuo') {
	// 			$("#myImage").attr("src", "./img/lead/gaodiyanjiusuo.png").show().css("z-index", "9999");
	// 		}
	// 	}
	// 	else {
	// 		map = 0;
	// 		// $(".board").css('display','none');
	// 		// 隐藏图片
	// 		$("#myImage").hide();
	// 	}
	// }
	
	else if(event.keyCode==27){//对应esc
		if(!option_now){
			$('.option').css('display','block');
			option_now=1;
		}
		else{
			$('.option').css('display','none');
			option_now=0;
		}
	}
}

// 定时器处理角色移动每50毫秒检查一次移动方向，并根据方向调整角色的位置。
setInterval(function(){
	// 更新坐标HUD
	try{
		var hud = document.getElementById('coordHud');
		if(!hero) hero = document.querySelector('.hero');
		if(hud){
			var hx = (hero && typeof hero.offsetLeft === 'number') ? hero.offsetLeft : 0;
			var hy = (hero && typeof hero.offsetTop === 'number') ? hero.offsetTop : 0;
			hud.innerHTML = 'X: ' + hx + ', Y: ' + hy + ' WASD移动 E键互动 | phase: ' + (now_phase && now_phase.length ? now_phase : '-');
		}
	}catch(e){}
	if(stop()) front=back=left=right=0;
	if(front){
		if(timing==null){
			pos="-144px";
			hero.style.animationName='forward';
			timing=setInterval(function(){
				if(stop()){
					hero.style.backgroundPositionY=pos;
					hero.style.backgroundPositionX="-48px";
					hero.style.animationName="";
					clearInterval(timing);
				}
				var x=hero.offsetLeft,y=hero.offsetTop;
				var limit=check('forward',wallx,x,y);
				if(y-5>limit) hero.style.top=y-5+"px";
				else{
					hero.style.top=limit;
					clearInterval(timing);
					timing=null;
				}
			},30);
		}
	}
	else if(back){
		if(timing==null){
			pos="0px";
			hero.style.animationName='backward';
			timing=setInterval(function(){
				if(stop()){
					hero.style.backgroundPositionY=pos;
					hero.style.backgroundPositionX="-48px";
					hero.style.animationName="";
					clearInterval(timing);
				}
				var x=hero.offsetLeft,y=hero.offsetTop;
				var limit=check('backward',wallx,x,y);
				if(y+5<limit) hero.style.top=y+5+"px";
				else{
					hero.style.top=limit;
					clearInterval(timing);
					timing=null;
				}
			},30);
		}
	}
	else if(left){
		if(timing==null){
			pos="-48px";
			hero.style.animationName='turnleft';
			timing=setInterval(function(){
				if(stop()){
					hero.style.backgroundPositionY=pos;
					hero.style.backgroundPositionX="-48px";
					hero.style.animationName="";
					clearInterval(timing);
				}
				var x=hero.offsetLeft,y=hero.offsetTop;
				var limit=check('turnleft',wally,x,y);
				if(x-5>limit) hero.style.left=x-5+"px";
				else{
					hero.style.left=limit;
					clearInterval(timing);
					timing=null;
				}
			},30);
		}
	}
	else if(right){
		if(timing==null){
			pos="-96px";
			hero.style.animationName='turnright';
			timing=setInterval(function(){
				if(stop()){
					hero.style.backgroundPositionY=pos;
					hero.style.backgroundPositionX="-48px";
					hero.style.animationName="";
					clearInterval(timing);
				}
				var x=hero.offsetLeft,y=hero.offsetTop;
				var limit=check('turnright',wally,x,y);
				if(x+5<limit) hero.style.left=x+5+"px";
				else{
					hero.style.left=limit;
					clearInterval(timing);
					timing=null;
				}
			},30);
		}
	}
},10);
// 键盘松开事件处理,当按键松开时，停止角色的移动并清除定时器。
document.onkeyup=function(event){
	if((event.keyCode==87||event.keyCode==83||event.keyCode==65||event.keyCode==68)&&!option_now){
		if(event.keyCode==87&&front) front=0;
		else if(event.keyCode==83&&back) back=0;
		else if(event.keyCode==65&&left) left=0;
		else if(event.keyCode==68&&right) right=0;
		hero.style.backgroundPositionY=pos;
		hero.style.animationName="";
		hero.style.backgroundPositionX="-48px";
	}
	clearInterval(timing);
	timing=null;
}