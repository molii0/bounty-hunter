var usr=localStorage.getItem('Hound_'+'CurrentPlayer');


// 这个函数用于根据传入的 num 参数加载并显示不同的线索。


// save 函数接受两个参数：archive_num 和 time_num，分别用于标识存档编号和时间戳编号。
function save(archive_num,time_num){
    hero = document.querySelector('.hero');
    hero_x = hero.style.left;
    hero_y = hero.style.top;
    localStorage.setItem('Hound_' + usr + '_' + archive_num + 'hero_x', hero_x);
    localStorage.setItem('Hound_' + usr + '_' + archive_num + 'hero_y', hero_y);
    localStorage.setItem('Hound_' + usr + '_' + archive_num + 'obj', obj);
    localStorage.setItem('Hound_' + usr + '_' + archive_num + 'person', person);
    localStorage.setItem('Hound_' + usr + '_' + archive_num + 'trans', trans);
    localStorage.setItem('Hound_' + usr + '_' + archive_num + 'last_phase', last_phase);
    localStorage.setItem('Hound_' + usr + '_' + archive_num + 'now_phase', now_phase);
    localStorage.setItem('Hound_' + usr + '_' + archive_num + 'example', example);
    localStorage.setItem('Hound_' + usr + '_' + archive_num + 'self', self);
    localStorage.setItem('Hound_' + usr + '_' + archive_num + 'init_dialog_at_home', init_dialog_at_home);
    localStorage.setItem('Hound_' + usr + '_' + archive_num + 'villager_01', villager_01);
    localStorage.setItem('Hound_' + usr + '_' + archive_num + 'barman', barman);
    localStorage.setItem('Hound_' + usr + '_' + archive_num + 'student_01', student_01);
    localStorage.setItem('Hound_' + usr + '_' + archive_num + 'old_knight', old_knight);
    localStorage.setItem('Hound_' + usr + '_' + archive_num + 'old_knight_gem', old_knight_gem);
    localStorage.setItem('Hound_' + usr + '_' + archive_num + 'paper_at_home', paper_at_home);
    localStorage.setItem('Hound_' + usr + '_' + archive_num + 'gem', gem);
    


    // for(var i=0;i<50;i++){
    //     localStorage.setItem('Hound_'+usr+'_'+archive_num+'_backpack'+i,backpack[i]);
    //     localStorage.setItem('Hound_'+usr+'_'+archive_num+'_pos_on_board'+i,pos_on_board[i]);
    // }
	var date = new Date();
	localStorage.setItem('Hound_'+usr+'_time'+time_num,date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }));
}
//加载存档
function reload(archive_num){
    
    obj = localStorage.getItem('Hound_' + usr + '_' + archive_num + 'obj');
    person = localStorage.getItem('Hound_' + usr + '_' + archive_num + 'person');
    trans = localStorage.getItem('Hound_' + usr + '_' + archive_num + 'trans');
    last_phase = localStorage.getItem('Hound_' + usr + '_' + archive_num + 'last_phase');
    now_phase = localStorage.getItem('Hound_' + usr + '_' + archive_num + 'now_phase');
    option_now = 0;
    example = Number(localStorage.getItem('Hound_' + usr + '_' + archive_num + 'example'));
    self = Number(localStorage.getItem('Hound_' + usr + '_' + archive_num + 'self'));
    init_dialog_at_home = Number(localStorage.getItem('Hound_' + usr + '_' + archive_num + 'init_dialog_at_home'));
    villager_01 = Number(localStorage.getItem('Hound_' + usr + '_' + archive_num + 'villager_01'));
    barman = Number(localStorage.getItem('Hound_' + usr + '_' + archive_num + 'barman'));
    student_01 = Number(localStorage.getItem('Hound_' + usr + '_' + archive_num + 'student_01'));
    old_knight = Number(localStorage.getItem('Hound_' + usr + '_' + archive_num + 'old_knight'));
    old_knight_gem = Number(localStorage.getItem('Hound_' + usr + '_' + archive_num + 'old_knight_gem'));
    paper_at_home = Number(localStorage.getItem('Hound_' + usr + '_' + archive_num + 'paper_at_home'));
    gem = Number(localStorage.getItem('Hound_' + usr + '_' + archive_num + 'gem'));

    loadmap(now_phase);

    hero_x = Number(localStorage.getItem('Hound_' + usr + '_' + archive_num + 'hero_x'));
    hero_y = Number(localStorage.getItem('Hound_' + usr + '_' + archive_num + 'hero_y'));
    hero.style.left = hero_x;
    hero.style.top = hero_y;
}

