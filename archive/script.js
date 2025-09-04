var usr=localStorage.getItem('Hound_'+"CurrentPlayer");

function openachievement(){
    window.open("../achievement/achievement.html","_self");
}
function backToHome(){
    window.open("../home/home.html","_self");
}
function openabout(){
    window.open("../aboutus/introduction.html","_self");
}
function archive_hint(text){
    $('#login1').html(text);
    $('.panel').css('animation-name','slide');
    setTimeout("$('.panel').css('animation-name','slide_back')",2000);
}

function loadarchive(loadnum){
    var archive_pointer=Number(localStorage.getItem('Hound_'+usr+'_archive_pointer'));
    if(loadnum<archive_pointer){
        localStorage.setItem('Hound_'+usr+'_loadnum',loadnum);
        window.open("../game.html","_self");
    }
    else{
        archive_hint('此存档为空！');
    }
}

function getscene(archive_num){
    var now_phase=localStorage.getItem('Hound_'+usr+'_'+archive_num+'_now_phase');
    var scenename;
    if(now_phase=='home')
        scenename='家';
    else if(now_phase=='street_from_home_to_bar')
        scenename='街道';
    else if(now_phase=='bar')
        scenename='酒馆';
    else if(now_phase=='gem_room')
        scenename='密室';
   
    return scenename;
}

function showtime(){
    if('Hound_'+usr+'_time1' in localStorage){
        $('#time1').html(localStorage.getItem('Hound_'+usr+'_time1'));
        $('#scene1').html(getscene('archive0'));
    }
    if('Hound_'+usr+'_time2' in localStorage){
        $('#time2').html(localStorage.getItem('Hound_'+usr+'_time2'));
        $('#scene2').html(getscene('archive1'));
    }
    if('Hound_'+usr+'_time3' in localStorage){
        $('#time3').html(localStorage.getItem('Hound_'+usr+'_time3'));
        $('#scene3').html(getscene('archive2'));
    }
    if('Hound_'+usr+'_time4' in localStorage){
        $('#time4').html(localStorage.getItem('Hound_'+usr+'_time4'));
        $('#scene4').html(getscene('archive3'));
    }
    if('Hound_'+usr+'_time5' in localStorage){
        $('#time5').html(localStorage.getItem('Hound_'+usr+'_time5'));
        $('#scene5').html(getscene('archive4'));
    }
    if('Hound_'+usr+'_time6' in localStorage){
        $('#time6').html(localStorage.getItem('Hound_'+usr+'_time6'));
        $('#scene6').html(getscene('archive5'));
    }
    if('Hound_'+usr+'_time7' in localStorage){
        $('#time7').html(localStorage.getItem('Hound_'+usr+'_time7'));
        $('#scene7').html(getscene('archive6'));
    }
    if('Hound_'+usr+'_time8' in localStorage){
        $('#time8').html(localStorage.getItem('Hound_'+usr+'_time8'));
        $('#scene8').html(getscene('archive7'));
    }
    if('Hound_'+usr+'_time9' in localStorage){
        $('#time9').html(localStorage.getItem('Hound_'+usr+'_time9'));
        $('#scene9').html(getscene('archive8'));
    }
}
$(document).ready(showtime);