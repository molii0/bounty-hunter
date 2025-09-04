function interact(object){
	// 以下完全复用对话框
    $('.container').css('margin-top','15px');
	$('.container').css('margin-left','0');
	let text=document.querySelector('.text');
	let picture=document.querySelector('.picture');
	let title=document.querySelector('.title');
	let texture=document.querySelector('.texture');
    // 与物品交互
    if(object=='paper_at_home'){ //object是物品名字符串
        text.style.display='block';
        switch(paper_at_home){ //这里是全局变量，值是数字
            case 0:
                $('.picture').html('<img src="./img/object/parchment-texture.png">'); //这里用了登录的纸，因为我懒得找了
                $('.title').html('一封信');
				$('.texture').html('信：“勇敢的赏金猎人，如果你愿意去到纳安城找到这个人，你将会收到一笔丰厚的报酬”'); 
                paper_at_home++;
                break; 
            case 1:
                $('.picture').html('<img src="./img/object/parchment-texture.png">'); //这里用了登录的纸，因为我懒得找了
                $('.title').html('一封信');
				$('.texture').html('(把信纸拿了出来，信封里还放着一张地图。地图上在途中的莱茵城标注了钥匙，似乎是想让你去寻找)');  //_4_检查文字
                paper_at_home++;
                break; //这张纸只写了一个内容，所以不用++，每次都是这个文字
            case 2: // 用同一接口的好处，这里虽然是对话，但是直接顺手糊弄过去了，不放dialog了，因为没本质区别
                $('.picture').html('<img src="./img/avatar/jane.png">');
                $('.title').html('杰恩');
				$('.texture').html('莱茵城、纳安城？没听说过的地方，不过这报酬真是诱人。');
                paper_at_home++;
                break;
            case 3:
                $('.picture').html('<img src="./img/avatar/jane.png">');
                $('.title').html('杰恩');
				$('.texture').html('报酬足够，没什么困难是英勇无畏的赏金猎人克服不了的。'); //_1_检查一下文字
                paper_at_home=0;
                obj = 'end'
                break; 
        }
    }

    else if(object=='gem'){
        text.style.display='block';
        switch(gem){ 
            default:
                $('.picture').html(''); 
                $('.title').html('');
				$('.texture').html('(拿到宝石后，你们从密室逃脱）');

                obj='end';
                break;
        }
    }
}