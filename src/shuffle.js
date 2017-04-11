"use strict";

/*
 * Shuffle an array: array.shuffle()
 */

function shuffle ( list ) {
  let item = list.length;
  while ( --item > 0 ) {
    const spot = Math.floor( Math.random() * ( item + 1 ));
    const temp = list [ spot ];
    list [ spot ] = list [ item ];
    list [ item ] = temp;
  }
  return list;
}

module.exports = shuffle;
