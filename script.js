/* script spécifique au template pour le sujet de la Recette des Formes de l'ESAD de Pau. 
    Il permet de :
    - "wrapper" des sketchs p5 (par du rechercher-remplacer bourin et pas un vrai wrapper)
        - ajouter aux scketchs un bouton play/pause
        - permettre une forme de "lazy play" pour que les programmes passent en loop() quand ils ont affichés
    - afficher le texte du programme et en faire la coloration syntaxique (algo de MDN)
    - essayer de synchroniser Paged.js et p5.js pour une mise en page imprimable
    - créer une page de faux-titre pour une éventuelle impression en livret
*/

let DEBUG = false;
let global_script_count = 0

let splits = []

let pageWidth = 1165
let pageHeight = 1654

/*config Paged*/
if (window.location.search.includes("print")) {

    class MyHandler extends Paged.Handler {
        constructor(chunker, polisher, caller) {
            super(chunker, polisher, caller);
        }
        beforeParsed(content) {
            /*n'affiche que la couverture de la version cover */
            if (window.location.search.includes("cover")) {
                content.querySelector("main").remove();
            } else {
                /* copie le contenu de la couverture sur la page de titre */

                var couverture = content.querySelector(".couverture");
                var firstPage = document.createElement("div");
                // firstPage.classList.add("page");
                firstPage.classList.add("firstPage");
                firstPage.classList.add("couverture");

                firstPage.innerHTML = couverture.innerHTML;
                content.querySelector("main").insertBefore(firstPage, content.querySelector("main").firstElementChild);
            }

            /* supprime la couverture de la version booklet */
            if (window.location.search.includes("booklet")) {
                content.querySelectorAll(".couvertures").forEach(element => {
                    // element.outerHTML = "";
                    element.remove()
                });
            }

        }

        finalizePage(pageElement, page, breakToken) {
            /* converti les scripts p5 et intègre le code dans les recettes avant la mise en livre */
            //  setTimeout(function(){
            // p5ing(pageElement);
            // }, 1000);

        }

        afterRendered(pages) {
            for (const page of pages) {
                setTimeout(function () {
                    p5ing(page.element)
                }, 1000);
            }
        }

        /* génère l'interface d'impression */
        afterPreview(pages) {
            if (window.location.search.includes("cover")) {
                document.body.innerHTML += '<link rel="stylesheet" href="assets/printcover.css" />';
            }

            printInterface(pages);
            // console.log(splits)
            setTimeout(function () {
                const nav = document.createElement("nav");
                nav.className = "print_interface process_interface";
                nav.style.position = "fixed"

                document.body.appendChild(nav)
                // link label to checkbox
                pages.forEach((page) => {
                    const checkbox = page.element.querySelector("label input[type='checkbox']")
                    if (checkbox) {
                        checkbox.id = "btn-" + checkbox.parentNode.parentNode.parentNode.id
                        const label = document.createElement("label")
                        label.setAttribute("for", checkbox.id);
                        const sketchWrapper = checkbox.parentNode.parentNode.parentNode
                        label.textContent = sketchWrapper.id;
                        if(checkbox.parentNode.parentNode.dataset["lazy"] == "true"){
                            label.classList.add("label-lazy")
                        }
                        nav.appendChild(label);
                        // prevent default to avoid scroll to checkbox
                        label.addEventListener("click",(e)=>{
                            e.preventDefault();
                            const btn = document.getElementById(e.currentTarget.getAttribute("for"))
                            btn.click();
                            // update label state
                            btn.parentNode.parentNode.dataset["force"] = true;
                            label.classList.remove("label-lazy")
                            // document.getElementById(e.currentTarget.getAttribute("for")).parentNode.parentNode.dataset["play"] = document.getElementById(e.currentTarget.getAttribute("for")).checked;
                            e.currentTarget.classList.toggle("label-checked",btn.checked)
                        })

                        checkbox.addEventListener("click",(e)=>{
                            label.classList.toggle("label-checked",e.currentTarget.checked)
                        })
                    }
                });

                console.log(splits)
                for (const split of splits) {
                    const canvas = document.getElementById(split.targets[0]).querySelector("canvas");
                    canvas.dataset["origin"] = split["origin"].dataset["p5sketch"];
                    for (const target of split.targets) {
                        let wrapper = document.getElementById(target);
                        wrapper.classList.add("wrappersplit");
                        if (target !== split.targets[0]) {
                            console.log(target)
                            let copy = copyCanvas(canvas);
                            wrapper.appendChild(copy);
                            setInterval(() => {
                                copy.getContext('2d').drawImage(canvas, 0, 0);
                            }, 16);
                        }
                    }
                }
            }, 2000);
            function copyCanvas(original) {
                var copy;
                copy = original.cloneNode();  // Copy the canvas dimensions.
                copy.getContext('2d').drawImage(original, 0, 0);  // Copy the image.
                return copy;
            }
        }
    }
    Paged.registerHandlers(MyHandler);
    window.PagedPolyfill.preview();
} else {
    printInterface()
    p5ing(document)
}

if (window.location.search.includes("booklet")) {
    document.body.classList.add("printbooklet");
}

if (window.location.search.includes("cover")) {
    document.body.classList.add("printcover");
}

function printInterface(pages = null) {
    var interface = document.createElement("nav");
    interface.style.position = "fixed"
    interface.className = "print_interface";

    var link_screen = document.createElement("a");
    link_screen.textContent = "Version WEB"
    link_screen.href = "."
    interface.innerHTML += "<li>" + link_screen.outerHTML + "</li>";

    var link_print = document.createElement("a");
    link_print.textContent = "Version imprimable"
    link_print.href = "?print"
    interface.innerHTML += "<li>" + link_print.outerHTML + "</li>";

    var link_booklet = document.createElement("a");
    link_booklet.textContent = "— que le livret"
    link_booklet.href = "?printbooklet"
    interface.innerHTML += "<li>" + link_booklet.outerHTML + "</li>";

    var link_booklet = document.createElement("a");
    link_booklet.textContent = "— que la couv"
    link_booklet.href = "?printcover"
    interface.innerHTML += "<li>" + link_booklet.outerHTML + "</li>";

    var link_screen = document.createElement("a");
    link_screen.textContent = "le poster"
    link_screen.href = "poster.html"

    interface.innerHTML += "<li style='text-align:right'>" + link_screen.outerHTML + "</li>";

    interface.querySelectorAll("a").forEach(element => {
        if (element.getAttribute("href").localeCompare(window.location.search) == 0) {
            element.className = "current";
        }
    });
    
    if (pages) {
        var nbpage = document.createElement("p");
        nbpage.textContent = "pages: " + (pages.length)
        var nbfeuille = document.createElement("p");
        nbfeuille.textContent = "feuilles: " + (pages.length - 4) / 4
        interface.appendChild(nbpage);
        interface.appendChild(nbfeuille);
    }
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
        var alert = document.createElement("p");
        alert.style.fontWeight = "bold"
        alert.style.textDecoration = "underline"
        alert.textContent = "!!! Safari détecté !!!";
        interface.appendChild(alert);
        interface.setAttribute("style", "position:fixed!important;");
    }
    document.body.appendChild(interface);
}

function p5ing(pageElement) {
    if (DEBUG) {
        console.log(pageElement)
    }
    var codes = pageElement.querySelectorAll("code[data-p5sketch]");

    for (const codeDiv of codes) {

        // var codeDiv = section.querySelector("code");
        if (codeDiv.dataset.p5sketch == 'undefined') {
            continue
        }
        /* si data-p5sketch avec source ext */
        if (typeof codeDiv.dataset.p5sketch !== '') {
            getCode(codeDiv);
        } else {
            if (codeDiv.innerText.length > 0) {
                var code = codeDiv.innerText;
                var target_id = ""
                if (typeof codeDiv.dataset.p5target !== 'undefined') {
                    target_id = codeDiv.dataset.p5target;
                } else {
                    /* ça ne fonctionne pas sans target déclarée car les id rajouté dans le hook de Paged s'appliquent plus tard dans le DOM*/
                    target_id = "w" + global_script_count;
                    codeDiv.parentNode.id = target_id;
                }
                console.log(code)
                new_code = wrapCode(code, target_id, (typeof codeDiv.dataset.lazy !== "undefined"));
                eval(new_code);
            }
        }
    }
}

window.setTimeout((e) => { // attendre 1 seconde, à défaut d'avoir une promesse de chargement des sketch P5
    buttons = document.querySelectorAll(".p5_play_pause");
    window.addEventListener("scroll", (e) => { check_sketches_visibility(buttons) });
    check_sketches_visibility(buttons);
    // for (const button of buttons) {
    //     button.addEventListener("click", (e) => {
    //         //e.stopPropagation();
    //         button.dataset.force = "true"; 
    //     })
    // }
}, 2000)

function check_sketches_visibility(buttons) {
    const windowH = window.innerHeight 
    for (const button of buttons) {
        let buttonY = button.getBoundingClientRect().top;
        if (buttonY > -100 && buttonY < windowH - 100) {
            if (button.dataset["play"] == "false" && button.dataset["lazy"] == "true" && button.dataset["force"] !== "true") {
                button.querySelector("input").click(); // click() ne trigger pas mouseClicked() de p5 donc utiliser une checkbox et changed() de p5
            }
        }else{
          if(button.dataset["play"] == "true" && button.dataset["lazy"] == "true" && button.dataset["force"] !== "true"){
              button.querySelector("input").click(); // click() ne trigger pas mouseClicked() de p5 donc utiliser une checkbox et changed() de p5
          }
        }
        // update label state
        const label = document.querySelector("label[for='" + button.querySelector("input").id + "']");
        if (label){
            label.classList.toggle("label-checked", button.querySelector("input").checked)
        }
        

    }
    
}

async function getCode(codeDiv) {
    // console.log("getcode")
    // console.log(codeDiv)
    script_path = codeDiv.dataset.p5sketch;
    const response = await fetch(script_path);
    const text = await response.text();

    if (DEBUG) { console.log(codeDiv.dataset.autoconvert) }
    // if (typeof codeDiv.dataset.p5sketch !== 'undefined') {
    var targets_id = []
    var target_id = ""
    if (typeof codeDiv.dataset.p5target !== 'undefined') {
        targets_id = codeDiv.dataset.p5target.split(" ");
        target_id = targets_id[0]
        if (targets_id.length > 1) {

            // for (const id of targets_id) {
            //let wrapper = document.getElementById(targets_id[0]);
            //wrapper.classList.add("wrappersplit");
            splits.push({
                origin: codeDiv,
                targets: targets_id
            })
            //console.log(splits)

            // }
        }

    } else {
        /* ça ne fonctionne pas sans target déclarée car les id rajouté dans le hook de Paged s'appliquent plus tard dans le DOM */
        target_id = "w" + global_script_count;
        codeDiv.parentNode.id = target_id;
    }
    var config = "";

    var printWidth = false
    var printHeight = false
    if (window.location.search.includes("print")) {
        config += "let pageWidth=" + pageWidth + ";let pageHeight=" + pageHeight + ";";
        printWidth = codeDiv.dataset["printwidth"];
        printHeight = codeDiv.dataset["printheight"];
    }

    code = wrapCode(text, target_id, (typeof codeDiv.dataset.p5lazy !== "undefined"), config, printWidth, printHeight);

    eval(code);

    if (codeDiv.parentNode.classList.contains("recette")) {
        codeDiv.innerText = text;
        codeDiv.innerHTML = jsCodeColor(codeDiv);

        var texte = codeDiv.parentNode.querySelector(".texte");
        var buttonCode = document.createElement("button");
        buttonCode.textContent = "abc -> {}";
        buttonCode.className = "buttonCode";
        texte.parentNode.insertBefore(buttonCode, texte);

        buttonCode.addEventListener("click", (e) => {
            if (e.currentTarget.parentNode.parentNode.classList.contains("code")) {
                e.currentTarget.parentNode.parentNode.classList.remove("code");
            } else {
                e.currentTarget.parentNode.parentNode.classList.add("code")
            }
        })
    }


}

function wrapCode(code, target, lazy, config = "", printWidth = "", printHeight = "") {
    if (DEBUG) { console.log(code); console.log("wrap"); }

    // lazy/button play/pause
    code = "let PLAYPAUSE = true;let BUTTON;\n" + config + code;
    let lazy_code = lazy === true ? 'wp5.playpause();' : 'BUTTON.attribute("data-play",true);';
    code = code.replace(/function( *)setup( *)\((.*)\)( *){/g, 'function setup(){ p5.disableFriendlyErrors = true;BUTTON = createCheckbox("",' + !lazy + ');BUTTON.changed(wp5.playpause);BUTTON.addClass("toggle_switch");BUTTON.addClass("p5_play_pause");' + lazy_code + 'BUTTON.attribute("data-lazy",' + lazy + ');')

    if (printWidth) {
        code = code.replace(/createCanvas\((.+?),(.+?)(,.+?)?\)/g, "createCanvas(" + printWidth + ",$2$3)")
    }
    if (printHeight) {
        code = code.replace(/createCanvas\((.+?),(.+?)(,.+?)?\)/g, "createCanvas($1," + printHeight + "$3)")
    }

    if (config != "") { // peu robuste, peut-être avoir une config et pas pour le print
        // override windowWidth and windowHeight by custom page size
        code = code.replaceAll(/\b(?<!\.)(windowWidth)\b/g, 'pageWidth');
        code = code.replaceAll(/\b(?<!\.)(windowHeight)\b/g, 'pageHeight');
    }
    // (async) Function
    code = code.replaceAll(/\b(async *|)function( +)(draw|setup|preload|keyPressed|keyReleased|keyTyped|mouseMoved|mouseDragged|mousePressed|mouseReleased|mouseClicked|doubleClicked|mouseWheel|touchStarted|touchMoved|touchEnded)( *)\((.*)/g, 'wp5.$3 = $1function($5');
    // Structure
    code = code.replaceAll(/\b(?<!\.)(remove|noLoop|loop|isLooping|push|pop|redraw)\b( *)\(/g, 'wp5.$1(');
    // Environment
    code = code.replaceAll(/\b(?<!\.)(width|height|webglVersion|displayWidth|displayHeight|windowWidth|windowHeight|frameCount|deltaTime|focused)\b/g, 'wp5.$1');
    code = code.replaceAll(/\b(?<!\.)(describe|describeElement|textOutput|gridOutput|print|cursor|frameRate|getTargetFrameRate|noCursor|windowResized|fullscreen|pixelDensity|displayDensity|getURL|getURLPath|getURLParam)\b( *)\(/g, 'wp5.$1(');
    // Color
    code = code.replaceAll(/\b(?<!\.)(alpha|brightness|color|green|hue|lerpColor|lightness|saturation|beginClip|endClip|clip|background|clear|colorMode|fill|noFill|noStroke|stroke|erase|noErase)\b( *)\(/g, 'wp5.$1(');
    // Shape
    code = code.replaceAll(/\b(?<!\.)(arc|ellipse|circle|line|point|quad|rect|square|triangle|ellipseMode|noSmooth|rectMode|smooth|strokeCap|strokeJoin|strokeWeight|bezier|bezierDetail|bezierPoint|bezierTangent|bezierOrder|curve|curveDetail|curveTightness|curvePoint|curveTangent|beginContour|beginShape|bezierVertex|curveVertex|splineVertex|endContour|endShape|quadraticVertex|vertex|normal|beginGeometry|endGeometry|buildGeometry|freeGeometry|plane|box|sphere|cylinder|cone|ellipsoid|torus|loadModel|model)\b( *)\(/g, 'wp5.$1(');
    // Font
    code = code.replaceAll(/\b(?<!\.)(loadFont|fontAscent|fontBounds|fontDescent|fontWidth)\b( *)\(/g, 'wp5.$1(');
    // Text
    code = code.replaceAll(/\b(?<!\.)(textAlign|textLeading|textSize|textStyle|textWeight|textWidth|textAscent|textDescent|textDirection|textWrap|text|textFont|textBounds|textProperties|textProperty)\b( *)\(/g, 'wp5.$1(');
    // DOM
    code = code.replaceAll(/\b(?<!\.)(select|selectAll|removeElements|changed|input|createDiv|createP|createSpan|createImg|createA|createSlider|createButton|createCheckbox|createSelect|createRadio|createColorPicker|createInput|createFileInput|createVideo|createAudio|createCapture|createElement)\b( *)\(/g, 'wp5.$1(');
    // Rendering
    code = code.replaceAll(/\b(?<!\.)(createCanvas|resizeCanvas|noCanvas|createGraphics|createFramebuffer|clearDepth|blendMode|drawingContext|setAttributes)\b( *)\(/g, 'wp5.$1(');
    // Transform
    code = code.replaceAll(/\b(?<!\.)(applyMatrix|resetMatrix|rotate|rotateX|rotateY|rotateZ|scale|shearX|shearY|translate)\b( *)\(/g, 'wp5.$1(');
    // Data 
    code = code.replaceAll(/\b(?<!\.)(storeItem|getItem|clearStorage|removeItem|createStringDict|createNumberDict|append|arrayCopy|concat|reverse|shorten|shuffle|sort|splice|subset|float|int|str|boolean|byte|char|unchar|hex|unhex|join|match|matchAll|nf|nfc|nfp|nfs|split|splitTokens|trim)\b( *)\(/g, 'wp5.$1(');
    // Math
    code = code.replaceAll(/\b(?<!\.)(abs|ceil|constrain|dist|exp|floor|lerp|log|mag|map|max|min|norm|pow|round|sq|sqrt|fract|createVector|noise|noiseDetail|noiseSeed|randomSeed|random|randomGaussian|acos|asin|atan|atan2|cos|sin|tan|degrees|radians|angleMode)\b( *)\(/g, 'wp5.$1(');
    // Events
    code = code.replaceAll(/\b(?<!\.)(setMoveThreshold|setShakeThreshold|deviceMoved|deviceTurned|deviceShaken|keyIsDown|requestPointerLock|exitPointerLock)\b( *)\(/g, 'wp5.$1(');
    code = code.replaceAll(/\b(?<!\.)(deviceOrientation|accelerationX|accelerationY|accelerationZ|pAccelerationX|pAccelerationY|pAccelerationZ|rotationX|rotationY|rotationZ|pRotationX|pRotationY|pRotationZ|turnAxis|keyIsPressed|key|keyCode|movedX|movedY|mouseX|mouseY|pmouseX|pmouseY|winMouseX|winMouseY|pwinMouseX|pwinMouseY|mouseButton|mouseIsPressed|touches)\b/g, 'wp5.$1');
    // Image
    code = code.replaceAll(/\b(?<!\.)(createImage|saveCanvas|saveFrames|loadImage|saveGif|image|tint|noTint|imageMode|blend|copy|filter|get|loadPixels|set|updatePixels)\b( *)\(/g, 'wp5.$1(');
    code = code.replaceAll(/\b(?<!\.)(pixels)\b/g, 'wp5.$1');
    // IO
    code = code.replaceAll(/\b(?<!\.)(loadJSON|loadStrings|loadTable|loadXML|loadBytes|httpGet|httpPost|httpDo|createWriter|save|saveJSON|saveStrings|saveTable|day|hour|minute|millis|month|second|year)\b( *)\(/g, 'wp5.$1(');
    // 3D
    code = code.replaceAll(/\b(?<!\.)(orbitControl|debugMode|noDebugMode|ambientLight|specularColor|directionalLight|pointLight|imageLight|panorama|lights|lightFalloff|spotLight|noLights|loadShader|createShader|createFilterShader|shader|resetShader|texture|textureMode|textureWrap|normalMaterial|ambientMaterial|emissiveMaterial|specularMaterial|shininess|metalness)\b( *)\(/g, 'wp5.$1(');
    code = code.replaceAll(/\b(?<!\.)(camera|createCamera|frustum|linePerspective|ortho|perspective|setCamera)\b( *)\(/g, 'wp5.$1(');

    // Constantes
    code = code.replaceAll(/\b(?<!\.)(HALF_PI|PI|QUARTER_PI|TAU|TWO_PI|DEGREES|RADIANS|PD2|WEBGL|WEBGL2|ARROW|CROSS|HAND|MOVE|TEXT|WAIT|DEG_TO_RAD|RAD_TO_DEG|CORNER|CORNERS|RADIUS|RIGHT|LEFT|CENTER|TOP|BOTTOM|BASELINE|POINTS|LINES|LINE_STRIP|LINE_LOOP|TRIANGLES|TRIANGLE_FAN|TRIANGLE_STRIP|QUADS|QUAD_STRIP|TESS|CLOSE|OPEN|CHORD|PIE|PROJECT|SQUARE|ROUND|BEVEL|MITER|RGB|HSL|HSB|BSB|AUTO|ALT|BACKSPACE|CONTROL|DELETE|DOWN_ARROW|ENTER|ESCAPE|LEFT_ARROW|OPTION|RETURN|RIGHT_ARROW|SHIFT|TAB|UP_ARROW|BLEND|REMOVE|ADD|DARKEST|LIGHTEST|DIFFERENCE|SUBSTRACT|EXCLUSION|MULTIPLY|SCREEN|REPLACE|OVERLAY|HARD_LIGHT|SOFT_LIGHT|DODGE|BURN|THRESHOLD|GRAY|OPAQUE|INVERT|POSTERIZE|DILATE|ERODE|BLUR|NORMAL|ITALIC|BOLD|BOLDITALIC|CHAR|WORD|LINEAR|QUADRATIC|BEZIER|CURVE|STROKE|FILL|TEXTURE|IMMEDIATE|IMAGE|NEAREST|REPEAT|CLAMP|MIRROR|FLAT|SMOOTH|LANDSCAPE|PORTRAIT|GRID|AXES|LABEL|FALLBACK|CONTAIN|COVER|FLOAT|HALF_FLOAT|UNSIGNED_BYTE|UNSIGNED_INT|RGBA)\b/g, 'wp5.$1');

    // add functions linked to play/stop button
    code = code + '\nwp5.playpause = function() {if(PLAYPAUSE){wp5.noLoop();}\nelse{wp5.loop();}\nPLAYPAUSE = !PLAYPAUSE;BUTTON.attribute("data-play",PLAYPAUSE)}'

    //code = code + "\nwindow.scroll"

    code = "s" + global_script_count + " = ( wp5 ) => {" + code + "}; " + "new p5(s" + global_script_count + ",'" + target + "');";
    global_script_count++;
    if (DEBUG) { console.log(code); }
    return code;
}