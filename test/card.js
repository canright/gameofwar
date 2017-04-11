"use strict";
var assert = require("assert");
var Card = require("../src/Card.js");

describe( "class Card", function() {

  it( "rejects invalid cards", function() {
    assert.throws(() => new Card(), Error);
    assert.throws(() => new Card( 1 ), Error);
    assert.throws(() => new Card( -1 ), Error);
    assert.throws(() => new Card( -11 ), Error);
    assert.throws(() => new Card( "x", 0 ), Error);
    assert.throws(() => new Card( 1, "x" ), Error);
    assert.throws(() => new Card( 0, 13 ), Error);
    assert.throws(() => new Card( 4,  2 ), Error);
    assert.throws(() => new Card( 4, -2 ), Error);
  });

  it( "generates and names cards", function() {
    assert.equal( "Five of Diamonds", new Card( 2,  3 ).name() );
    assert.equal( "Five of Hearts",   new Card( 1,  3 ).name() );
    assert.equal( "Six of Hearts",    new Card( 1,  4 ).name() );
    assert.equal( "Duece of Spades",  new Card( 0,  0 ).name() );
    assert.equal( "Ace of Spades",    new Card( 0, 12 ).name() );
    assert.equal( "Ace of Clubs",     new Card( 3, 12 ).name() );
  });

});
