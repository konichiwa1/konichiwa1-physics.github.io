var canvas = document.getElementById("canvas");
var leftButton = document.getElementById("left");
var rightButton = document.getElementById("right");

canvas.width = 0.96*window.innerWidth;
canvas.height = 0.75*window.innerHeight;

var ctx = canvas.getContext("2d");

var pistonPosition = canvas.width-20;

function Ball(x, y, radius, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;

    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.update = () => {
        this.x += this.dx;
        this.y += this.dy;

        if(this.x+this.radius > pistonPosition) {
            this.dx = -this.dx;
            this.x = pistonPosition-this.radius;
        } else if(this.x-this.radius < 0) {
            this.dx = -this.dx;
            this.x = this.radius;
        }
        if(this.y+this.radius > canvas.height) {
            this.dy = -this.dy;
            this.y = canvas.height-this.radius;
        } else if(this.y-this.radius < 0) {
            this.dy = -this.dy;
            this.y = this.radius;
        }
        this.draw();
    }
}

var balls = [];

let N=100;

for(let i=0; i<N; i++) {
    let radius = 10;
    let x = Math.random()*(pistonPosition-radius);
    if(x-radius<0) x=radius;
    let y = Math.random()*(canvas.height-radius);
    if(y-radius<0) y=radius;
    let dx = (Math.random()-0.5)*20;
    let dy = (Math.random()-0.5)*20;
    balls.push(new Ball(x, y, radius, dx, dy, "blue"));
}


function animate() {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(pistonPosition, 0);
    ctx.lineTo(pistonPosition, canvas.height);
    ctx.lineTo(pistonPosition+20, canvas.height);
    ctx.lineTo(pistonPosition+20, canvas.height/2+25);
    ctx.lineTo(canvas.width, canvas.height/2+25);
    ctx.lineTo(canvas.width, canvas.height/2-25);
    ctx.lineTo(pistonPosition+20, canvas.height/2-25);
    ctx.lineTo(pistonPosition+20, 0);
    ctx.lineTo(pistonPosition, 0);
    ctx.fillStyle = "brown"
    ctx.fill();
    ctx.stroke();

    for(let i=0; i<N; i++) {
        balls[i].update();
    }

    for(let i=0; i<N; i++) {
        for(let j=i+1; j<N; j++) {
            checkAndImplementCollision(balls[i], balls[j]);
        }
    }
}

animate();

function getDistance(ball1, ball2) {
    let x = ball1.x-ball2.x;
    let y = ball1.y-ball2.y;
    return Math.sqrt(x*x + y*y);
}

function checkAndImplementCollision(ball1, ball2) {
    if(getDistance(ball1, ball2) < ball1.radius + ball2.radius) {
        [ball1.dx, ball2.dx] = [ball2.dx, ball1.dx];
        [ball1.dy, ball2.dy] = [ball2.dy, ball1.dy];
        let radialVec = {x: ball1.x-ball2.x, y: ball1.y-ball2.y};
        let d = getDistance(ball1, ball2);
        let r = ball1.radius + ball2.radius;
        let sin = radialVec.y/d, cos = radialVec.x/d;
        ball2.x = ball1.x - r*cos;
        ball2.y = ball1.y - r*sin;

    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

window.addEventListener("keydown", (e)=>{
    if(e.keyCode==37) {
        if(pistonPosition > canvas.width/10) pistonPosition -= 5;
    }else if(e.keyCode==39) {
        if(pistonPosition+20 < canvas.width) pistonPosition += 5;
    }
})

leftButton.onclick = ()=>{
    if(pistonPosition > canvas.width/10) pistonPosition -= 5;
}

rightButton.onclick = ()=>{
    if(pistonPosition+20 < canvas.width) pistonPosition += 5;
}
