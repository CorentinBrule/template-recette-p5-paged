# dirty P5js instance wrapper for Paged.js' CSS2print template

## fr:

Ce template permet de réunir plusieurs sketches P5.js dans une seule page web imprimable sans les avoir écrit en mode [instancié](https://p5js.org/examples/advanced-canvas-rendering-multiple-canvases/) (placer chaque sketch dans une variable et y appeler explicitement la bibliothèque à chaque usage de ses méthodes et propriétés).

Attention, les script ne sont pas parsés, mais un simple recherché/remplacé est effectué à l'aide d'expressions régulières et de la liste des fonctions et constantes décrites dans la référence de p5.

Tout ceci peut donc ne pas marcher pour un projet complexe, une syntaxe atypique ou obfusquée. Ne pas utiliser de variable nommée "p" dans vos sketchs.

## en: 

This template allows you to combine several P5.js sketches into a single printable web page without having to write them in [instantiated mode](https://p5js.org/examples/advanced-canvas-rendering-multiple-canvases/) (i.e. wrap each sketch in a variable and explicitly calling the library whenever its methods and properties are used).

Please note that scripts are not parsed; instead, a simple search-and-replace operation is performed using regular expressions and the list of functions and constants described in the p5 reference.

All of this may therefore not work for a complex project, or with unusual or obfuscated syntax.  Do not use a variable named ‘p’ in your sketches.

--------------

## knowed bugs :

- sync issue between P5 x Paged recurring with Safari.
- some bad page break for cover on Chrome. 