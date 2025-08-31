var usr=localStorage.getItem('Hound_'+'CurrentPlayer');


// 这个函数用于根据传入的 num 参数加载并显示不同的线索。


// save 函数接受两个参数：archive_num 和 time_num，分别用于标识存档编号和时间戳编号。
function save(archive_num,time_num){
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_drji',drji);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_mushroom',mushroom);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_performerABC',performerABC);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_judge',judge);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_dusai',dusai);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_lu',lu);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_boliqiong',boliqiong);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_house',house);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_lyons',lyons);
	// localStorage.setItem('Hound_'+usr+'_'+archive_num+'_lestrade',lestrade);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_self',self);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_obj',obj);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_person',person);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_trans',trans);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_last_phase',last_phase);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_now_phase',now_phase);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_total',total);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_deposite',deposite);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_lockedbox',lockedbox);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_upstairs',upstairs);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_swamp',swamp);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_leave_swamp',leave_swamp);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_interact_dusai',interact_dusai);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_follow_boliqiong',follow_boliqiong);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_cg1',cg1);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_go_into_swamp',go_into_swamp);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_go_inside_swamp',go_inside_swamp);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_leave_lyons',leave_lyons);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_option_now',option_now);
	// localStorage.setItem('Hound_'+usr+'_'+archive_num+'_firstmeetfight',firstmeetfight);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_secondmeetmushroom',secondmeetmushroom);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_meetdrjiinhallway',meetdrjiinhallway);
    // localStorage.setItem('Hound_'+usr+'_'+archive_num+'_thirdmeetmushroom',thirdmeetmushroom);
	// localStorage.setItem('Hound_'+usr+'_'+archive_num+'1',talkwithjane);
	// localStorage.setItem('Hound_'+usr+'_'+archive_num+'2',innhome);
	// localStorage.setItem('Hound_'+usr+'_'+archive_num+'3',talkjudge0);
	// localStorage.setItem('Hound_'+usr+'_'+archive_num+'4',afterhedan);
	// localStorage.setItem('Hound_'+usr+'_'+archive_num+'5',part2);
	// localStorage.setItem('Hound_'+usr+'_'+archive_num+'6',part1);
	// localStorage.setItem('Hound_'+usr+'_'+archive_num+'7',talkwithjudge);

    for(var i=0;i<50;i++){
        localStorage.setItem('Hound_'+usr+'_'+archive_num+'_backpack'+i,backpack[i]);
        localStorage.setItem('Hound_'+usr+'_'+archive_num+'_pos_on_board'+i,pos_on_board[i]);
    }
	var date = new Date();
	localStorage.setItem('Hound_'+usr+'_time'+time_num,date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }));
}
//加载存档
function reload(archive_num){
    // drji=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_drji'));
    // mushroom=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_mushroom'));
    // performerABC=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_performerABC'));
    // judge=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_judge'));
    // dusai=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_dusai'));
    // lu=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_lu'));
    // boliqiong=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_boliqiong'));
    // house=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_house'));
    // lyons=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_lyons'));
	// lestrade=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_lestrade'));
    // self=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_self'));
    // obj=localStorage.getItem('Hound_'+usr+'_'+archive_num+'_obj');
    // person=localStorage.getItem('Hound_'+usr+'_'+archive_num+'_person');
    // trans=localStorage.getItem('Hound_'+usr+'_'+archive_num+'_trans');
    // last_phase=localStorage.getItem('Hound_'+usr+'_'+archive_num+'_last_phase');
    // now_phase=localStorage.getItem('Hound_'+usr+'_'+archive_num+'_now_phase');
    // total=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_total'));
    // deposite=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_deposite'));
    // lockedbox=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_lockedbox'));
    // upstairs=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_upstairs'));
    // swamp=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_swamp'));
    // leave_swamp=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_leave_swamp'));
    // interact_dusai=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_interact_dusai'));
    // follow_boliqiong=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_follow_boliqiong'));
    // cg1=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_cg1'));
    // go_into_swamp=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_go_into_swamp'));
    // go_inside_swamp=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_go_inside_swamp'));
    // leave_lyons=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_leave_lyons'));
    // option_now=0;
	// firstmeetfight=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_firstmeetfight'));
	// secondmeetmushroom=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_secondmeetmushroom'));
    // meetdrjiinhallway=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_meetdrjiinhallway'));
    // thirdmeetmushroom=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_thirdmeetmushroom'));
    // talkwithjane=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'1'));
    // innhome=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'2'));
    // talkjudge0=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'3'));
    // afterhedan=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'4'));
    // part2=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'5'));
    // part1=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'6'));
	// talkwithjudge=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'7'));




    for(var i=0;i<50;i++){
        backpack[i]=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_backpack'+i));
        pos_on_board[i]=Number(localStorage.getItem('Hound_'+usr+'_'+archive_num+'_pos_on_board'+i));
    }
    // for(var i=1;i<50;i++){
    //     if(backpack[i])
    //         reloadobj(i);
    // }
    loadmap(now_phase);
}

