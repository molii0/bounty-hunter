function inner(l,ql,qr){
	if(l>=ql&&l<=qr) return 1;
	if(l<=ql&&l>=qr) return 1;
	return 0;
}
// 根据不同的操作（op）和墙壁（wall）的位置，计算一个限制值 limit。
// op: forward, backward, turnleft, turnright
// wall: 一个二维数组，每个元素代表一个墙壁，元素的格式为 [x,y,w]，x,y为墙壁的左上角坐标，w为墙壁的宽度。
// x,y: 要检查的坐标
function check(op,wall,x,y){
	var limit=0;
	if(op=='backward') limit=mapheight;
	if(op=='turnright') limit=mapwidth;
	for(var i=0;i<wall.length;i++){
		if(op=='forward'){
			if(y>wall[i][1]&&inner(x,wall[i][0],wall[i][0]+wall[i][2])) limit=max(limit,wall[i][1]);
		}
		else if(op=='backward'){
			if(y<wall[i][1]&&inner(x,wall[i][0],wall[i][0]+wall[i][2])) limit=min(limit,wall[i][1]);
		}
		else if(op=='turnleft'){
			if(x>wall[i][0]&&inner(y,wall[i][1],wall[i][1]+wall[i][2])) limit=max(limit,wall[i][0]);
		}
		else{
			if(x<wall[i][0]&&inner(y,wall[i][1],wall[i][1]+wall[i][2])) limit=min(limit,wall[i][0]);
		}
	}
	return limit;
}
function hotzone(x,y,obj){
	if(dis(x,y,obj[0],obj[1])<=obj[2]) return 1;
	return 0;
}
// 根据 obj 的值，更新网页上的文本、图片、标题、纹理和显示内容。
