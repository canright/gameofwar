"use strict";
var battle = require("./battle.js");

class Trick {

  constructor( hands ) {

    if (!Array.isArray(hands) || hands.length < 2 )
      throw new Error( `Hands are invalid for trick: ${ JSON.stringify(hands) }` );

    this.hands = hands;
    this.faces = this.hands.map( hand => hand.pop() );
  }

  play() {
    return this.faces.reduce( battle, { top: 0, winners: [], kitty: [] } );
  }

}

module.exports = Trick;
