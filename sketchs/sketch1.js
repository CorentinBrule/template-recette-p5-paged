var x;
var y;
// vitesse de déplacement de la balle
var vitesseX;
var vitesseY;
var fonte;
var bbox; 

function preload() {
    fonte = loadFont("../assets/Scorpius2.otf")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    // position de départ
    x = random(width/4, width/4 * 3);
    y = random(height/4, height/4 * 3);
    // vitesses verticale et horizontale
    vitesseX = random(-6, 6);
    vitesseY = random(-6, 6);
    textFont(fonte)
    textSize(100)
    // calcule de la taille de la boite de texte:
    bbox = fonte.textBounds('poulet', x, y, 100);

}

function draw() {
    //déplacer quelquechose c'est ajouter à sa position une vitesse (positive ou négative)
    // quand la vitesseX est positive, elle va à droite. quand elle est négative elle va à gauche
    x = x + vitesseX;
    // quand la vitesseY est positive, elle va en bas. quand elle est négative elle va en haut
    y = y + vitesseY;
    
    // si la position du texte est trop en bas OU la position du texte est trop en haut ("OU" s'écrit "||")
    if (y < 0 + bbox.h || y > height) {
        vitesseY = vitesseY * -1;
    }

    // Si la position du texte est trop à droite OU la position du texte est trop à gauche ("OU" s'écrit "||")
    if (x + bbox.w > width || x < 0) {
        vitesseX *= -1;
    }
    fill("white");
    stroke("black");
    text("poulet", x, y);
}