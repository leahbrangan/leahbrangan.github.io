class Snake {

    constructor() {

        this.body = [];
        this.body[0] = createVector(floor(w / 2), floor(h / 2));

        this.xdir = 1;
        this.ydir = 0;

        this.len = 1;
    }

    setDir(x, y) {
        this.xdir = x;
        this.ydir = y;
    }

    update() {

        let head = this.body[this.body.length - 1].copy();

        head.x += this.xdir;
        head.y += this.ydir;

        this.body.push(head);

        while (this.body.length > this.len) {
            this.body.shift();
        }
    }

    grow() {
        this.len++;
    }

    endGame() {

        let head = this.body[this.body.length - 1];

        // Wall collision
        if (head.x > w - 1 || head.x < 0 || head.y > h - 1 || head.y < 0) {
            return true;
        }

        // Self collision
        for (let i = 0; i < this.body.length - 1; i++) {

            let part = this.body[i];

            if (part.x === head.x && part.y === head.y) {
                return true;
            }
        }

        return false;
    }

    eat(pos) {

        let head = this.body[this.body.length - 1];

        if (head.x === pos.x && head.y === pos.y) {

            this.grow();
            return true;
        }

        return false;
    }

    show() {

        // Blue snake
        fill(0, 100, 255);
        noStroke();

        for (let i = 0; i < this.body.length; i++) {

            rect(this.body[i].x, this.body[i].y, 1, 1, 0.2);
        }
    }
}
