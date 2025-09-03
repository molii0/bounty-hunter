// 这行代码通过选择器 .window 获取文档中第一个匹配的元素，并将其赋值给变量 scene。
let scene=document.querySelector('.window');
function loadmap(phase){
	// 更新场景状态，从抽象逻辑来讲，这部分应该放在切换地图的函数，但是loadmap用太多了，懒得改了
	// 这段代码检查当前场景状态 now_phase 是否与传入的 phase 不同，
	// 或者当前场景状态是 bedroom 且传入的 phase 也是 bedroom。
	// 如果是，则更新 last_phase 为 now_phase，并将 now_phase 更新为 phase。
	if(now_phase!=phase){
		last_phase=now_phase;
		now_phase=phase;
	}
	obj=person=trans='none';
	// 如果 phase 为 'test'，则设置场景的背景图像为 ./img/bedroom1.png，
	// 并初始化 wallx、wally、object 和 npc 数组，这些数组分别定义了墙壁、物体和 NPC 的位置和属性。
	//下面的逻辑类似
	if(phase=='home'){
		$('.hero').css('display','block'); //显示玩家
		scene.style.backgroundImage = "url(./img/map/home.jpg), url(./img/black_background.jpg)";
		scene.style.backgroundSize = "auto, cover"; // 根据需要调整大小
		scene.style.backgroundRepeat = "no-repeat, repeat"; // 防止图片重复
		scene.style.backgroundPosition = "center, center"; // 将图片居中显示

		if(init_dialog_at_home == 0) {
			person='init_dialog_at_home'; // 这种没有实体npc的对话要人工设置person，否则没办法进入对话逻辑
			dialog('init_dialog_at_home');
		}

		// 墙壁内圈不要突出，外面可以随便往外延长，有时候计算比试来的快一点，
		// 比如横向往右接纵向往下的转角，纵向的起始点就用横向的起始点和长度算出来
		wallx = [ // 左右方向的墙,起始点是(309,256),长度是200
			[309,256,200],  [409, 211, 375],[584,236, 125],[614,386,10],[309, 346, 30], [339, 541, 110], [514, 541, 300], [449,576, 300],[429,356,95],[429, 436, 95]
		]
		
		wally = [ // 上下方向的墙，起始点是(304,261),长度是580
			[304,261,580], [509, 116, 140],[584, 211, 25],[614,236,150], [624, 381, 350] ,[339, 346, 400],[449, 541, 100], [514, 541, 200],[429, 356, 80],[524,356,80]
		]
		
		if (last_phase == 0){ // 很特殊的设定，只有刚开始游戏的时候last_phase是0，出生在床上
			$('.hero').css('left','609px');
			$('.hero').css('top','256px');
			$('.hero').css('background-position-y','0'); // 将背景图片居中显示
		} else if (true){ // 家里只有一个门
			$('.hero').css('left','479px');
			$('.hero').css('top','531px');
			$('.hero').css('background-position-y','0'); // 将背景图片居中显示
		}

		npc = []; // 必须要留空数组，不然会导致没定义,这时候按两次e才能正常对话
		$('#npc1').css('display','none'); // _8_必须全部隐藏，不然会导致上个场景的npc还在
		$('#npc2').css('display','none');
		$('#npc3').css('display','none');
		// 物品
		object=[[619,321,30,'paper_at_home']]; //物品都是底图里有的，就不用css单独显示了
		
		// 传送点
		door=[[479, 581, 30, 'street_from_home_to_bar']]; 
		
	}
	
	else if(phase=='street_from_home_to_bar'){
		$('.hero').css('display','block'); //显示玩家
		scene.style.backgroundImage = "url(./img/map/street_from_home_to_bar.jpg), url(./img/black_background.jpg)"; // _5_图片缩放好
		scene.style.backgroundSize = "auto, cover"; // 根据需要调整大小
		scene.style.backgroundRepeat = "no-repeat, repeat"; // 防止图片重复
		scene.style.backgroundPosition = "center, center"; // 将图片居中显示

		wallx = [[0, 615, 1000], [0, 515, 165], [215, 515, 475], [740, 515, 260], [0, 410, 1000], [0, 440, 400]
		];

		wally = [[165, 0, 515], [215, 0, 515], [690, 0, 515], [740, 0, 515], [0, 965, 800]
		];

		if (last_phase == 'home'){
			$('.hero').css('left','190px');
			$('.hero').css('top','495px');
			$('.hero').css('background-position-y','0'); // 将背景图片居中显示
		} else if (last_phase == 'bar'){
			$('.hero').css('left','715px');
			$('.hero').css('top','440px');
			$('.hero').css('background-position-y','0'); // 将背景图片居中显示
		}
		
		npc = [[425, 525, 40, 'villager_01'], ];
		$('#npc1').css('display','block');
		$('#npc1').css('background-image','url("./img/character/villager_01.png")');
		$('#npc1').css('left','425px');
		$('#npc1').css('top','525px');
		$('#npc2').css('display','none');
		$('#npc3').css('display','none');

		object = [];
		door = [[190, 435, 40, 'home'], [715, 405, 40, 'bar'],[960,520,100,'gem_room']];
	}

	else if(phase=='bar'){
		$('.hero').css('display','block');
		scene.style.backgroundImage = "url(./img/map/bar.png), url(./img/black_background.jpg)";
		scene.style.backgroundSize = "auto, cover"; // 根据需要调整大小
		scene.style.backgroundRepeat = "no-repeat, repeat"; // 防止图片重复
		scene.style.backgroundPosition = "center, center"; // 将图片居中显示

		wallx = [
			[159,201,635],[159,326,245],[454,326,350],[379,431,25],[454,431,320],[159,516,215],[159,581,245],[454,581,350],[404,611,50],
			[164,226,85],[289,226,85],[484,226,85],[639,226,85],[164,296,85],[289,296,85],[484,296,85],[639,296,85],[479,451,85],[644,451,85],[479,521,85],[644,521,85]
		];
		
		wally = [
			[154,206,400],[799,206,400],[404,326,105],[454,326,105],[374,406,110],[154,521,55],[769,436,140],[404,581,40],[454,581,40],
			[164,226,70],[249,226,70],[289,226,70],[374,226,70],[484,226,70],[569,226,70],[639,226,70],[724,226,70],[479,451,70],[564,451,70],[644,451,70],[729,451,70]
		];

		if (true){ // _7_ 想好逻辑和位置
			$('.hero').css('left','429px');
			$('.hero').css('top','601px');
			$('.hero').css('background-position-y','0'); // 将背景图片居中显示
		}
		
		npc=[[240,475, 70, 'barman'], [524, 531, 40, 'student_01']]; 
		object=[];
		door=[[404,616,50,'street_from_home_to_bar']]; 

		$('#npc1').css('display','block');
		$('#npc1').css('background-image','url("./img/character/barman.png")');
		$('#npc1').css('left','240px');
		$('#npc1').css('top','475px'); 

		$('#npc2').css('display','block');
		$('#npc2').css('background-image','url("./img/character/student_01.png")');
		$('#npc2').css('left','524px');
		$('#npc2').css('top','531px');

		$('#npc3').css('display','none');
	
	}

	else if(phase=='gem_room'){
		$('.hero').css('display','block');
		scene.style.backgroundImage = "url(./img/map/gem_room.jpg), url(./img/black_background.jpg)";
		scene.style.backgroundSize = "auto, cover"; // 根据需要调整大小
		scene.style.backgroundRepeat = "no-repeat, repeat"; // 防止图片重复
		scene.style.backgroundPosition = "center, center"; // 将图片居中显示

		wallx = [[402,521,65],[402,623,151],[488,521,65],[467,232,21]];

		wally = [[402,521,102],[467,232,289],[553,521,102],[488,232,289]];

		if (true){ 
			$('.hero').css('left','480px');
			$('.hero').css('top','620px');
			$('.hero').css('background-position-y','0'); // 将背景图片居中显示
		}
		
		npc=[[550,525, 70,'old_knight_gem']]; 
		object=[[480,200,80,'gem']];
		door=[[400,620,155,'bar']]; 

		$('#npc1').css('display','block');
		$('#npc1').css('background-image','url("./img/character/old_knight.png")');
		$('#npc1').css('left','550px');
		$('#npc1').css('top','525px'); 
		$('#npc2').css('display','none');
		$('#npc3').css('display','none');
	
	}

}
//这段代码的主要功能是处理地图转换的过渡效果，包括背景图切换、人物移动、NPC出现、对话显示等。
// 具体步骤如下：

// 输出传入的地图名称到控制台。
// 初始化几个变量为 'none'。
// 如果传入的地图名称为 'shenyuan'，则执行以下操作：
// 清除背景板的背景图像并隐藏背景板。
// 清除字幕内容并隐藏字幕。
// 淡入幕布，延迟 1.5 秒后加载指定地图，再延迟 1 秒后淡出幕布。
function transform(map_name){
	console.log(map_name);
	person=obj=trans='none';
	// last_phase=phase; //用于记录上一个地图以确定正确的出生点
	// now_phase=map_name;
	
	{
		$('.caption').html('');
		$(".curtain").fadeIn(500);
		setTimeout(function(){loadmap(map_name)},500);
		setTimeout("$('.curtain').fadeOut(500)",1000);
	}
	trans='none';
}