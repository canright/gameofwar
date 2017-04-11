"use strict";
var assert = require("assert");
var War = require("../src/War.js");

var s2 = { suit: 0, rank: 0 };
var h2 = { suit: 1, rank: 0 };
var d2 = { suit: 2, rank: 0 };
var s3 = { suit: 0, rank: 1 };
var h3 = { suit: 1, rank: 1 };
var h7 = { suit: 1, rank: 5 };
var d7 = { suit: 2, rank: 5 };
var ha = { suit: 1, rank: 12 };
var da = { suit: 2, rank: 12 };

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

});
