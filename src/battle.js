"use strict";

/*
 * Evaluates an array of cards and returns the results: {
 *   top: (rank) - the rank of the winning card(s)
 *   winners: [int] - the indices of the winning player(s)
 *   kitty: [card] - the cards involved (to award the winner)
 * }
 */

function battle( stat, card, player ) {
  const rank = card ? card.rank : 0;
  if ( card && rank === stat.top )
    stat.winners.push( player );
  else if ( card && rank > stat.top ) {
    stat.top = rank;
    stat.winners = [ player ];
  }
  if ( typeof card !== "undefined" && card !== null )
    stat.kitty.push( card );
  return stat;
}

module.exports = battle;
