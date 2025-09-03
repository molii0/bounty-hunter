// 角色和地图尺寸
var herowidth=48,heroheight=48;
var mapwidth=1000,mapheight=800;

// 碰撞检测系统
var wallx=[];
var wally=[];

// 交互系统
var object=[];
var npc=[];
var obj='none',person='none',trans='none'; 

// 背包系统
var backpack=new Array(50).fill(0);
var pos_on_board=new Array(50).fill(0),total=50;


// 场景管理
var last_phase='',now_phase=''; // 记住名字
var map=0;
var option_now=0; // 用于判断角色是否可以移动


var achievement=new Array(50).fill(0);
function max(x,y){
	return (x>y)?x:y;
}
function min(x,y){
	return (x<y)?x:y;
}
function abs(x){
	return (x>0)?x:-x;
}
function dis(x,y,x1,y1){
	return abs(x-x1)+abs(y-y1);
}

// npc对话和旁白对话，旁白全部分别用变量，避免莫名bug
var example = 0; // 家里的示例npc
var self = 0; // 自言自语
var init_dialog_at_home=0; // 出生点初始对话

// street_from_home_to_bar
var villager_01=0;

// bar
var barman=0;
var student_01=0;
var old_knight=0;

// gem_room
var old_knight_gem=0;

// 物品相关
var paper_at_home=0;
var gem=0;
