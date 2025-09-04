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
        $('#achievename1').html('化敌为友');
        $('#achievedetail1').html('与一句话不合就拼命的老骑士成为了朋友');
        $('#picture1').attr('src','不知道');
    }
}
$(document).ready(showachieve);