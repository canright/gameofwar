"use strict";
const express = require( "express" );
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const Game = require( "./src/Game.js" );

app.get( "/gameofwar.html" , ( req, res ) => {

  const players = Number( req.query.players ) ||  2;
  const suits   = Number( req.query.suits )   ||  4;
  const ranks   = Number( req.query.ranks )   || 13;

  var result = new Game( players, suits, ranks ).resolve().join( "\n" );
  res.send( "<!doctype html>\n<html><body><pre>\n" + result + "\n</pre></body></html>" );
});

app.listen( 3000, () => console.log( "Serving: HTTP at localhost:3000" ) );
