// listes de textes : "chaîne de charactère"
let couleurs = ["red","yellow","blue"];
let x;
let y;
let c = 0;
let i=0;

function setup() {
  createCanvas(1165, 1654);
  textSize(50);
  frameRate(60);
  textAlign(CENTER)
}

function draw(){
  background(255,255,255,10);
  x = width/2 + cos(i)*(mouseX-width/2)
  y = height/2 + cos(i) * sin(i) *(mouseY-height/2)*1.5
  i+=0.05;
  fill(couleurs[c]);
  c = (c+1)%3
  text("A",x,y)
}