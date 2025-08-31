var vis=[],lock=[],cnt=0,object_now=0,character_now=0;
function getclue(x){return "#bt"+String(x);}
function gettext(x){return "#text"+String(x);}
function getline(x){return '#line'+String(x);}
function appear(x){
	var clue=getclue(x),text=gettext(x),line=getline(x);
  	$(text).fadeIn(500);
	$(line).css('animation-name','drawline');
	vis[x]=1;cnt++;
	if(cnt==2) $(".op").fadeIn(500);
}
function restore(x){
	console.log(x);
	var clue=getclue(x),text=gettext(x),line=getline(x);
	$(text).fadeOut(500);
	$(line).css('animation-name','eraseline');
	vis[x]=0;cnt--;
	$(".op").fadeOut(500);
	setTimeout(function(){$(line).css('animation-name','');},500);
}
function add(x){
	appear(pos_on_board[x]);
}

function getobj(x){return "#obj"+String(x);}
function getinfo(x){return "#info"+String(x);}
function getpic(x){return "#pic"+String(x);}
function object_select(x){
	var obj=getobj(x),info=getinfo(x),pic=getpic(x);
	$(obj).css('border-color','white');
	$(info).css('display','block');
	$(pic).css('display','block');
	object_now=x;
}
function object_cancel(x){
	if(x==0) return;
	var obj=getobj(x),info=getinfo(x),pic=getpic(x);
	$(obj).css('border-color','grey');
	$(info).css('display','none');
	$(pic).css('display','none');
	object_now=0;	
}

function getcha(x){return "#cha"+String(x);}
function getchainfo(x){return "#chainfo"+String(x);}
function character_select(x){
	var cha=getcha(x),chainfo=getchainfo(x);
	$(cha).css('margin-left','30px');
	$(cha).css('background-color','white');
	$(cha).css('color','black');
	$(chainfo).css('display','block');
	character_now=x;
}
function character_cancel(x){
	if(x==0) return;
	var cha=getcha(x),chainfo=getchainfo(x);
	$(cha).css('margin-left','0');
	$(cha).css('background-color','black');
	$(cha).css('color','white');
	$(chainfo).css('display','none');
	character_now=0;
}

$(document).ready(function(){
	$("#bt1").click(function(){
		if(!vis[1]&&cnt<2) appear(1);
		else if(vis[1]) restore(1);
	});	
	$("#bt2").click(function(){
		if(!vis[2]&&cnt<2) appear(2);
		else if(vis[2]) restore(2);
	});
	$("#bt3").click(function(){
		if(!vis[3]&&cnt<2) appear(3);
		else if(vis[3]) restore(3);
	});
	$("#bt4").click(function(){
		if(!vis[4]&&cnt<2) appear(4);
		else if(vis[4]) restore(4);
	});
	$("#bt5").click(function(){
		if(!vis[5]&&cnt<2) appear(5);
		else if(vis[5]) restore(5);
	});
	$("#bt6").click(function(){
		if(!vis[6]&&cnt<2) appear(6);
		else if(vis[6]) restore(6);
	});
	$("#bt7").click(function(){
		if(!vis[7]&&cnt<2) appear(7);
		else if(vis[7]) restore(7);
	});
	$("#bt8").click(function(){
		if(!vis[8]&&cnt<2) appear(8);
		else if(vis[8]) restore(8);
	});
	$("#bt9").click(function(){
		if(!vis[9]&&cnt<2) appear(9);
		else if(vis[9]) restore(9);
	});
	$("#bt10").click(function(){
		if(!vis[10]&&cnt<2) appear(10);
		else if(vis[10]) restore(10);
	});
	$("#bt11").click(function(){
		if(!vis[11]&&cnt<2) appear(11);
		else if(vis[11]) restore(11);
	});
	$("#bt12").click(function(){
		if(!vis[12]&&cnt<2) appear(12);
		else if(vis[12]) restore(12);
	});	
	$("#bt13").click(function(){
		if(!vis[13]&&cnt<2) appear(13);
		else if(vis[13]) restore(13);
	});
	$("#bt14").click(function(){
		if(!vis[14]&&cnt<2) appear(14);
		else if(vis[14]) restore(14);
	});
	$("#bt15").click(function(){
		if(!vis[15]&&cnt<2) appear(15);
		else if(vis[15]) restore(15);
	});
	$("#bt16").click(function(){
		if(!vis[16]&&cnt<2) appear(16);
		else if(vis[16]) restore(16);
	});
	$("#bt17").click(function(){
		if(!vis[17]&&cnt<2) appear(17);
		else if(vis[17]) restore(17);
	});
	$("#bt18").click(function(){
		if(!vis[18]&&cnt<2) appear(18);
		else if(vis[18]) restore(18);
	});	
	$("#bt19").click(function(){
		if(!vis[19]&&cnt<2) appear(19);
		else if(vis[19]) restore(19);
	});
	$("#bt20").click(function(){
		if(!vis[20]&&cnt<2) appear(20);
		else if(vis[20]) restore(20);
	});
	$("#bt21").click(function(){
		if(!vis[21]&&cnt<2) appear(21);
		else if(vis[21]) restore(21);
	});
	$("#bt22").click(function(){
		if(!vis[22]&&cnt<2) appear(22);
		else if(vis[22]) restore(22);
	});
	$("#bt23").click(function(){
		if(!vis[23]&&cnt<2) appear(23);
		else if(vis[23]) restore(23);
	});
	$("#bt24").click(function(){
		if(!vis[24]&&cnt<2) appear(24);
		else if(vis[24]) restore(24);
	});
	$("#bt25").click(function(){
		if(!vis[25]&&cnt<2) appear(25);
		else if(vis[25]) restore(25);
	});
	$("#bt26").click(function(){
		if(!vis[26]&&cnt<2) appear(26);
		else if(vis[26]) restore(26);
	});
	$("#bt27").click(function(){
		if(!vis[27]&&cnt<2) appear(27);
		else if(vis[27]) restore(27);
	});
	$("#bt28").click(function(){
		if(!vis[28]&&cnt<2) appear(28);
		else if(vis[28]) restore(28);
	});
	$("#bt29").click(function(){
		if(!vis[29]&&cnt<2) appear(29);
		else if(vis[29]) restore(29);
	});
	$("#bt30").click(function(){
		if(!vis[30]&&cnt<2) appear(30);
		else if(vis[30]) restore(30);
	});
	$("#bt31").click(function(){
		if(!vis[31]&&cnt<2) appear(31);
		else if(vis[31]) restore(31);
	});	
	$("#bt32").click(function(){
		if(!vis[32]&&cnt<2) appear(32);
		else if(vis[32]) restore(32);
	});
	$("#bt33").click(function(){
		if(!vis[33]&&cnt<2) appear(33);
		else if(vis[33]) restore(33);
	});
	$("#bt34").click(function(){
		if(!vis[34]&&cnt<2) appear(34);
		else if(vis[34]) restore(34);
	});
	$("#bt35").click(function(){
		if(!vis[35]&&cnt<2) appear(35);
		else if(vis[35]) restore(35);
	});
	$("#bt36").click(function(){
		if(!vis[36]&&cnt<2) appear(36);
		else if(vis[36]) restore(36);
	});
	$("#bt37").click(function(){
		if(!vis[37]&&cnt<2) appear(37);
		else if(vis[37]) restore(37);
	});
	$("#bt38").click(function(){
		if(!vis[38]&&cnt<2) appear(38);
		else if(vis[38]) restore(38);
	});
	$("#bt39").click(function(){
		if(!vis[39]&&cnt<2) appear(39);
		else if(vis[39]) restore(39);
	});
	$("#bt40").click(function(){
        if(!vis[40]&&cnt<2) appear(40);
        else if(vis[40]) restore(40);
    });
    $("#bt41").click(function(){
        if(!vis[41]&&cnt<2) appear(41);
        else if(vis[41]) restore(41);
    }); 
    $("#bt42").click(function(){
        if(!vis[42]&&cnt<2) appear(42);
        else if(vis[42]) restore(42);
    });
	$("#bt43").click(function(){
        if(!vis[43]&&cnt<2) appear(43);
        else if(vis[43]) restore(43);
    });
    $("#bt44").click(function(){
        if(!vis[44]&&cnt<2) appear(44);
        else if(vis[44]) restore(44);
    });
    $("#bt45").click(function(){
        if(!vis[45]&&cnt<2) appear(45);
        else if(vis[45]) restore(45);
    });
    $("#bt46").click(function(){
        if(!vis[46]&&cnt<2) appear(46);
        else if(vis[46]) restore(46);
    });
    $("#bt47").click(function(){
        if(!vis[47]&&cnt<2) appear(47);
        else if(vis[47]) restore(47);
    });
    $("#bt48").click(function(){
        if(!vis[48]&&cnt<2) appear(48);
        else if(vis[48]) restore(48);
    });
});

$(document).ready(function(){
	$("#obj1").on('click',function(){
		object_cancel(object_now);
		object_select(1);
	});
	$("#obj2").on('click',function(){
		object_cancel(object_now);
		object_select(2);
	});
	$("#obj3").on('click',function(){
		object_cancel(object_now);
		object_select(3);
	});
	$("#obj4").on('click',function(){
		object_cancel(object_now);
		object_select(4);
	});
	$("#obj5").on('click',function(){
		object_cancel(object_now);
		object_select(5);
	});
	$("#obj6").on('click',function(){
		object_cancel(object_now);
		object_select(6);
	});
	$("#obj7").on('click',function(){
		object_cancel(object_now);
		object_select(7);
	});
	$("#obj8").on('click',function(){
		object_cancel(object_now);
		object_select(8);
	});
	$("#obj9").on('click',function(){
		object_cancel(object_now);
		object_select(9);
	});
	$("#obj10").on('click',function(){
		object_cancel(object_now);
		object_select(10);
	});
	$("#obj11").on('click',function(){
		object_cancel(object_now);
		object_select(11);
	});
	$("#obj12").on('click',function(){
		object_cancel(object_now);
		object_select(12);
	});
});

$(document).ready(function(){
	$('#cha1').on('click',function(){
		character_cancel(character_now);
		character_select(1);
	});
});



