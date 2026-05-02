const canvas = document.getElementById("cnvs");
canvas.width = 1400;
canvas.height = 600;

const ctx = canvas.getContext("2d");

const gridSize = 20;

let snake = [{x:5, y:5}];

function makeFood(){
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)),
            y: Math.floor(Math.random() * (canvas.height / gridSize))
        };
    }
    while (
        snake.some(s => s.x === newFood.x && s.y === newFood.y)
    );

    return newFood;
}

food = makeFood();


let dx = 0;
let dy = 0;
let started = false;

function gameLoop() {
    update();
    draw();
}

setInterval(gameLoop, 100);


function update() {
    if (!started) return;

    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };
    
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)),
            y: Math.floor(Math.random() * (canvas.height / gridSize))
        };
    } else {
        snake.pop();
    }

}

function draw() {
    
    ctx.clearRect(0,0,canvas.width, canvas.height);

    ctx.fillStyle = "black";

    snake.forEach(seg => {
        ctx.fillRect(
            seg.x*gridSize,
            seg.y*gridSize,
            gridSize,
            gridSize
        );
    });

    ctx.fillStyle = "red";
    ctx.fillRect(
    food.x * gridSize,
    food.y * gridSize,
    gridSize,
    gridSize
    );
}

document.addEventListener("keydown", (e) => {

    if (!started) {
        started = true; 
    }

    if (e.key === "ArrowUp" && dy === 0) {
        dx = 0; dy = -1;
    }
    else if (e.key === "ArrowDown" && dy === 0) {
        dx = 0; dy = 1;
    }
    else if (e.key === "ArrowLeft" && dx === 0) {
        dx = -1; dy = 0;
    }
    else if (e.key === "ArrowRight" && dx === 0) {
        dx = 1; dy = 0;
    }
});






