const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const backgroundImg = new Image();
backgroundImg.src = "./assets/image/tavern_second_floor.png"; // 背景图


// 玩家 & 敌人属性
let player = { 
  x: 200, y: 300, width: 50, height: 80, 
  health: 100, speed: 5, attacking: false, attackFrame: 0,
  jumping: false, vy: 0, facing: "right" 
};
let enemy  = { 
  x: 550, y: 300, width: 50, height: 80, 
  health: 100, speed: 3.5, attacking: false, attackFrame: 0,
  jumping: false, vy: 0, facing: "left"
};

const gravity = 0.6;
const ground = 300;

// 按键状态
let keys = {};
document.addEventListener("keydown", e => {
  keys[e.key] = true;

  if (e.key === " " && !player.attacking) {
    player.attacking = true;
    player.attackFrame = 0;
  }

  if (e.key === "w" && !player.jumping) {
    player.jumping = true;
    player.vy = -12;
  }
});
document.addEventListener("keyup", e => keys[e.key] = false);

function checkCollision(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x &&
         a.y < b.y + b.height && a.y + a.height > b.y;
}

// 绘制人物 & 攻击动画
function drawEntity(entity, color) {
  ctx.fillStyle = color;
  ctx.fillRect(entity.x, entity.y, entity.width, entity.height);

  if (entity.attacking) {
    ctx.fillStyle = "yellow";
    let swordLength = 40;
    let swordWidth = 12;
    let swordOffset = Math.min(entity.attackFrame * 3, swordLength);

    if (entity.facing === "right") {
      ctx.fillRect(entity.x + entity.width, entity.y + 25, swordOffset, swordWidth);
    } else {
      ctx.fillRect(entity.x - swordOffset, entity.y + 25, swordOffset, swordWidth);
    }

    entity.attackFrame++;

    if (entity.attackFrame === 6) {
      if (color === "blue" && checkCollision(entity, enemy)) {
        enemy.health = Math.max(0, enemy.health - 10);
        console.log("玩家击中敌人！敌人血量:", enemy.health);
      }
      if (color === "red" && checkCollision(entity, player)) {
        player.health = Math.max(0, player.health - 8);
        console.log("敌人击中玩家！玩家血量:", player.health);
      }
    }

    if (entity.attackFrame > 20) {
      entity.attacking = false;
      entity.attackFrame = 0;
    }
  }
}

// 更新玩家
function updatePlayer() {
  if (keys["a"] && player.x > 0) {
    player.x -= player.speed;
    player.facing = "left";
  }
  if (keys["d"] && player.x < canvas.width - player.width) {
    player.x += player.speed;
    player.facing = "right";
  }

  if (player.jumping) {
    player.y += player.vy;
    player.vy += gravity;
    if (player.y >= ground) {
      player.y = ground;
      player.jumping = false;
    }
  }
}

// 更新敌人AI
function updateEnemy() {
  let distance = Math.abs(player.x - enemy.x);

  if (distance > 70) {
    if (player.x < enemy.x) {
      enemy.x -= enemy.speed;
      enemy.facing = "left";
    } else {
      enemy.x += enemy.speed;
      enemy.facing = "right";
    }
  }

  if (!enemy.jumping && Math.random() < 0.005) {
    enemy.jumping = true;
    enemy.vy = -10;
  }

  if (enemy.jumping) {
    enemy.y += enemy.vy;
    enemy.vy += gravity;
    if (enemy.y >= ground) {
      enemy.y = ground;
      enemy.jumping = false;
    }
  }

  if (!enemy.attacking) {
    if (distance < 100 && Math.random() < 0.02) {
      enemy.attacking = true;
      enemy.attackFrame = 0;
    }
  }
}

function drawHealthBars() {
  ctx.fillStyle = "red";
  ctx.fillRect(20, 20, Math.max(0, player.health) * 2, 20);
  ctx.strokeStyle = "white";
  ctx.strokeRect(20, 20, 200, 20);

  ctx.fillStyle = "red";
  ctx.fillRect(560, 20, Math.max(0, enemy.health) * 2, 20);
  ctx.strokeStyle = "white";
  ctx.strokeRect(560, 20, 200, 20);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

  updatePlayer();
  updateEnemy();

  drawEntity(player, "blue");
  drawEntity(enemy, "red");

  drawHealthBars();

  if (player.health <= 0) {
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("你输了！", 330, 200);
    if (window.parent) {
        window.parent.postMessage('lose_game1', '*');
    }
  } else if (enemy.health <= 0) {
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("你赢了！", 330, 200);
    if (window.parent) {
        window.parent.postMessage('win_game1', '*');
    }
  } else {
    requestAnimationFrame(gameLoop);
  }
}

backgroundImg.onload = () => gameLoop();
