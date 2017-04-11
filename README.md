# The Game of War

## Overview

A simulation of the popular children's card game called 'war'.  It supports 2 to 6 players, 1 to 4 suits and 4 to 13 ranks per suit.  The default game is with two players and a standard card 52 card deck (4 suits of 13 ranks).  Since outcomes are dependent entirely on the card ranks, the card suits have no impact and are shown only for illustration.

This is not formally a game in the sense that the players make no decisions that impact play except initial conditions - It is no more a game than a coin toss.  Once started, the simulation runs through to completion with no user intervention.

### Game play is as follows:

- The game is started with three parameters (number of players, suits and ranks).

- The deck of cards is generated for the given number of suits and ranks.

- The deck is randomly shuffled (Fisher-Yates algorithm).

- The cards are dealt to hands depending on the number of players.  If the deck is not evenly divisible by the number of players, the remaining cards are dealt to the first players until exhausted.  Thus, the first players might begin with one more card than the last players.

- Play proceeds through tricks.  Each player still having cards plays their top card.  The highest rank card wins the trick.  A war is triggered when more than one player has the same highest rank card.  Warring players draw two cards and compare their seconds until one player emerges with a highest rank card.  If a player has only 1 card remaining, then it is used for the comparison.

- All cards involved in a trick are accumulated into a kitty which is shuffled and added to the bottom of the winners hand.  The shuffle here is important - without it, the game is prone to infinite loops with no emergent winner.

### Justification

This project was developed in the evenings over the course of about a week as a demonstration of software development capabilities.  In addition to demonstrating basic skills in Javascript ES2015, it is a study in Object Oriented Programming, Javascript data structures and unit testing.

## Prerequisites and Dependencies

This is a simple node application that runs on any version node that supports ES2015 (v4 and later), particularly the latest LTS v6.10.2 and v7.8.0.

It has no additional dependencies for execution.  It requires Mocha for testing.

## To run the Simulation

The simulation runs in two modes.  Console mode runs directly on the node server console.  Web mode in client server mode from a web browser.

### Console Mode

From the console, in the root folder for the application:

With no parameters, simulate a game with 2 players and a standard 52 card deck:

$ node war

// The simulation honors 3 optional parameters:

$ node war <players> <suits> <ranks>

For example:

$ node war 2 4 13 -- default game with 2 players, 4 suits and 13 ranks.
$ node war 4      -- 4 players and standard deck.
$ node war 2 2    -- 2 players with 2 suits (each with default 13 ranks)
$ node war 2 4 6  -- 2 players with 4 suits (each with 6 ranks)

All of the above works with 'npm start' replacing 'node war':

$ npm start
$ npm start 4
$ npm start 2 2
...

### Web Mode

From the console, in the root folder for the application, start the web server with:

$ node webwar

Then, on the url being served, request page: /gameofwar.html

For example, with the default configuration, request:

http://localhost:3000/gameofwar.html

In web mode, the parameters are passed as query parameters.

Like this:

http://localhost:3000/gameofwar.html?players=2&suits=4&ranks=13 -- default game with 2 players, 4 suits and 13 ranks.
http://localhost:3000/gameofwar.html?players=4                  -- 4 players and standard deck.
http://localhost:3000/gameofwar.html?players=2&suits=2          -- 2 players with 2 suits (each with default 13 ranks)
http://localhost:3000/gameofwar.html?players=2&suits=4&ranks=6  -- 2 players with 4 suits (each with 6 ranks)

The Web Mode UI is extremely primitive and unsophisticated.  It, basically just responds with a console-like log.  A next step might be to produce a proper web page with compelling look and feel instead of the current admittedly ugly presentation.

## Installation

## Testing

The application lightly wraps the Game "class".  Game integrates the Deck, Card, Trick and War "classes" to implement the simulation.

Unit testing of these classes is straightforward with these notes:

A unit test for the shuffle function, because its results are, of course, random, which does not nicely fit the unit testing framework (which is to compare actual to expected results).

One could (and many have) written doctorial theses on proving (or testing) that a shuffle algorithm is truly random and tends to an even distribution.  Rather than pursue that level of rigor, I aim to achieve a reasonable confidence that we have a good shuffle.

My solution is:

1 Use the clearly defined, well documented, proven random, and easily implemented Fisher-Yates algorithm.
2 There is some indication on line that the javascript Math.random() function is not perfectly unbiased and produces a statistically skewed shuffle on a 52 element set.  I choose to overlook this as being of academic concern and irrelevant for this simulation of a child's game.  For other applications, this might have to be dealt with.
2 Test the "outside" of the shuffle thorougly.  Assert that the output has the same number of elements as the input.
3 Test the edge cases that are predictable - an array with no or a single element.
4 Make the shuffle function injectible (in the Deck constructor and the Game play method) so that the use of shuffle can tested be with a deterministic function.  Then, unit test with Array.reverse() to assert that the use of the shuffle function is sound regardless of the shuffle function itself.
5 Run a statistical test on the shuffle function.  The fisher-Yates algorithm has been throughly tested and documented to be sound.  A statistical test here helps confirm (beyond code inspection) that that algorithm is being correctly implemented here.  Basically, run 100 shuffles for 10 values and inspect the results.  The values should be relatively evenly distributed and that is testable.

### Unit Tests
$ npm test

or

$ mocha

## Author

Jim Canright
jim@canright.net

## MIT License





/* Each active player reveals top card from their hand.
 * Cards are compared and the player showing the card with the highest rank wins the trick.
 * If more than one player show cards with the winning rank, then they are at war.
 * Eech player at war pulls two cards from their hand and shows the second one.
 * Again, the player showing the card with the hightest rank wins the trick.
 * If more than one player again show cards with the winning rank, they war again until a single winner emerges.
 * The winning player adds all cards involved in the trick to the bottom of their hand.
 * Future: The ordering of the cards added to the hand is not carefully considered here.
 * (provate) property hands is a reference to the hands from the game.  Each trick mutates the hands received.
 * (private) property kitty accumulates the cards involved in the trick to be rewarded to the winner of the trick.
 * (private) property faces isolates the card shown for each hand.
 * (private) property wins array of winners (indices to hands).  Trick is done when wins.length = 1.

 hello
*/
