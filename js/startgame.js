var loadnum=Number(localStorage.getItem('Hound_'+usr+'_loadnum'));
if(loadnum==-1){
    $('.hero').css('display','none');
    $('.manual').fadeIn(1000);

    setTimeout("$('.manual').fadeOut(1000)",5000);
    setTimeout("cg(0)",6000); //
    
    // //为了调地图可以直接跳转
    // last_phase='street_from_home_to_bar';
    // transform('home');
}
else
    reload('archive'+loadnum);