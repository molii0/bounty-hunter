var man_now='none';
var drji_choice_1=0;
var drji_choice_2=0;
var drji_choice_3=0;


function dialog(man){
	$('.container').css('margin-top','15px');
	$('.container').css('margin-left','0');
	let text=document.querySelector('.text');
	let picture=document.querySelector('.picture');
	let title=document.querySelector('.title');
	let texture=document.querySelector('.texture');
	

	// 添加示例NPC对话逻辑
	if(man == 'example'){

		text.style.display='block'; // 在switch case前面开启显示，播完之后在interact自动关，不用在这里关
		man_now='example';
		picture.innerHTML='<img src="./img/character/jane.png">';
		title.innerHTML='示例NPC';
		switch(example){
			case 0:{
				texture.innerHTML='你好，这是你家吗？';
				example++;
				break;
			}
			case 1:{
				texture.innerHTML='你问我为什么出现在你的家里？因为程序员在测试npc对话啊';
				example++;
				break;
			}
			case 2:{
				texture.innerHTML='为什么我要说这么多话？因为在测试多轮对话啊，而且你再对话发现从第一句开始了，这也是测试的一部分';
				example=0;
				person='end'; // 结束标记
				break;
			}
		}
	}
	if(man == 'init_dialog_at_home'){
		text.style.display='block'; // 在switch case前面开启显示，播完之后在interact自动关，不用在这里关
		man_now='init_dialog_at_home';
		title.innerHTML='';
		switch(init_dialog_at_home){
			case -1:{
				//不应该触发对话
				break;
			}
			case 0:{
				texture.innerHTML='1783年7月17日.';
				init_dialog_at_home++;
				break;
			}
			case 1:{
				texture.innerHTML='上一个任务结束后，杰恩一直在这个小镇待着，借酒打发时间，今天已经是第三天了.';
				init_dialog_at_home++;
				break;
			}
			case 2:{
				texture.innerHTML='但在今天，杰恩接到了一份神秘的委托……';
				init_dialog_at_home=-1;
				person='end';
				break;
			}
		}
	}
	if(man == 'villager_01'){
		text.style.display='block'; // 在switch case前面开启显示，播完之后在interact自动关，不用在这里关
		man_now='villager_01';
		switch(villager_01){
			case 0:{
				picture.innerHTML='<img src="./img/character/jane.png">'; //for me _9_
				title.innerHTML='杰恩';
				texture.innerHTML='你好，请问莱茵城是这个方向吗？';
				villager_01++;
				break;
			}
			case 1:{
				picture.innerHTML='<img src="./img/character/villager_01.png">';
				title.innerHTML='居民';
				texture.innerHTML='是的先生，你一直往前走，看到的第一座城就是莱茵城。';
				villager_01++;
				person='end';
				break;
			}
			default:{ //_6_ 游戏的小设计
				picture.innerHTML='<img src="./img/character/villager_01.png">';
				title.innerHTML='居民';
				texture.innerHTML='其他我也不清楚了，酒馆里的那些家伙或许会知道';
				person='end'; 
				break;
			}
		}
	}
	else if (man == 'student_01'){
		text.style.display='block'; // 在switch case前面开启显示，播完之后在interact自动关，不用在这里关
		man_now='student_01';
		switch(student_01){
			case 0:{
				picture.innerHTML='<img src="./img/character/jane.png">';
				title.innerHTML='杰恩';
				texture.innerHTML='（把信件和地图展示给眼前的学徒）你见过这个东西吗？'; //_10_还是具体程度，或者说什么样子的内容是直接可用的
				student_01++;
				break;
			}
			case 1:{
				picture.innerHTML='<img src="./img/character/student_01.png">';
				title.innerHTML='学生';
				texture.innerHTML='抱歉先生，我没有见过，但您可以去问问调酒师，他认识的东西多嘞。';
				student_01++;
				person='end';
				break;
			}
			default:{ //_12_ 按理来讲如果直接去问后面了，应该跳进default，一点游戏设计
				picture.innerHTML='<img src="./img/character/student_01.png">';
				title.innerHTML='学生';
				texture.innerHTML='莱茵城和纳安城是什么地方呢……' // _11_ 做成这种程度，1个人不够
				person='end';
				break;
			}
		}
	}
	else if (man == 'barman') {
		text.style.display='block'; 
		man_now='barman';
		student_01 = 2;
		switch(barman){
			case 0:{
				picture.innerHTML='<img src="./img/character/barman.png">';
				title.innerHTML='调酒师';
				texture.innerHTML='我是这小镇里花样最多的调酒师，想来杯什么样的酒？';
				barman++;
				break;
			}
			case 1:{
				picture.innerHTML='<img src="./img/character/jane.png">';
				title.innerHTML='杰恩';
				texture.innerHTML='我不是来买酒的。（把手头的信件和地图递了过去）';
				barman++;
				break;
			}
			case 2:{
				picture.innerHTML='<img src="./img/character/barman.png">';
				title.innerHTML='调酒师';
				// texture.innerHTML='我也不知道这个，不过我可以带你去找老骑士韦斯，他知道的东西多，但他性格不太好。'; //_13_ 可行性，不要想当然
				texture.innerHTML='我也不知道这个，去二楼问问老骑士韦斯吧，他知道的东西多，但他性格不太好。';
				barman++;
				person='end';
				break;
			}
			default:{
				picture.innerHTML='<img src="./img/character/barman.png">';
				title.innerHTML='调酒师';
				texture.innerHTML='去问问韦斯吧，他可是我的老顾客。';
				person='end';
				break;
			}
		}
	}
}
// function choice(num){
// 	console.log(man_now);
// 	$('.dialog_zone').css('display','none');
// 	if(man_now=='judge'){
// 			switch(num)
// 			{
// 				case 0:{
// 					$('.picture').html('<img src="./img/character/hero.png">');
// 					$('.title').html('安折');
// 					$('.texture').html('要救人吗？');
// 					judge=23;
// 					break;
// 				}
// 				case 1:{
// 					$('.picture').html('<img src="./img/character/hero.png">');
// 					$('.title').html('安折');
// 					$('.texture').html('你们要炸了外城吗？那里的人怎么办？');
// 					judge=23;
// 					break;
// 				}
// 			}
		
// 		person='judge';
// 	}
// 	else if(man_now=='drji')
// 		{
// 		if(drji==5)
// 		{switch(num)
// 		{
// 			case 0:{
// 				$('.picture').html('<img src="./img/character/hero.png">');
// 				$('.title').html('安折');
// 				$('.texture').html('感觉陆沨他还好吧。');
// 				person='drji';
// 				drji=7;
// 				dialog('drji');
// 				break;
// 			}
// 			case 1:{
// 				$('.picture').html('<img src="./img/character/hero.png">');
// 				$('.title').html('安折');
// 				$('.texture').html('可能每天看着那么多人死去，他也很难过。');
// 				person='drji';
// 				drji=6;
// 				dialog('drji');
// 				break;
				
// 			}
// 		}}
// 		else if(drji==48)
// 		{
// 			switch(num)
// 		{
// 			case 0:{
// 				$('.picture').html('<img src="./img/character/hero.png">');
// 				$('.title').html('安折');
// 				$('.texture').html('我是异种，是我感染了陆夫人，还有伊甸园所有人。');
// 				person='drji';
// 				drji=49;
// 				dialog('drji');
// 				break;
// 			}
// 			case 1:{
// 				$('.picture').html('<img src="./img/character/hero.png">');
// 				$('.title').html('安折');
// 				$('.texture').html('她变成了蜂后，无差别感染了所有人。');
// 				person='drji';
// 				drji=57;
// 				dialog('drji');
// 				break;
				
// 			}
// 		}
// 		}
// 		else if(drji==51)
// 			{
// 				switch(num)
// 			{
// 				case 0:{
// 					$('.picture').html('<img src="./img/character/hero.png">');
// 					$('.title').html('安折');
// 					$('.texture').html('纪博士，对不起了，我——其实也不属于这里。');
// 					person='drji';
// 					drji=60;
// 					dialog('drji');
// 					break;
// 				}
// 				//结局b分支
// 				case 1:{
// 					$('.picture').html('<img src="./img/character/drji.png">');
// 					$('.title').html('纪博士');
// 					$('.texture').html('你的谎言太拙劣了。她变成了什么？');
// 					person='drji';
// 					drji=52;
// 					dialog('drji');
// 					break;
					
// 				}
// 			}
// 			}
// 	}
// 	else if(man_now=='boliqiong'){
// 		$('.dialog_zone').css('display','none');
// 		if(boliqiong==5){
// 			switch(num)
// 			{
// 				case 0:{
// 					$('.picture').html('<img src="./img/character/hero.png">');
// 					$('.title').html('安折');
// 					$('.texture').html('波利先生，对不起，其实我本来就是异种。');
// 					boliqiong=6;
// 					break;
// 				}
// 				case 1:{
// 					$('.picture').html('<img src="./img/character/hero.png">');
// 					$('.title').html('安折');
// 					$('.texture').html('谢谢您，波利先生');
// 					boliqiong=9;
// 					break;
// 				}
// 			}
// 		}
// 		else if(boliqiong==44){
// 			switch(num)
// 			{
// 				case 0:{
// 					$('.picture').html('<img src="./img/character/hero.png">');
// 				$('.title').html('安折');
// 				$('.texture').html('我就是那个惰性样本，这是我的孢子，请帮我照顾好它。');
// 				boliqiong=45;
// 					break;
// 				}
// 				case 1:{
// 					$('.picture').html('<img src="./img/character/hero.png">');
// 				$('.title').html('安折');
// 				$('.texture').html('对不起了，我要走了');
// 				boliqiong=65;
// 					break;
// 				}
// 			}
// 		}
// 		person='boliqiong';
// 		dialog('boliqiong');
// 	}
// 	else if(man_now=='performerABC'){
// 		switch(num)
// 		{
// 			case 0:{
// 				$('.picture').html('<img src="./img/character/npcc.png">');
// 				$('.title').html('指引者');
// 				$('.texture').html('你被分配到伊甸园进行人类幼崽的教育工作，从事文学教育');
// 				self=6;
// 				performerABC=8;
// 				afterhedan=3;
// 				person='end';
// 				break;
// 			}
// 			case 1:{
// 				$('.picture').html('<img src="./img/character/npcc.png">');
// 				$('.title').html('指引者');
// 				$('.texture').html('你被分配到伊甸园为人类幼崽准备食物');
// 				self=9;
// 				performerABC=8;
// 				afterhedan=3;
// 				person='end';
// 				break;
// 			}
// 		}
	
// }
	

// 	else if(man_now=='self'){
// 		switch(num)
// 		{
// 			case 0:{
// 				$('.picture').html('<img src="./img/character/hero.png">');
// 				$('.title').html('安折');
// 				$('.texture').html('因为晚上太冷了，那样的夜不适合人类生存。');
// 				person='end';
// 				break;
// 			}
// 			case 1:{
// 				$('.picture').html('<img src="./img/character/hero.png">');
// 				$('.title').html('安折');
// 				$('.texture').html('这是一首由隐喻和象征组成的诗歌，它的含义是：不要温顺地接受灭亡。');
// 				person='end';
// 				break;
// 			}
// 		}
// 	}
// 	else if(man_now=='lu'){
// 		if(lu==20){
// 			switch(num)
// 			{
// 				case 0:{
// 					$('.picture').html('<img src="./img/character/hero.png">');
// 					$('.title').html('安折');
// 					$('.texture').html('您不想当人了吗？');
// 					lu=23;
// 					break;
// 				}
// 				case 1:{
// 					$('.picture').html('<img src="./img/character/hero.png">');
// 					$('.title').html('安折');
// 					$('.texture').html('您没事吧');
// 					lu=23;
// 					break;
// 				}
// 			}
// 		}
// 		else if(lu==26){
// 			switch(num)
// 			{
// 				case 0:{
// 					$('.picture').html('<img src="./img/character/lu.png">');
// 					$('.title').html('陆夫人');
// 					$('.texture').html('陆沨？他为了人类的利益可以牺牲一切，但他永远得不到他想要的……');
// 					lu=27;
// 					break;
// 				}
// 				case 1:{
// 					$('.picture').html('<img src="./img/character/lu.png">');
// 					$('.title').html('陆夫人');
// 					$('.texture').html('陆沨？他为了人类的利益可以牺牲一切，但他永远得不到他想要的……');
// 					lu=27;
// 					break;
// 				}
// 			}
// 		}
// 		person='lu';
// 		dialog('lu');
// 	}
// 	else if(man_now=='fight')
// 	{

// 		switch(num)
// 			{
// 				case 0:{
// 					$('.text').css('display','none');
// 					fight=1;
// 					break;
// 				}
// 				case 1:{
// 					$('.text').css('display','none');
// 					fight=2;
// 					break;
// 				}
// 			}
// 		person='fight';
// 		dialog('fight');
// 	}
	
	
// }

