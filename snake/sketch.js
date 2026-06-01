let snake;
let rez = 20;
let food;
let w;
let h;

let score = 0;

let gameState = "start"; // start, playing, gameover

function setup() {
    createCanvas(400, 400);

    w = floor(width / rez);
    h = floor(height / rez);

    frameRate(8);

    startGame();
}

function startGame() {
    snake = new Snake();
    score = 0;
    foodLocation();
}

function foodLocation() {

    let valid = false;

    while (!valid) {

        let x = floor(random(w));
        let y = floor(random(h));

        valid = true;

        // Make sure apple does NOT appear on snake
        for (let part of snake.body) {
            if (part.x === x && part.y === y) {
                valid = false;
                break;
            }
        }

        if (valid) {
            food = createVector(x, y);
        }
    }
}

function keyPressed() {

    // ENTER starts or restarts game
    if (keyCode === ENTER) {

        if (gameState === "start" || gameState === "gameover") {
            startGame();
            gameState = "playing";
        }
    }

    if (gameState !== "playing") return;

    if (keyCode === LEFT_ARROW) {
        snake.setDir(-1, 0);
    }
    else if (keyCode === RIGHT_ARROW) {
        snake.setDir(1, 0);
    }
    else if (keyCode === DOWN_ARROW) {
        snake.setDir(0, 1);
    }
    else if (keyCode === UP_ARROW) {
        snake.setDir(0, -1);
    }
}

function draw() {

    // Green background
    background(34, 139, 34);

    // Start Screen
    if (gameState === "start") {

        fill(255);
        textAlign(CENTER, CENTER);

        textSize(32);
        text("SNAKE GAME", width / 2, height / 2 - 40);

        textSize(20);
        text("Press ENTER to Start", width / 2, height / 2 + 20);

        return;
    }

    // Gameover screen
    if (gameState === "gameover") {

        fill(255);
        textAlign(CENTER, CENTER);

        textSize(30);
        text("YOU DIED!", width / 2, height / 2 - 40);

        textSize(20);
        text("Final Score: " + score, width / 2, height / 2);

        text("Press ENTER to Play Again", width / 2, height / 2 + 40);

        return;
    }

    // Game play 
    scale(rez);

    if (snake.eat(food)) {
        score++;
        foodLocation();
    }

    snake.update();

    if (snake.endGame()) {
        gameState = "gameover";
    }

    snake.show();

    // Food
    fill(255, 0, 0);
    rect(food.x, food.y, 1, 1);

    // Reset scale for score text
    resetMatrix();

    // Score Display
    fill(255);
    textSize(20);
    textAlign(LEFT, TOP);
    text("Score: " + score, 10, 10);
}
