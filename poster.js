var x;
var y;
// vitesse de déplacement de la balle
var vitesseX;
var vitesseY;
var bbox;
var angle = 0;
var dia = 200

function setup() {
    createCanvas(windowWidth, windowHeight);
    background("red");
    // position de départ
    x = random(width/4, width/4 * 3);
    y = random(height/4, height/4 * 3);
    // vitesses verticale et horizontale
    vitesseX = 3;
    vitesseY = 3;
    // calcule de la taille de la boite de texte:
    angleMode(DEGREES)
}

function draw() {
    //déplacer quelquechose c'est ajouter à sa position une vitesse (positive ou négative)
    // quand la vitesseX est positive, elle va à droite. quand elle est négative elle va à gauche
    x = x + vitesseX + cos(angle)*10;
    // quand la vitesseY est positive, elle va en bas. quand elle est négative elle va en haut
    y = y + vitesseY + sin(angle)*10;
    
    // si la position du texte est trop en bas OU la position du texte est trop en haut ("OU" s'écrit "||")
    if (y < dia || y > height-dia) {
        vitesseY = vitesseY * -1;
    }

    // Si la position du texte est trop à droite OU la position du texte est trop à gauche ("OU" s'écrit "||")
    if (x + dia > width || x < dia) {
        vitesseX *= -1;
    }
    // fill("white");
    noFill()
    stroke("white")
    circle(x,y,200)
    angle=angle + 10
}