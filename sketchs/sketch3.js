var dia = 100;
var etapesX = 20;
var etapesY = 20;
var count = 0
var maxEtapes = etapesX * etapesY;

function setup() {
    createCanvas(1165, 1654);
    noStroke();
    colorMode(HSB);
    strokeWeight(5);
    // frameRate(5)
}

function draw() {
    // background(220);
    var cell = 0
    for (let i = 0; i < etapesX; i++) {
        for (let j = 0; j < etapesY; j++) {

            let y = map(i, 0, etapesX, dia, height - dia);
            let x = map(j, 0, etapesY, dia, width - dia);

            var lum = map(i, 0, etapesX, 0, 100);
            var sat = map(j, 0, etapesY, 0, 100)
            fill(0, sat, lum);
            let trigoangle = map(cell+count*5, 0,maxEtapes,0,TWO_PI)
            stroke("white")
            strokeWeight(1+ 3*  cos(trigoangle))
            circle(x, y, dia );

            cell++
        }
    }
    count = (count + 1) % maxEtapes

}