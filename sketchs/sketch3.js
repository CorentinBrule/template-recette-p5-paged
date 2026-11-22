var fonte;
var dia = 100;
var etapesX = 20;
var etapesY = 20;
var count = 0
var maxEtapes = etapesX * etapesY;
var mot = "poulet";

async function setup() {
    fonte = await loadFont("../assets/Scorpius2-mono.otf");
    createCanvas(pageWidth, pageHeight);
    noStroke();
    textFont(fonte);
    textSize(100);
    textAlign(CENTER, CENTER)
    // frameRate(5)
}

function draw() {
    background("white");
    var cell = 0
    for (let i = 0; i < etapesX; i++) {
        for (let j = 0; j < etapesY; j++) {
            push()
            let x = map(j, 0, etapesY, dia, width - dia);
            let y = map(i, 0, etapesX, dia, height - dia);

            let trigoangle = map(cell+count*5, 0,maxEtapes,0,TWO_PI)
            translate(x,y)
            rotate(trigoangle)
            //strokeWeight(1+ 3*  cos(trigoangle))
            lettre = mot[cell%mot.length]
            text(lettre, 0, 0 );
            pop()
            cell++
        }
    }
    count = (count + 1) % maxEtapes

}