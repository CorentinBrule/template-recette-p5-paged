// listes de toutes mes "Lettres" qui seront crées et dessinées
var lettres = [];
var fonte;

async function setup() {
    fonte = await loadFont("../assets/Scorpius2.otf");

    createCanvas(windowWidth, windowHeight);
    for (i = 0; i < 100; i++) {
        let lettre = new Lettre(random(["p","o","u","l","e","t"]),"white");
        lettres.push(lettre);
    }
    textAlign(CENTER, CENTER)
    textFont(fonte)
}

function draw() {
    // background(220);
    for (i = 0; i < lettres.length; i++) {
        lettres[i].bouger()
        lettres[i].dessiner()
    }
}

class Lettre {
    constructor(text, couleur) {
        this.text = text
        this.x = width / 2;
        this.y = height / 2;
        this.d = 50;
        this.vitesseX = random(-3, 3)
        this.vitesseY = random(-3, 3)
        this.couleur = couleur;
    }
    bouger() {
        textSize(this.d)
        var bounds = textBounds(this.text, this.x, this.y); 
        if (this.x > width - bounds.w/ 2 || this.x < bounds.w / 2) {
            this.vitesseX = this.vitesseX * -1;
        }
        if (this.y > height - bounds.h / 2 || this.y < bounds.h / 2) {
            this.vitesseY = this.vitesseY * -1;
        }
        this.x = this.x + this.vitesseX;
        this.y = this.y + this.vitesseY;
    }
    dessiner() {
        stroke("black")
        textSize(this.d)
        fill(this.couleur)
        text(this.text, this.x, this.y);
    }
}