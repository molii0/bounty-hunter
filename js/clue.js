

function addachievement(id){
	if(id==0) $('#achieve').html('test');
	else if(id==1){
		$('#achieve').html('化敌为友');
	}
	else if(id==2){
		$('#achieve').html('厨房小能手');
	}
	
	$('.achievement').css('animation-name','achievement');
	setTimeout("$('.achievement').css('animation-name','counter_achievement')",2000);
	localStorage.setItem('Hound_'+usr+'_achievement'+id,1);
}