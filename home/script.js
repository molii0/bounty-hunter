var usr=localStorage.getItem('Hound_'+"CurrentPlayer");
if(!('Hound_'+usr+'_archive_pointer' in localStorage))
    localStorage.setItem('Hound_'+usr+'_archive_pointer',0);

function newgame(){
    localStorage.setItem('Hound_'+usr+'_loadnum',-1);
    window.open("../game.html","_self");
}

function Load(){
    window.open("../archive/archive.html","_self");
}

function achievement(){
    window.open("../achievement/achievement.html","_self");
}
function about(){
    window.open("../aboutus/introduction.html","_self");
}
function logoutToIndex(){
    if (window.parent && window.parent !== window) {
        // 在iframe中，使用全局切换函数回到登录页
        if (window.parent.switchIframe) {
            window.parent.switchIframe('login');
        }
    } else {
        // 如果不在iframe中，直接跳转
        window.location.href = '../index.html';
    }
}