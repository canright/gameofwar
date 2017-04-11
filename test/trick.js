"use strict";
var assert = require("assert");
var Trick = require("../src/Trick.js");

var s2 = { suit: 0, rank:  0 };
var h2 = { suit: 1, rank:  0 };
var d2 = { suit: 2, rank:  0 };
var s3 = { suit: 0, rank:  1 };
var h3 = { suit: 1, rank:  1 };
var h7 = { suit: 1, rank:  5 };
var d7 = { suit: 2, rank:  5 };
var ha = { suit: 1, rank: 12 };
var da = { suit: 2, rank: 12 };

function assertTrick(top, winners, plays) {
    plays.map(card => [ card ]);
    assert.deepStrictEqual( { top, winners, kitty: plays }, new Trick( plays.map( card => [ card ] ) ).play() );
}

describe( "class Trick", function() {

  it( "rejects invalid hands", function() {
    assert.throws(() => new Trick( null ) );
    assert.throws(() => new Trick( [] ) );
    assert.throws(() => new Trick( [ [] ] ) );
    assert.throws(() => new Trick( [ [ s2 ] ] ) );
  });

  it( "correctly picks the winner", function() {
    assertTrick(  1, [ 1 ], [ s2, s3 ] );
    assertTrick(  1, [ 0 ], [ s3, s2 ] );
    assertTrick( 12, [ 0 ], [ da, s2 ] );
    assertTrick(  1, [ 2 ], [ s2, h2, s3 ] );
    assertTrick(  5, [ 1 ], [ s3, h7, s2 ] );
    assertTrick( 12, [ 0 ], [ da, s2, d7 ] );
  });

  it( "correctly isolates war", function() {
    assertTrick(  0, [ 0, 1 ], [ s2, h2 ] );
    assertTrick(  1, [ 0, 1 ], [ h3, s3 ] );
    assertTrick( 12, [ 0, 1 ], [ da, ha ] );

    assertTrick(  0, [ 0, 1, 2 ], [ d2, h2, s2 ] );
    assertTrick(  5, [ 1, 2    ], [ s3, h7, d7 ] );
    assertTrick( 12, [ 0, 2    ], [ da, s2, ha ] );
  });

});
