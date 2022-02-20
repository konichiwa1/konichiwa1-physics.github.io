var canvas = document.getElementById("canvas");

canvas.width = 0.976*window.innerWidth;
canvas.height = 0.75*window.innerHeight;

var ctx = canvas.getContext("2d");

const g = 0.1;

function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    let vel = 0;
    let stopped = false;

    this.draw = () => {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        ctx.fill();
    }

    this.update = () => {
        
        if(!this.stopped) {
            this.y += vel;
            vel += g;
        }

        if(this.y+this.radius > canvas.height) {
            let vel1 = vel;
            vel = -vel+g+0.2*vel;
            this.y = canvas.height-this.radius;

            if(Math.abs(vel+vel1)<=0.2) {
                this.stopped = true;
            }
        }

        this.draw();
    }
}

var balls = [];
for(var i=0; i<5; i++) {
    balls.push(new Circle(canvas.width/10+i*(canvas.width/5), 30+i*80, 30, getRandomColor())); 
}

function animate() {
    window.requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i=0; i<5; i++) {
        balls[i].update();
    }
}

animate();

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
