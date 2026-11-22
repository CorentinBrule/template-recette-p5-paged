// listes de textes : "chaîne de charactère"
var x;
var y;
var c = 0;
var i = 0;
var compteLettre = 0;
var mot = "poulet";

async function setup() {
    fonte = await loadFont("../assets/Scorpius2-mono.otf");
    createCanvas(1165, 1654);
    textSize(80);
    textAlign(CENTER);
    textFont(fonte);
    noStroke()
}

function draw() {
    background(255, 255, 255, 10);
    x = width / 2 + cos(i) * (mouseX - width / 2);
    y = height / 2 + cos(i) * sin(i) * (mouseY - height / 2) * 1.5;
    i += 0.05;
    fill("black");

    text(mot[compteLettre], x, y);
    compteLettre = (compteLettre + 1) % mot.length;
}