var usr=localStorage.getItem('Hound_'+"CurrentPlayer");
if(!('Hound_'+usr+'_archive_pointer' in localStorage))
    localStorage.setItem('Hound_'+usr+'_archive_pointer',0);

function newgame(){
    localStorage.setItem('Hound_'+usr+'_loadnum',-1);
    // 向父窗口发送消息，隐藏音乐播放器
    if (window.parent) {
        window.parent.postMessage('hideMusicPlayer', '*');
    }
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
    // 直接跳转到index.html
    // 向父窗口发送消息，显示音乐播放器
    if (window.parent) {
        window.parent.postMessage('showMusicPlayer', '*');
    }
    window.location.href = '../login.html';
}