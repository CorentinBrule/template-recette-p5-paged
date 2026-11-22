var x;
var y;
// vitesse de déplacement de la balle
var vitesseX;
var vitesseY;
var bbox;
var angle = 0;
var dia = 200;
var distan = 10;

function setup() {
    // récupère le body 
    const target = select('body');
    size = target.size() // pour connaitre sa taille
    sketchCanvas = createCanvas(size.width, size.height);
    sketchCanvas.parent(target); // et mettre notre sketch dedans
    
    background("red");
    // position de départ
    x = width/2;
    y = height/2;
    angleMode(DEGREES)
}

function draw() {
    x = width/2 + cos(angle) * distan;
    y = height/2 +  sin(angle) * distan;
   
    fill("white")
    stroke("red")
    triangle(x, y, x+10, y-20,x-10, y-20)

    angle = angle + map(distan, 0 , width,10,1)
    distan = distan +map(frameCount,0,10000,0.5,10)

    if(distan > dist(width/2,height/2,width,0)){
        noLoop()
    }
}
