var minAngleTerre = 90; //angle de la Terre par rapport su Soleil
var minAngleLune = 0; //angle de la Lune par rapport à la Terre
var minAngleApollo = 30; //angle du vaisseau Appolo par rapport à la lune
var minAngleMercure = 45; //angle du vaisseau Mercure par rapport à la lune
var minAngleMars = 120; //angle du vaisseau Mars par rapport à la lune

var minZ = -200
var maxZ = 200
//let z = minZ
var angleMercure = minAngleMercure;
var angleTerre = minAngleTerre;
var angleLune = minAngleLune;
var angleApollo = minAngleApollo;
var angleMars = minAngleMars;
var fonte;
// var couleur;

async function setup() {
    fonte = await loadFont("../assets/Scorpius2-mono.otf");
    createCanvas(1168, 1648, WEBGL);
    angleMode(DEGREES)
    rectMode(CENTER)
    //let z = minZ
    textFont(fonte)
    stroke("black")
    strokeWeight(10);
    textAlign(CENTER, CENTER)
}

function draw() {
    background("white");
    orbitControl();
    rotateX(45); // angle caméra
    // on se déplace pour placer le Soleil comme centre de rotation du reste
    //translate(width/2,height/2);

    angleTerre = minAngleTerre;
    angleLune = minAngleLune;
    angleApollo = minAngleApollo;
    angleMercure = minAngleMercure;
    angleMars = minAngleMars;
    //z=minZ;

    for (var z = minZ; z < maxZ; z+=10) {
        var couleur;
        if(z == maxZ ){
            couleur = "white"
        }else{
            couleur = "black"
        }
        var opacité = map(z, minZ, maxZ, 0, 255);
        
        push();
        translate(0, 0, z)
        let c = color(couleur)
        c.setAlpha(opacité)
        fill(c);
        //circle(0, 0, 30);
        textSize(100)
        text("p",0,0);
        
        push();
        c = color(couleur)
        c.setAlpha(opacité)
        fill(c)
        rotate(angleMercure)
        textSize(80)
        text("o",70,0)
        pop();

        push();
        c = color(couleur);
        c.setAlpha(opacité)
        fill(c);
        rotate(angleTerre);
        translate(150, 0);
        // circle(0, 0, 40);
        textSize(50)
        text("u",0,0)

        c = color(couleur);
        c.setAlpha(opacité)
        fill(c);
        rotate(angleLune);
        translate(45, 0);
        textSize(40)
        text("l",0,0)

        c = color(couleur)
        c.setAlpha(opacité)
        fill(c);
        rotate(angleApollo);
        translate(15, 0)
        textSize(30)
        text("e",0,0)
        pop();

        rotate(angleMars)
        textSize(45)
        text("t",220,0)

        pop(); // les trois objets sont liés, le vaisseau Apollo tourne autours de la lune qui tourne elle même autours de la Terre qui tourne autours du Soleil

        angleTerre = angleTerre + 0.5;
        angleLune = angleLune + 2;
        angleApollo = angleApollo - 5;
        angleMercure += 1;
        angleMars += 2;

    }
    minAngleTerre += 0.5;
    minAngleLune += 2;
    minAngleApollo -= 5;
    minAngleMercure += 1;
    minAngleMars += 2;
}