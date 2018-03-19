/*
 * Create a list that holds all of your cards
 */
// const iconsArray = Array.prototype.slice.call(document.querySelectorAll('.card .fa'));
const icons = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'];
const deck = document.querySelector('.deck');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML - shuffled version of list
 *   - add each card's HTML to the page
 */
function makeCards() {
	const shuffledCards = shuffle(icons);

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


//console.log(document.querySelectorAll('.card'));


function cardOpen() {

}
// document.querySelectorAll('.card').addEventListener("click", cardOpen);