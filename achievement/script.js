var usr=localStorage.getItem('Hound_'+"CurrentPlayer");
function openarchive(){
    window.open("../archive/archive.html","_self");
}
function backToHome(){
    window.open("../home/home.html", "_self")
}
function openabout(){
    window.open("../aboutus/introduction.html","_self");
}
function showachieve(){
    if('Hound_'+usr+'_achievement1' in localStorage){
        $('#achievename1').html('尚未完成');
        $('#achievedetail1').html('没想好');
        $('#picture1').attr('src','不知道');
    }
}
$(document).ready(showachieve);