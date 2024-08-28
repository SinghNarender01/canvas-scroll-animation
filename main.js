const cnv = document.querySelector('canvas');
const ctx = cnv.getContext('2d');

const W = (cnv.width = innerWidth);
const H = (cnv.height = innerHeight);

let balls = [];
let maxDist 
function randomNumberGenerator(min, max) {
  let num = [-1,1]
  let randomNum = Math.round(Math.random() * (max - min) + min);
  if (randomNum > -0.5 && randomNum < 0.5) {
    randomNum += num[Math.floor(Math.random() * 2)]
  }

  return randomNum;
}

function randomColorGenerator(colors) {
  return `hsl(${Math.random() * 360},70%,50%)`;
}

function Balls(x, y, r, dx, dy) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.dx = dx;
  this.dy = dy;
  this.c = randomColorGenerator();
  this.x0 = x; // Store initial x position
  this.y0 = y; // Store initial y position

  this.draw = () => {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  };

  this.check = (index) => {
    // Calculate the distance traveled from the original position
    
    
    const distTraveled = Math.sqrt(
      Math.pow(this.x - this.x0, 2) + Math.pow(this.y - this.y0, 2)
    );
    

    // Remove the ball if it has traveled a certain distance (e.g., 200 pixels)
    
   
if (distTraveled > maxDist){
      balls.splice(index,1)
    }

    
  };

  this.update = (index) => {
    this.draw();

    this.x += this.dx;
    this.y += this.dy;

    this.check(index);
  };
}

function init(x, y,b) {
  for (var i = 0; i < b; i++) {
    let r = randomNumberGenerator(5, 20);
    let dx = randomNumberGenerator(-4, 4);
    let dy = randomNumberGenerator(-4, 4);

    balls.push(new Balls(x, y, r, dx, dy));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0,0,0,0.07";
  ctx.fillRect(0, 0, W, H);

  balls.forEach((ball, i) => {
    ball.update(i);
  });
}

animate();

init(W / 2, H / 2,);

window.addEventListener("touchmove", (e) => {
  maxDist = randomNumberGenerator(50,500)
  let X = e.touches[0].clientX;
  let Y = e.touches[0].clientY;
  init(X, Y,50);
});

