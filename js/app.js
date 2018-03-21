/*
 * Create a list that holds all of your cards
 */
const icons = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'];
const deck = document.querySelector('.deck');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML - shuffled version of list
 *   - add each card's HTML to the page
 */
function makeCards() {
	const shuffledCards = shuffle(icons); //insert shuffle function

	for (let i = 0; i < shuffledCards.length; i++) {
		const card = document.createElement("li");
		card.className = "card";
		const newCard = "<i class='fa fa-" + shuffledCards[i] + "'></i>";
		card.innerHTML = newCard
		deck.appendChild(card);
		card.addEventListener("click", cardOpen);
	}

}

makeCards()


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// matching cards logic
let openCards = [];
const cards = deck.getElementsByTagName('li');

function cardOpen() {
 	this.className = "card open show";
 	openCards.push(this.innerHTML);
 	if (openCards.length == 2) {
 		compareCards();
 	}
 	moveCounter();
 }

function compareCards() {
	if (openCards[0] === openCards[1]) {
		setTimeout(cardMatch, 500);
	} else {
		setTimeout(cardNotMatch, 700);
	}
}

function cardMatch() {
	openCards = [];
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].className == "card open show") {
			cards[i].className = "card match";
		}
	}
}

function cardNotMatch() {
	openCards = [];
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].className == "card open show") {
			cards[i].className = "card";
		}
	}
}

// move counter
const scorePanel = document.querySelector('.score-panel');
const stars = scorePanel.getElementsByTagName("li");
const moves = scorePanel.querySelector('.moves');
let clickCount = 0;

function moveCounter() {
	clickCount ++;
	 	if (clickCount == 15) {
	 		stars[0].style.visibility = 'hidden';
	 		moves.innerHTML = "2 moves";
	 	} else if (clickCount == 25) {
	 		stars[0, 1].style.visibility = 'hidden';
	 		moves.innerHTML = "1 move";
	 	} else if (clickCount == 40){
	 		stars[0, 1, 2].style.visibility = 'hidden';
	 		moves.innerHTML = "0 moves";
	 		setTimeout(gameOver, 500);
	 	}
}

function gameOver() {
	alert("GAME OVER!");
}

// timer
