"use strict";
var Card = require("./Card.js");
var shuffle = require("./shuffle.js");

const confirmIdx = ( val, min, max ) => ( Number.isInteger( val ) && val >= min && val <= max ) ? Number( val ) : null;

/*
 * (private) properties:
 * cards: [card] - generated unshuffled deck of cards.
 * shuffled: [card] - shuffled deck of cards.
 * shuffler: function reference - function to shuffle the cards.  (injectable method for mocking)
 * hands: [[card]] - a hand for each player.  Each hand is the array of cards for that player.
 */

class Deck {

  constructor( suits = 4, ranks = 13, sorter = shuffle ) {
    const useSuits = confirmIdx( suits, 1,  4 );
    const useRanks = confirmIdx( ranks, 1, 13 );

    if ( useSuits === null || useRanks === null )
      throw new Error( `Card with ${suits} suits and ${ranks} ranks is not supported.` );

    this.cards = [];
    for ( let s = 0; s < useSuits; ++s )
      for ( let r = 0; r < useRanks; ++r )
        this.cards.push( new Card( s, r ) );
    this.shuffler = sorter;
    this.shuffle( this.cards );
  }

  shuffle( cards = this.cards ) {
    this.shuffled = this.shuffler( cards );
  }

  length() {
    return this.shuffled.length;
  }

  /*
   * Deals all cards in deck into hands.
   * If the cards do not divide evenly to the players, the remainder are dealt to the first players until expended.
   */

  deal( players ) {
    const hands = []; // hands dealt
    let hand = 0;
    for ( let player = 0; player < players; ++player )
      hands.push( [] );
    while ( this.shuffled.length ) {
      hands[ hand ].push( this.shuffled.pop() );
      if ( ++hand >= players )
        hand = 0;
    }

    return hands;
  }
}

module.exports = Deck;
