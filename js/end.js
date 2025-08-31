function end(id){ 
	if(id==0){
		$('.background_board').css('display','none');
		$('.caption').css('display','none');
		$('.curtain').css('display','block');

		setTimeout(function(){
			$('.background_board').css({
				'background-image': 'url("Unknown.jpg")',
				'background-size': 'cover', // 使背景图片铺满窗口
				'background-position': 'center', // 使背景图片居中
				'background-repeat': 'no-repeat' // 防止背景图片重复
			});
			$('.background_board').fadeIn(1000);
			$('.caption').html('程序员罢工了，主角趋势了');
			$('.caption').fadeIn(1000);
		},2000);
		setTimeout("$('.caption').fadeOut(500),$('.background_board').fadeOut(1000)",5000);	
	}
}

function ending(id){
	setTimeout(function(){
		$('.ending').fadeIn(1000);
		setTimeout("$('.content').fadeIn(1000)",2000);
		setTimeout("$('.content').css('animation-name','end_rolling')",4000);
	},1000);
}