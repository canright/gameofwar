"use strict";
var assert = require("assert");
var War = require("../src/War.js");

var s2 = { suit: 0, rank:  0 };
var h2 = { suit: 1, rank:  0 };
var d2 = { suit: 2, rank:  0 };
var s3 = { suit: 0, rank:  1 };
var h3 = { suit: 1, rank:  1 };
var h7 = { suit: 1, rank:  5 };
var d7 = { suit: 2, rank:  5 };
var ha = { suit: 1, rank: 12 };
var da = { suit: 2, rank: 12 };

function assertWar(top, winners, fighters, hands, kitty, prize ) {
  var war = new War( hands, fighters );
  assert.deepStrictEqual( { top, winners, kitty, prize }, war.play() );
}

describe( "class War", function() {

  it( "rejects invalid hands", function() {
    assert.throws(() => new War() );
    assert.throws(() => new War( null, [ 0, 1 ] ) );
    assert.throws(() => new War( [], [ 0, 1 ] ) );
    assert.throws(() => new War( [ [] ], [ 0, 1 ] ) );
    assert.throws(() => new War( [ [ s2 ] ], [ 0, 1 ] ) );
  });

  it( "rejects players not at war", function() {
    assert.throws(() => new War() );
    assert.throws(() => new War( null ) );
    assert.throws(() => new War( [] ) );
    assert.throws(() => new War( [ { suite: 0, rank: 0 } ] ) );
  });

  it( "correctly executes basic wars", function() {
    assertWar( 5, [ 1 ], [ 0, 1 ], [ [ h3, s2 ], [ d7, h2 ] ], [ h3, d7 ], [ s2, h2 ] );
    assertWar( 5, [ 0 ], [ 0, 1 ], [ [ d7, s2 ], [ h3, h2 ] ], [ d7, h3 ], [ s2, h2 ] );
  });

  it( "correctly executes war with one desperate fighter", function() {
    assertWar( 5, [ 1 ], [ 0, 1 ], [ [ h3     ], [ d7, h2 ] ], [ h3, d7 ], [ null, h2 ] );
    assertWar( 5, [ 0 ], [ 0, 1 ], [ [ d7     ], [ h3, h2 ] ], [ d7, h3 ], [ null, h2 ] );
    assertWar( 5, [ 1 ], [ 0, 1 ], [ [ h3, s2 ], [ d7     ] ], [ h3, d7 ], [ s2, null ] );
    assertWar( 5, [ 0 ], [ 0, 1 ], [ [ d7, s2 ], [ h3     ] ], [ d7, h3 ], [ s2, null ] );
  });

  it( "correctly executes war with two desperate fighters", function() {
    assertWar( 5, [ 1 ], [ 0, 1 ], [ [ h3 ], [ d7 ] ], [ h3, d7 ], [ null, null ] );
    assertWar( 5, [ 0 ], [ 0, 1 ], [ [ d7 ], [ h3 ] ], [ d7, h3 ], [ null, null ] );
    assertWar( 5, [ 1 ], [ 0, 1 ], [ [ h3 ], [ d7 ] ], [ h3, d7 ], [ null, null ] );
    assertWar( 5, [ 0 ], [ 0, 1 ], [ [ d7 ], [ h3 ] ], [ d7, h3 ], [ null, null ] );
  });

  it( "correctly executes unresolved wars", function() {
    assertWar( 5, [ 0, 1 ], [ 0, 1 ], [ [ h7, s2 ], [ d7, h2 ] ], [ h7, d7 ], [ s2, h2 ] );
    assertWar( 5, [ 0, 1 ], [ 0, 1 ], [ [ d7, s2 ], [ h7, h2 ] ], [ d7, h7 ], [ s2, h2 ] );
  });

});
