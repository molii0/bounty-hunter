setInterval(function(){
	var hero=document.querySelector('.hero');
	for(var i=0;i<npc.length;i++){
		if(dis(hero.offsetLeft,hero.offsetTop,npc[i][0],npc[i][1])<96){
			if(hero.offsetTop<npc[i][1]) $('.hero').css('z-index','8');
			else $('.hero').css('z-index','10');
		}
	}
},50);

// var tim=setInterval(function(){
// 	if(now_phase=='shenyuan'&&dis(hero.offsetLeft,hero.offsetTop,765,425)<=200){
// 		person='self';
// 		dialog(person);
// 		clearInterval(tim);
// 	}
// },50);

// var tim0=setInterval(function(){
// 	if(now_phase=='home'&&self==13&&dis(hero.offsetLeft,hero.offsetTop,500,600)<=200){
// 		person='self';
// 		dialog(person);
// 		clearInterval(tim0);
// 	}
// },50);

// var tim1=setInterval(function(){
// 	if(now_phase=='shenyuan'&&self==20&&dis(hero.offsetLeft,hero.offsetTop,765,425)<=200){
// 		person='self';
// 		dialog(person);
// 		clearInterval(tim1);
// 	}
// },50);

// function first_meet_fight(){
// 	
// }



// 每100毫秒检测一次	if(firstmeetfight) return;
// 	var hero=document.querySelector('.hero');
// 	var tim=setInterval(function(){
// 		if(dis(hero.offsetLeft,hero.offsetTop,765,425)<=200){
// 			firstmeetfight=1;
// 			person='self';
// 			dialog(self);
// 			clearInterval(tim);
// 		}
// 	},50);
// }







// 以下用于播放cg， 

let cgTimeouts = []; // 存储所有CG相关的定时器ID

function clearCgTimeouts() {
    cgTimeouts.forEach(timerId => clearTimeout(timerId));
    cgTimeouts = []; // 清空数组
}

function skipCurrentCg(cgId) {
    clearCgTimeouts();

    // 隐藏所有CG相关的元素
    $('.background_board').css('display','none');
    $('.caption').css('display','none');
    $('.curtain').css('display','none');
    $('#skipCgButton').css('display','none'); // 隐藏跳过按钮

    // 根据当前CG的ID，直接执行其结束时的逻辑
    if (cgId === 0) {
        transform('home');
    }
}

function cg(id){
    // 显示跳过按钮
    $('#skipCgButton').css('display','block');

    // 为跳过按钮绑定点击事件
    $('#skipCgButton').off('click').on('click', function() {
        skipCurrentCg(id);
    });
	if(id==-1){ //示例cg，不实际播放
		// 第一阶段：初始化显示状态
		$('.background_board').css('display','none'); // 背景板隐藏
		$('.caption').css('display','none'); // 字幕隐藏
		$('.curtain').css('display','block'); // 幕布显示
		
		// 第二阶段：2秒后显示第一个文字效果
		cgTimeouts.push(setTimeout(function(){
			$('.caption').html('轰'); // 设置文字内容为"轰"
			$('.caption').fadeIn(1000); // 文字用1秒时间淡入显示
		},2000));

		// 第三阶段：4秒后隐藏文字
		cgTimeouts.push(setTimeout("$('.caption').fadeOut(500)",4000)); // 4秒后文字用0.5秒淡出
		
		// 第四阶段：5秒后显示CG图片
		cgTimeouts.push(setTimeout(function(){
			$('.background_board').css({
				'background-image': 'url("./img/cg/hedan.png")',
				'background-size': 'cover', // 使背景图片铺满窗口
				'background-position': 'center', // 使背景图片居中
				'background-repeat': 'no-repeat' // 防止背景图片重复
			});
			$('.background_board').fadeIn(1000); // 背景图用1秒淡入显示
			$('.caption').html(''); // 清空文字
			$('.caption').fadeIn(1000); // 文字区域淡入（此时为空）
		},5000)); // 延迟5秒执行
		 
		// 第五阶段：8秒后隐藏文字
		cgTimeouts.push(setTimeout("$('.caption').fadeOut(1000)",8000));// 8秒后文字区域用1秒淡出
		
		// 第六阶段：8.7秒后结束CG，进入游戏
		cgTimeouts.push(setTimeout(function(){
			afterhedan=1; // 设置游戏状态变量，表示已看过核心CG
			talkjudge0=2; // 设置与审判者对话的状态
			transform('shenyuan'); // 切换游戏场景到"深渊"
			judge++; // 审判者相关计数增加
			$('.curtain').css('display','none'); // 隐藏黑色幕布，显示游戏场景
            $('#skipCgButton').css('display','none'); // CG结束后隐藏按钮
            clearCgTimeouts(); // 清除所有定时器
		},8700));
	

	}
	
	else if(id==0) {//开场cg
		// 第一阶段：初始化显示状态
		$('.background_board').css('display','none'); // 背景板隐藏
		$('.caption').css('display','none'); // 字幕隐藏
		$('.curtain').css('display','block'); // 幕布显示

		// setTimeout是异步的，不阻塞其他代码执行
		// 如果想在在显示后4秒消失，应该在setTimeout写上开始时间+4000，而不是4000

		cgTimeouts.push(setTimeout(function(){
			$('.caption').html('杰恩是一个没有过去的人'); // 设置文字内容为"杰恩是一个没有过去的人" //_2_断句
			$('.caption').fadeIn(1000); // 文字用1秒时间淡入显示
		},1000));
		cgTimeouts.push(setTimeout("$('.caption').fadeOut(500)",5000)); // 4秒后文字用0.5秒淡出

		cgTimeouts.push(setTimeout(function(){
			$('.caption').html('在这个世界上，他没有家人，没有朋友，没有记忆'); // 设置文字内容为"在这个世界上，他没有家人，没有朋友，没有记忆"
			$('.caption').fadeIn(1000); // 文字用1秒时间淡入显示
		},7000));
		cgTimeouts.push(setTimeout("$('.caption').fadeOut(500)",11000)); // 4秒后文字用0.5秒淡出

		cgTimeouts.push(setTimeout(function(){
			$('.caption').html('直到某次机缘巧合成为赏金猎人，他漂泊无依的生活才有了一点方向……'); // 设置文字内容为"直到某次机缘巧合成为赏金猎人，他漂泊无依的生活才有了一点方向……"
			$('.caption').fadeIn(1000); // 文字用1秒时间淡入显示
		},13000));
		cgTimeouts.push(setTimeout("$('.caption').fadeOut(500)",17000)); // 4秒后文字用0.5秒淡出
		
		cgTimeouts.push(setTimeout(function(){
			transform('home');
            $('#skipCgButton').hide(); // CG结束后隐藏按钮
            clearCgTimeouts(); // 清除所有定时器
		},19000));
	} 
}