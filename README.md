# Memory Game Project
---

### Project Purpose
---
This game was built for a Udacity Javascript Course project. Its purpose is to demonstrate mastery of combining Javascript interactivity with static HTML and CSS.


### How to load the game
---
Clone the [repo] (URL HERE) and open index.html in a web browser.

### How to play the game
---
The board consists of a grid of 16 cards randomly shuffled and displayed face down. Each card in the deck has a symbol on one side. There are 8 pairs of symbols in the deck.

The aim of the game is to match up all the symbol pairs.

##### On each turn:

- The player clicks a card to reveal its symbol. 
- The player clicks a second card, trying to find the corresponding card with the matching symbol.
- If the cards match, both stay face up.
- If the cards do not match, they display face down once again.

##### Winning the game:

When all the cards are correctly matched, a winning pop-up will appear to congratulate the player.

### Special features:
---
The game includes a **score panel** above the board which features:
- A **star rating** of 3 stars. This rating will drop periodically the more moves it takes the player to complete the game.
- The **number of moves** the player has taken so far.
- A **timer** that records how long it is taking to play the game.
- A **restart** button that reloads a new game.

The **winning** pop-up displays the star rating, number of moves made and the time taken to complete the game. There is a button to play again.

The game also features a **game over** pop-up which appears when the star rating becomes 0 stars. A message displays with a button to try again.

### Resources used to build game:
---
**Array shuffle:**
- http://stackoverflow.com/a/2450976

**Timer:**
- https://www.w3schools.com/howto/howto_js_countdown.asp

**Modal pop ups:**
- https://www.w3schools.com/howto/howto_css_modals.asp

**Game restart:**
- https://www.w3schools.com/jsref/met_loc_reload.asp

**Udacity resources:**
- [Starter code](https://github.com/udacity/fend-project-memory-game)
- [Project specifications](https://review.udacity.com/#!/rubrics/591/view)
