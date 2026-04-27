var balles = [];

function setup() {
    createCanvas(1165, 1654);
    vitesseX = random(0, 3)
    vitesseY = random(0, 3)
    for (i = 0; i < 100; i++) {
        let balle = new Balle("white");
        balles.push(balle);
    }
}

function draw() {
    // background(220);
    for (i = 0; i < balles.length; i++) {
        balles[i].bouger()
        balles[i].dessiner()
    }
}

class Balle {
    constructor(couleur) {
        this.x = width / 2;
        this.y = height / 2;
        this.d = 50;
        this.vitesseX = random(-3, 3)
        this.vitesseY = random(-3, 3)
        this.couleur = couleur;
    }
    bouger() {
        if (this.x > width - this.d / 2 || this.x < this.d / 2) {
            this.vitesseX = this.vitesseX * -1;
        }
        if (this.y > height - this.d / 2 || this.y < this.d / 2) {
            this.vitesseY = this.vitesseY * -1;
        }
        this.x = this.x + this.vitesseX;
        this.y = this.y + this.vitesseY;
    }
    dessiner() {
        fill(this.couleur)
        circle(this.x, this.y, this.d);
    }
}