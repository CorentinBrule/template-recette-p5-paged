

/* déclarer les variables globales pour pouvoir les utiliser partout */

// les varibles old_x et old_y vont permettre de stocker la position de la souris pour s'en servir plus tard
var old_x;
var old_y;
var diametre_cercle;
var epaisseur_trait;
var mot = "poulet";
var fonte;
var compteLettre = 0;

/* fonction de configuaration qui ne se joue qu'une fois */
async function setup() {
    fonte = await loadFont("../assets/Scorpius2-mono.otf");
    createCanvas(1165, 1654);
    background(255);
    diameter_cercle = 15;
    epaisseur_trait = 3;
    textFont(fonte);
    textSize(50);
}

// la boucle draw s'exécute 30 fois par seconde
// 
function draw() {

    // vérifier si le bouton de la souris est pressé
    if (mouseIsPressed == true) {

        // dessiner un cercle où la souris se trouve
        noStroke();
        fill("black");
        //circle(mouseX, mouseY, diameter_cercle);
        text(mot[compteLettre], mouseX, mouseY);
        compteLettre = (compteLettre + 1) % mot.length;

        // dessiner un trait entre où se trouve la souris et où elle se trouvait pendant la boucle draw précédente
        strokeWeight(epaisseur_trait);
        stroke("red");
        line(mouseX, mouseY, old_x, old_y);
    }

    // stocker la position actuelle de la souris pour s'en servir à la boucle draw suivante
    old_x = mouseX;
    old_y = mouseY;

}