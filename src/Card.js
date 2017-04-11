"use strict";

const SUITS = [ "Spades", "Hearts", "Diamonds", "Clubs" ];
const RANKS = [ "Duece", "Three", "Four", "Five", "Six", "Seven",
                "Eight", "Nine", "Ten", "Jack", "Queen", "King", "Ace" ];

const confirmIdx = ( val, min, max ) => ( Number.isInteger( val ) && val >= min && val <= max ) ? Number( val ) : null;

/*
 * One playing card.
 * Only the rank is significant for this game, but the suit is included for tradition.
 * (private) properties:
 * suit: integer 0..3
 * rank: integer 0..13
 */

class Card {

  constructor( suit, rank ) {

    this.suit = confirmIdx( suit, 0,  3 );
    this.rank = confirmIdx( rank, 0, 12 );

    if ( this.suit === null || this.rank === null )
      throw new Error( `Card with suit "${ suit }" and rank "${ rank }" is not supported.` );
  }

  name() {
    return `${ RANKS[ this.rank ] } of ${ SUITS[ this.suit ] }`;
  }

}

module.exports = Card;
