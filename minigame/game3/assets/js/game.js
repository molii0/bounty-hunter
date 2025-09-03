const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const TILE_SIZE = 66;
const ROWS = 15;
const COLS = 25;

// 加载游戏图片资源
const images = {
  player: new Image(),
  enemy: new Image(),
  wall: new Image(),
  exit: new Image()
};

// 游戏加载状态
let gameLoaded = false;
let loadedImages = 0;
const totalImages = Object.keys(images).length;

// 加载所有图片
images.player.src = 'assets/images/player.png';
images.enemy.src = 'assets/images/enemy.png';
images.wall.src = 'assets/images/wall.png';
images.exit.src = 'assets/images/exit.png';

// 图片加载完成事件
for (const key in images) {
  images[key].onload = function() {
    loadedImages++;
    if (loadedImages === totalImages) {
      gameLoaded = true;
      console.log('所有图片加载完成');
    }
  };
  
  // 图片加载失败处理
  images[key].onerror = function() {
    console.error(`图片 ${key} 加载失败`);
  };
}

// ===== 地图 (0=空地,1=墙,2=出口) =====
let map = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1],
  [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

// 游戏状态
let gameState = {
  isGameOver: false,
  isWin: false
};

// ===== 玩家 =====
let player = {
  x: TILE_SIZE*1.5,
  y: TILE_SIZE*1.5,
  size: TILE_SIZE*0.8,
  color: 'yellow',
  speed: 4,
  health: 4,
  attacking: false,
  attackDir: null,
  attackProgress: 0
};

// ===== 敌人 =====
let enemies = [];
for(let i=0;i<5;i++){ // 生成5个敌人
  let ex,ey;
  do {
    ex = Math.floor(Math.random()*(COLS-2)+1)*TILE_SIZE;
    ey = Math.floor(Math.random()*(ROWS-2)+1)*TILE_SIZE;
  } while(map[Math.floor(ey/TILE_SIZE)][Math.floor(ex/TILE_SIZE)]!==0);
  enemies.push({
    x: ex, 
    y: ey, 
    size: TILE_SIZE*0.8, 
    alive: true, 
    health: 2, // 敌人血量，受击两次后死亡
    moveTimer: 0,
    moveInterval: Math.floor(Math.random() * 40) + 20, // 减少移动间隔，使敌人移动更频繁
    moveDir: Math.floor(Math.random() * 4), // 随机移动方向: 0=上, 1=右, 2=下, 3=左
    speed: Math.random() * 1 + 2, // 敌人移动速度，比之前更快
    attackTimer: 0,
    attackInterval: Math.floor(Math.random() * 60) + 60, // 攻击间隔
    attacking: false,
    attackDir: Math.floor(Math.random() * 4), // 攻击方向
    attackProgress: 0,
    lastHitTime: 0, // 上次被击中的时间，用于实现短暂无敌时间
    targetPlayer: false // 是否已经发现并追踪玩家
  });
}

// ===== 键盘控制 =====
const keys = {};
document.addEventListener('keydown', e=>{ keys[e.key.toLowerCase()] = true; });
document.addEventListener('keyup', e=>{ keys[e.key.toLowerCase()] = false; });

// ===== 碰撞检测 =====
function getTileType(x, y) {
  const col = Math.floor(x/TILE_SIZE);
  const row = Math.floor(y/TILE_SIZE);
  if (row < 0 || row >= ROWS || col < 0 || col >= COLS) {
    return 1; // 超出地图边界视为墙
  }
  return map[row][col];
}

function isWall(x, y) {
  return getTileType(x, y) === 1;
}

function isExit(x, y) {
  return getTileType(x, y) === 2;
}

// ===== 玩家更新 =====
function updatePlayer(){
  // 如果游戏已结束，不再更新玩家
  if (gameState.isGameOver) return;
  
  let dx=0,dy=0;
  let lastDirection = player.attackDir || 'right'; // 默认方向
  
  if(keys['w']) {
    dy-=player.speed;
    lastDirection = 'up';
  }
  if(keys['s']) {
    dy+=player.speed;
    lastDirection = 'down';
  }
  if(keys['a']) {
    dx-=player.speed;
    lastDirection = 'left';
  }
  if(keys['d']) {
    dx+=player.speed;
    lastDirection = 'right';
  }

  // 更精确的碰撞检测
  let newX = player.x + dx;
  let newY = player.y + dy;
  
  // 检测中心点和四个角的碰撞
  // 为了避免卡住，我们使用更宽松的碰撞检测，只检查中心点和四个角的中点
  let margin = 2; // 添加一个小边距，避免卡墙
  
  // X方向移动检测
  let canMoveX = true;
  if (dx !== 0) {
    // 检测前方中心点
    let frontX = dx > 0 ? newX + player.size : newX;
    let centerY = player.y + player.size / 2;
    if (isWall(frontX, centerY)) {
      canMoveX = false;
    }
  }
  
  // Y方向移动检测
  let canMoveY = true;
  if (dy !== 0) {
    // 检测前方中心点
    let frontY = dy > 0 ? newY + player.size : newY;
    let centerX = player.x + player.size / 2;
    if (isWall(centerX, frontY)) {
      canMoveY = false;
    }
  }
  
  if(canMoveX) player.x = newX;
  if(canMoveY) player.y = newY;

  // 保存最后移动方向
  if(dx !== 0 || dy !== 0) {
    player.attackDir = lastDirection;
  }

  // 使用j键攻击，攻击方向与移动方向一致
  if(keys['j']) attack(player.attackDir);
  
  // 检测是否到达出口
  let playerCenterX = player.x + player.size / 2;
  let playerCenterY = player.y + player.size / 2;
  if (isExit(playerCenterX, playerCenterY)) {
    gameState.isGameOver = true;
    gameState.isWin = true;
    return;
  }

  // 检查玩家是否死亡
  if (player.health <= 0) {
    gameState.isGameOver = true;
    gameState.isWin = false;
    return;
  }

  // 检测攻击敌人
  if(player.attacking){
    enemies.forEach((e)=>{
      if(!e.alive) return;
      let attackX = player.x;
      let attackY = player.y;
      let attackWidth = TILE_SIZE;
      let attackHeight = player.size/2;
      
      // 根据攻击方向调整攻击区域
      if(player.attackDir === 'right') {
        attackX += player.size;
      } else if(player.attackDir === 'left') {
        attackX -= TILE_SIZE;
      } else if(player.attackDir === 'up') {
        attackY -= TILE_SIZE;
        attackWidth = player.size/2;
        attackHeight = TILE_SIZE;
      } else if(player.attackDir === 'down') {
        attackY += player.size;
        attackWidth = player.size/2;
        attackHeight = TILE_SIZE;
      }
      
      // 检测攻击是否命中敌人
      if(attackX < e.x+e.size && attackX+attackWidth > e.x &&
         attackY < e.y+e.size && attackY+attackHeight > e.y){
         // 获取当前时间
         const currentTime = Date.now();
         // 检查是否在无敌时间内
         if (currentTime - e.lastHitTime > 500) { // 0.5秒无敌时间
           // 减少敌人血量
           e.health--;
           // 更新最后被击中时间
           e.lastHitTime = currentTime;
           
           // 敌人受击后退
           const knockbackDistance = 15;
           if(player.attackDir === 'right') {
             e.x += knockbackDistance;
           } else if(player.attackDir === 'left') {
             e.x -= knockbackDistance;
           } else if(player.attackDir === 'up') {
             e.y -= knockbackDistance;
           } else if(player.attackDir === 'down') {
             e.y += knockbackDistance;
           }
           
           // 检查敌人是否死亡
           if(e.health <= 0){
             e.alive = false;
           }
         }
      }
    });
  }
}

// ===== 攻击 =====
function attack(dir){
  if(!player.attacking){
    player.attacking=true;
    player.attackDir=dir;
    player.attackProgress=0;
  }
}

// ===== 敌人更新 =====
function updateEnemies(){
  // 如果游戏已结束，不再更新敌人
  if (gameState.isGameOver) return;
  
  enemies.forEach(e=>{
    if(!e.alive) return;
    
    // 增加移动计时器
    e.moveTimer++;
    
    // 增加攻击计时器
    e.attackTimer++;
    
    // 检测是否发现玩家（视野范围内）
    const distanceToPlayer = Math.sqrt(
      Math.pow(player.x + player.size/2 - (e.x + e.size/2), 2) + 
      Math.pow(player.y + player.size/2 - (e.y + e.size/2), 2)
    );
    
    // 如果玩家在视野范围内（5个格子），敌人会追踪玩家
    if (distanceToPlayer < TILE_SIZE * 5) {
      e.targetPlayer = true;
    } else if (Math.random() < 0.01) { // 1%概率停止追踪
      e.targetPlayer = false;
    }
    
    // 处理敌人移动
    if(e.moveTimer >= e.moveInterval){
      // 重置计时器
      e.moveTimer = 0;
      
      let dx = 0, dy = 0;
      
      // 如果在追踪玩家，朝玩家方向移动
      if (e.targetPlayer) {
        // 计算玩家相对于敌人的方向
        const playerCenterX = player.x + player.size/2;
        const playerCenterY = player.y + player.size/2;
        const enemyCenterX = e.x + e.size/2;
        const enemyCenterY = e.y + e.size/2;
        
        // 确定主要移动方向（水平或垂直）
        const horizontalDist = Math.abs(playerCenterX - enemyCenterX);
        const verticalDist = Math.abs(playerCenterY - enemyCenterY);
        
        // 优先选择距离更远的方向移动
        if (horizontalDist > verticalDist) {
          // 水平移动
          if (playerCenterX > enemyCenterX) {
            e.moveDir = 1; // 右
          } else {
            e.moveDir = 3; // 左
          }
        } else {
          // 垂直移动
          if (playerCenterY > enemyCenterY) {
            e.moveDir = 2; // 下
          } else {
            e.moveDir = 0; // 上
          }
        }
        
        // 10%概率随机移动，避免敌人移动过于机械
        if (Math.random() < 0.1) {
          e.moveDir = Math.floor(Math.random() * 4);
        }
      } else {
        // 随机改变方向 (20%概率)
        if(Math.random() < 0.2){
          e.moveDir = Math.floor(Math.random() * 4);
        }
      }
      
      // 根据方向移动
      switch(e.moveDir){
        case 0: dy = -e.speed; break; // 上
        case 1: dx = e.speed; break;  // 右
        case 2: dy = e.speed; break;  // 下
        case 3: dx = -e.speed; break; // 左
      }
      
      // 检测移动后是否会撞墙
      let newX = e.x + dx;
      let newY = e.y + dy;
      
      // 检测中心点
      let centerX = newX + e.size/2;
      let centerY = newY + e.size/2;
      
      if(!isWall(centerX, centerY)){
        e.x = newX;
        e.y = newY;
      } else {
        // 撞墙则随机选择新方向
        e.moveDir = Math.floor(Math.random() * 4);
      }
      
      // 检测与玩家的碰撞
      if(e.x < player.x + player.size && 
         e.x + e.size > player.x && 
         e.y < player.y + player.size && 
         e.y + e.size > player.y){
        // 碰到玩家造成伤害
        player.health = Math.max(0, player.health - 1);
        
        // 检查玩家是否死亡
        if(player.health <= 0){
          gameState.isGameOver = true;
          gameState.isWin = false;
        }
        
        // 敌人后退
        const knockbackDistance = 15;
        switch(e.moveDir){
          case 0: e.y += knockbackDistance; break; // 上移动时，向下退
          case 1: e.x -= knockbackDistance; break; // 右移动时，向左退
          case 2: e.y -= knockbackDistance; break; // 下移动时，向上退
          case 3: e.x += knockbackDistance; break; // 左移动时，向右退
        }
      }
    }
    
    // 处理敌人攻击
    if (e.attackTimer >= e.attackInterval) {
      // 检查玩家是否在攻击范围内
      const distanceToPlayer = Math.sqrt(
        Math.pow(player.x + player.size/2 - (e.x + e.size/2), 2) + 
        Math.pow(player.y + player.size/2 - (e.y + e.size/2), 2)
      );
      
      if (distanceToPlayer < TILE_SIZE * 2) { // 如果玩家在2个格子范围内
        // 设置攻击方向朝向玩家
        const playerCenterX = player.x + player.size/2;
        const playerCenterY = player.y + player.size/2;
        const enemyCenterX = e.x + e.size/2;
        const enemyCenterY = e.y + e.size/2;
        
        // 确定攻击方向
        const horizontalDist = Math.abs(playerCenterX - enemyCenterX);
        const verticalDist = Math.abs(playerCenterY - enemyCenterY);
        
        if (horizontalDist > verticalDist) {
          // 水平攻击
          if (playerCenterX > enemyCenterX) {
            e.attackDir = 1; // 右
          } else {
            e.attackDir = 3; // 左
          }
        } else {
          // 垂直攻击
          if (playerCenterY > enemyCenterY) {
            e.attackDir = 2; // 下
          } else {
            e.attackDir = 0; // 上
          }
        }
        
        // 开始攻击
        e.attacking = true;
        e.attackProgress = 0;
        e.attackTimer = 0;
      }
    }
    
    // 处理敌人攻击进度
    if (e.attacking) {
      e.attackProgress++;
      
      // 检测攻击是否命中玩家
      if (e.attackProgress === 3) { // 在攻击动画中间检测碰撞
        let attackX = e.x;
        let attackY = e.y;
        let attackWidth = TILE_SIZE;
        let attackHeight = e.size/2;
        
        // 根据攻击方向调整攻击区域
        switch(e.attackDir) {
          case 1: // 右
            attackX += e.size;
            break;
          case 3: // 左
            attackX -= TILE_SIZE;
            break;
          case 0: // 上
            attackY -= TILE_SIZE;
            attackWidth = e.size/2;
            attackHeight = TILE_SIZE;
            break;
          case 2: // 下
            attackY += e.size;
            attackWidth = e.size/2;
            attackHeight = TILE_SIZE;
            break;
        }
        
        // 检查攻击区域是否穿墙
        let canAttack = true;
        
        // 检查攻击区域的四个角是否有墙
        if (isWall(attackX, attackY) || 
            isWall(attackX + attackWidth, attackY) || 
            isWall(attackX, attackY + attackHeight) || 
            isWall(attackX + attackWidth, attackY + attackHeight)) {
          canAttack = false;
        }
        
        // 只有在没有墙壁阻挡的情况下才能攻击到玩家
        if (canAttack && 
            attackX < player.x + player.size && 
            attackX + attackWidth > player.x && 
            attackY < player.y + player.size && 
            attackY + attackHeight > player.y) {
          // 玩家受到伤害
          player.health = Math.max(0, player.health - 1);
          
          // 检查玩家是否死亡
          if(player.health <= 0) {
            gameState.isGameOver = true;
            gameState.isWin = false;
          }
        }
      }
      
      // 攻击动画结束
      if (e.attackProgress > 10) {
        e.attacking = false;
      }
    }
  });
}

// ===== 绘制 =====
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // 如果游戏尚未加载完成，显示加载信息
  if (!gameLoaded) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('加载中...', canvas.width / 2, canvas.height / 2);
    return;
  }

  // 绘制地图
for(let r=0;r<ROWS;r++){
  for(let c=0;c<COLS;c++){
    let tile = map[r][c];
    let x=c*TILE_SIZE, y=r*TILE_SIZE;
    if (tile === 1) {
      // 墙壁
      ctx.drawImage(images.wall, x, y, TILE_SIZE, TILE_SIZE);
    } else if (tile === 2) {
      // 出口
      ctx.drawImage(images.exit, x, y, TILE_SIZE, TILE_SIZE);
    } else {
      // 空地
      ctx.fillStyle = '#808080';
      ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    }
  }
}

  // 绘制敌人
enemies.forEach(e=>{
  if(!e.alive) return;
  // 绘制敌人
  ctx.drawImage(images.enemy, e.x, e.y, e.size, e.size);
  
  // 绘制敌人攻击
  if(e.attacking){
    ctx.fillStyle = 'orange';
    let attackX = e.x;
    let attackY = e.y;
    let attackWidth = TILE_SIZE;
    let attackHeight = e.size/2;
    
    // 根据攻击方向调整攻击区域
    switch(e.attackDir) {
      case 1: // 右
        attackX += e.size;
        break;
      case 3: // 左
        attackX -= TILE_SIZE;
        break;
      case 0: // 上
        attackY -= TILE_SIZE;
        attackWidth = e.size/2;
        attackHeight = TILE_SIZE;
        break;
      case 2: // 下
        attackY += e.size;
        attackWidth = e.size/2;
        attackHeight = TILE_SIZE;
        break;
    }
    
    ctx.fillRect(attackX, attackY, attackWidth, attackHeight);
  }
});

// 绘制玩家
ctx.drawImage(images.player, player.x, player.y, player.size, player.size);

  // 绘制攻击
  if(player.attacking){
    ctx.fillStyle='orange';
    let attackX = player.x;
    let attackY = player.y;
    let attackWidth = TILE_SIZE;
    let attackHeight = player.size/2;
    
    // 根据攻击方向调整攻击区域
    if(player.attackDir === 'right') {
      attackX += player.size;
    } else if(player.attackDir === 'left') {
      attackX -= TILE_SIZE;
    } else if(player.attackDir === 'up') {
      attackY -= TILE_SIZE;
      attackWidth = player.size/2;
      attackHeight = TILE_SIZE;
    } else if(player.attackDir === 'down') {
      attackY += player.size;
      attackWidth = player.size/2;
      attackHeight = TILE_SIZE;
    }
    
    ctx.fillRect(attackX, attackY, attackWidth, attackHeight);
    player.attackProgress++;
    if(player.attackProgress>5) player.attacking=false;
  }

  // 绘制血量
  for(let i=0;i<player.health;i++){
    ctx.fillStyle='red';
    ctx.beginPath();
    let heartX=10+i*35, heartY=10;
    ctx.moveTo(heartX,heartY);
    ctx.arc(heartX,heartY,10,Math.PI,0);
    ctx.arc(heartX+20,heartY,10,Math.PI,0);
    ctx.lineTo(heartX+10,heartY+20);
    ctx.closePath();
    ctx.fill();
  }
  
  // 绘制游戏结束信息
  if (gameState.isGameOver) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = gameState.isWin ? 'green' : 'red';
    
    let message = gameState.isWin ? '恭喜你，通关成功！' : '游戏结束！';
    ctx.fillText(message, canvas.width / 2, canvas.height / 2);
    
    ctx.font = '24px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('按空格键重新开始', canvas.width / 2, canvas.height / 2 + 50);
  }
}

// ===== 重置游戏 =====
function resetGame() {
  // 重置玩家
  player.x = TILE_SIZE*1.5;
  player.y = TILE_SIZE*1.5;
  player.health = 4;
  player.attacking = false;
  player.attackDir = 'right';
  player.attackProgress = 0;
  
  // 重置敌人
  enemies = [];
  for(let i=0;i<5;i++){
    let ex,ey;
    do {
      ex = Math.floor(Math.random()*(COLS-2)+1)*TILE_SIZE;
      ey = Math.floor(Math.random()*(ROWS-2)+1)*TILE_SIZE;
    } while(map[Math.floor(ey/TILE_SIZE)][Math.floor(ex/TILE_SIZE)]!==0);
    enemies.push({
      x: ex, 
      y: ey, 
      size: TILE_SIZE*0.8, 
      alive: true, 
      health: 2, // 敌人血量，受击两次后死亡
      moveTimer: 0,
      moveInterval: Math.floor(Math.random() * 40) + 20, // 减少移动间隔，使敌人移动更频繁
      moveDir: Math.floor(Math.random() * 4), // 随机移动方向: 0=上, 1=右, 2=下, 3=左
      speed: Math.random() * 1 + 2, // 敌人移动速度，比之前更快
      attackTimer: 0,
      attackInterval: Math.floor(Math.random() * 60) + 60, // 攻击间隔
      attacking: false,
      attackDir: Math.floor(Math.random() * 4), // 攻击方向
      attackProgress: 0,
      lastHitTime: 0, // 上次被击中的时间，用于实现短暂无敌时间
      targetPlayer: false // 是否已经发现并追踪玩家
    });
  }
  
  // 重置游戏状态
  gameState.isGameOver = false;
  gameState.isWin = false;
}

// ===== 键盘事件处理 =====
document.addEventListener('keydown', e => {
  keys[e.key.toLowerCase()] = true;
  
  // 游戏结束时按空格重新开始
  if (gameState.isGameOver && e.key === ' ') {
    resetGame();
  }
});

// ===== 游戏循环 =====
function gameLoop(){
  // 检查图片是否已加载完成
  if (!gameLoaded) {
    // 显示加载中提示
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('加载中...', canvas.width/2, canvas.height/2);
    
    // 显示加载进度
    ctx.fillText(`${loadedImages}/${totalImages}`, canvas.width/2, canvas.height/2 + 40);
    
    requestAnimationFrame(gameLoop);
    return;
  }
  
  updatePlayer();
  updateEnemies();
  draw();
  requestAnimationFrame(gameLoop);
}

// 开始游戏
gameLoop();
