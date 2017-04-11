"use strict";
var Deck  = require("./Deck.js");
var Trick = require("./Trick.js");
var War   = require("./War.js");
var shuffle = require("./shuffle.js");

/*
 * A utility function to constrain a numeric value between min and max values
 */

const bound = ( val, min, max ) => Math.max( Math.min( Number( val ), max ), min );

/*
 * The cards are shuffled and dealt to the players.
 * Tricks are executed until all cards are in the hand of one player (the winner).
 */

class Game {

  constructor( players = 2, suits = 4, ranks = 13 ) {
    this.suits   = bound( suits,   1,  4 );
    this.ranks   = bound( ranks,   4, 13 );
    this.players = bound( players, 2,  6 );
    this.output  = [];

    this.deck = new Deck( this.suits, this.ranks );
    this.hands = this.deck.deal( this.players );
    this.say( "Playing with a " + (this.suits === 4 && this.ranks === 13 ? "standard 52 card deck." : `custom deck ( ${ this.suits } suits and ${ this.ranks } ranks ).`) );
    this.say( `Cards are dealt to ${ players } players.`);
    this.say( "Initial Score: " + this.hands.map( hand => hand.length).join(", "));
    this.over(); // show initial score
  }

  over() {
    const alives = this.hands.reduce( ( livers, hand, idx ) => { if (hand.length) livers.push( idx ); return livers; }, [] );
    if ( alives.length === 1 )
      return alives[0] + 1;

    else {
//      if (this.hands.reduce( (tot, hand) => tot + hand.length, 0) !== 52)
//        return 1;
//      process.abort();
      return 0;
    }

  }

  play (trickNo, sorter = shuffle) {
    const trick = new Trick( this.hands );
    let winner;
    const play = trick.play();
    let kitty = play.kitty;
    let msg = play.kitty.map( card => card.name() ).join( " vs " );

    if ( play.winners.length === 1 )
      winner = play.winners[ 0 ];
    else {
      let bat;
      do {
        const war = new War( this.hands, play.winners );
        bat = war.play();

        msg = msg + "\nWAR: " + bat.kitty.map(card => card.name() ).join( " vs " );
        kitty = kitty.concat( bat.kitty.concat( bat.prize ) );

      }
      while ( bat.winners.length > 1 );
      winner = play.winners[ bat.winners[ 0 ] ];
    }
    kitty = sorter(kitty.filter(card => card));
    this.hands[ winner ] = kitty.concat( this.hands[ winner ] );

    this.say( `${trickNo}: ${msg} => Score: ${this.hands.map( hand => hand.length).join(", ")}` );
  }

  say (s) {
    this.output.push(s);
  }

  resolve () {
    let winner;
    let trick = 0;
    while ( !( winner = this.over() ) ) {
      this.play(++trick);
    }
    this.say( `Winner: Player #${ winner } in ${ trick } tricks.` );
    this.say("\nThe game of War: The only way to never lose is not to play the game...");

    return this.output;
  }

}

module.exports = Game;
