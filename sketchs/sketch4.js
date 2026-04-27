

/* déclarer les variables globales pour pouvoir les utiliser partout */

// les varibles old_x et old_y vont permettre de stocker la position de la souris pour s'en servir plus tard
let old_x;
let old_y;
let diametre_cercle;
let epaisseur_trait;

/* fonction de configuaration qui ne se joue qu'une fois */
function setup() {
  createCanvas(1165, 1654);
  background(255);
  diameter_cercle = 15;
  epaisseur_trait = 3;
}

// la boucle draw s'exécute 30 fois par seconde
// 
function draw() {

  // vérifier si le bouton de la souris est pressé
  if (mouseIsPressed == true) {
    
    // dessiner un cercle où la souris se trouve
    noStroke();
    fill(255,0,0,100)
    circle(mouseX, mouseY, diameter_cercle);
    
    // dessiner un trait entre où se trouve la souris et où elle se trouvait pendant la boucle draw précédente
    strokeWeight(epaisseur_trait);
    stroke("black");
    line(mouseX, mouseY, old_x, old_y);
  }
  
  // stocker la position actuelle de la souris pour s'en servir à la boucle draw suivante
  old_x = mouseX;
  old_y = mouseY;

}