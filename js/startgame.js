var loadnum=Number(localStorage.getItem('Hound_'+usr+'_loadnum'));
if(loadnum==-1){
    $('.hero').css('display','none');
    $('.manual').fadeIn(1000);
    setTimeout("$('.manual').fadeOut(1000)",4000);
    setTimeout("cg(0)",5000); //
    
    // // //为了调地图可以直接跳转
    // last_phase='bar';
    // transform('gem_room');
}
else
    reload('archive'+loadnum);