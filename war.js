"use strict";
const Game  = require( "./src/Game.js" );

const players = Number( process.argv[ 2 ] ) || 2;
const suits   = Number( process.argv[ 3 ] ) || 4;
const ranks   = Number( process.argv[ 4 ] ) || 13;

new Game( players, suits, ranks )
  .resolve()
  .forEach( s => console.log( s ));
