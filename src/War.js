"use strict";
var battle = require("./battle.js");

class War {

  constructor( hands, fighters ) {

    if (!Array.isArray(hands) || hands.length < 2 )
      throw new Error( `War requires at least two hands: ${ JSON.stringify(hands) }` );

    if (!Array.isArray(fighters) || fighters.length < 2 )
      throw new Error( `War reqires at least two sides: ${ JSON.stringify(fighters) }` );

    this.hands = hands;
    this.fighters = fighters;
    this.hides = [];
    this.faces = [];

    for (let fighter = 0; fighter < fighters.length; ++fighter) {
      let hand = hands[ fighters[fighter] ];
      this.hides.push(hand.length > 1 ? hand.pop() : null);
      this.faces.push(hand.length     ? hand.pop() : null);
    }

  }

  play() {
    return this.faces.reduce( battle, { top: 0, winners: [], kitty: [], prize: this.hides } );
  }

}

module.exports = War;
