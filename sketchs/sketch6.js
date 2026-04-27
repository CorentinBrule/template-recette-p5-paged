let minAngleTerre = 90; //angle de la Terre par rapport su Soleil
let minAngleLune = 0; //angle de la Lune par rapport à la Terre
let minAngleApollo = 30; //angle du vaisseau Appolo par rapport à la lune

let minZ = -100
let maxZ = 100
//let z = minZ
let angleTerre = minAngleTerre;
let angleLune = minAngleLune;
let angleApollo = minAngleApollo;

function setup() {
    createCanvas(1168, 1648, WEBGL);
    angleMode(DEGREES)
    rectMode(CENTER)
    //let z = minZ

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
    //z=minZ;

    for (let z = minZ; z < maxZ; z++) {
        let opacité = map(z, minZ, maxZ, 0, 255);

        push();
        translate(0, 0, z)
        let c = color("yellow")
        c.setAlpha(opacité)
        fill(c);
        noStroke()
        circle(0, 0, 30);

        c = color("blue");
        c.setAlpha(opacité)
        fill(c);
        rotate(angleTerre);
        translate(120, 0);
        circle(0, 0, 40);

        s = color("black");
        s.setAlpha(opacité)
        stroke(s)
        fill("white");
        rotate(angleLune);
        translate(45, 0);
        circle(0, 0, 20)

        c = color("red")
        c.setAlpha(opacité)
        fill(c);
        rotate(angleApollo);
        translate(15, 0)
        square(0, 0, 10)
        pop(); // les trois objets sont liés, le vaisseau Apollo tourne autours de la lune qui tourne elle même autours de la Terre qui tourne autours du Soleil


        angleTerre = angleTerre + 0.5;
        angleLune = angleLune + 2;
        angleApollo = angleApollo - 5;
    }
    minAngleTerre += 0.5;
    minAngleLune += 2;
    minAngleApollo -= 5;

}