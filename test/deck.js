"use strict";
var assert = require("assert");
var Deck = require("../src/Deck.js");

function assertDeckLength( suits, ranks, length ) {
    assert.equal( length, new Deck( suits, ranks ).length() );
}

function assertHandLengths( suits, ranks, players, handLengths ) {
  assert.deepStrictEqual( handLengths, new Deck( suits, ranks ).deal( players ).map( hand => hand.length ) );
}

describe( "class Deck", function() {

  it( "rejects invalid decks", function() {
    assert.throws(() => new Deck( 0 ), Error);
    assert.throws(() => new Deck( 5 ), Error);
    assert.throws(() => new Deck( "x" ), Error);
    assert.throws(() => new Deck( 1, 0 ), Error);
    assert.throws(() => new Deck( 1, 14 ), Error);
    assert.throws(() => new Deck( 4, 14 ), Error);
    assert.throws(() => new Deck( 1, "x" ), Error);
  });

  it( "generates decks of the correct length", function() {
    assertDeckLength( 1,  1,  1);
    assertDeckLength( 1,  9,  9);
    assertDeckLength( 1, 13, 13);
    assertDeckLength( 2,  1,  2);
    assertDeckLength( 2, 12, 24);
    assertDeckLength( 2, 13, 26);
    assertDeckLength( 4,  1,  4);
    assertDeckLength( 4, 11, 44);
    assertDeckLength( 4, 13, 52);
  });

  it( "generates decks and deals hands with the correct length", function() {

    assertHandLengths( 1, 12, 2, [  6,  6 ]);
    assertHandLengths( 2, 12, 2, [ 12, 12 ]);
    assertHandLengths( 2, 13, 2, [ 13, 13 ]);
    assertHandLengths( 4, 13, 2, [ 26, 26 ]);

    assertHandLengths( 1, 12, 3, [  4,  4,  4 ]);
    assertHandLengths( 2, 12, 3, [  8,  8,  8 ]);
    assertHandLengths( 2, 13, 3, [  9,  9,  8 ]);
    assertHandLengths( 4, 13, 3, [ 18, 17, 17 ]);

    assertHandLengths( 1, 12, 4, [  3,  3,  3,  3 ]);
    assertHandLengths( 2, 12, 4, [  6,  6,  6,  6 ]);
    assertHandLengths( 2, 13, 4, [  7,  7,  6,  6 ]);
    assertHandLengths( 4, 13, 4, [ 13, 13, 13, 13 ]);

    assertHandLengths( 1, 12, 5, [  3,  3,  2,  2,  2 ]);
    assertHandLengths( 2, 12, 5, [  5,  5,  5,  5,  4 ]);
    assertHandLengths( 2, 13, 5, [  6,  5,  5,  5,  5 ]);
    assertHandLengths( 4, 13, 5, [ 11, 11, 10, 10, 10 ]);

    assertHandLengths( 1, 12, 6, [  2,  2,  2,  2,  2,  2 ]);
    assertHandLengths( 2, 12, 6, [  4,  4,  4,  4,  4,  4 ]);
    assertHandLengths( 2, 13, 6, [  5,  5,  4,  4,  4,  4 ]);
    assertHandLengths( 4, 13, 6, [  9,  9,  9,  9,  8,  8 ]);

  });

});
