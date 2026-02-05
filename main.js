const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
addEventListener("resize", resize);
resize();

let y = 0;
let vy = 0;
let score = 0;
let speed = 8;
let dead = false;
const obstacles = [];

function ground(){
  return canvas.height * 0.75;
}

function spawnObstacle(){
  obstacles.push({ x: canvas.width + 40, w: 40, h: 50 });
}
setInterval(spawnObstacle, 900);

function jump(){
  if(y === 0){
    vy = 18;
  }
}

addEventListener("keydown", e => {
  if(e.code === "Space") jump();
});

document.getElementById("jumpBtn").onclick = jump;
document.getElementById("jumpBtn").ontouchstart = jump;

function loop(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // physics
  vy -= 1.2;
  y += vy;
  if(y < 0){ y = 0; vy = 0; }

  // player
  ctx.fillStyle = "#00ffff";
  ctx.fillRect(80, ground() - y - 60, 40, 60);

  // obstacles
  for(let o of obstacles){
    o.x -= speed;
    ctx.fillStyle = "#ff00ff";
    ctx.fillRect(o.x, ground() - o.h, o.w, o.h);

    if(o.x < 120 && o.x + o.w > 80 && y < o.h){
      dead = true;
    }
  }

  while(obstacles[0] && obstacles[0].x < -60){
    obstacles.shift();
  }

  // ground
  ctx.fillStyle = "#111";
  ctx.fillRect(0, ground(), canvas.width, 4);

  if(!dead){
    score++;
    speed += 0.002;
    document.getElementById("score").textContent = score;
    requestAnimationFrame(loop);
  }else{
    ctx.fillStyle = "#ff0033";
    ctx.font = "bold 40px system-ui";
    ctx.fillText("GAME OVER", canvas.width/2 - 120, canvas.height/2);
  }
}

loop();
