 // List the card icons
const icons = [
	'bicycle',
	'bicycle',
	'leaf',
	'leaf',
	'cube',
	'cube',
	'anchor',
	'anchor',
	'paper-plane-o',
	'paper-plane-o',
	'bolt',
	'bolt',
	'bomb',
	'bomb',
	'diamond',
	'diamond'
];
const deck = document.querySelector('.deck');

// Create each card element and shuffle the cards
function makeCards() {
	const shuffledCards = shuffle(icons);

	for (let i = 0; i < shuffledCards.length; i++) {
		const card = document.createElement('li');
		card.className = 'card';
		const newCard = '<i class="fa fa-' + shuffledCards[i] + '"></i>';
		card.innerHTML = newCard;
		deck.appendChild(card);
	}
	// Click listener for card elements
	deck.addEventListener('click', cardOpen);
	// Click listener to start game timer
	deck.addEventListener('click', timer);
}

// Display the shuffled cards on the page
makeCards();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Display card symbol on click
let openCards = [];
const cards = deck.getElementsByTagName('li');

function cardOpen(event) {
	if (event.target.nodeName == 'LI') {
		event.target.className = 'card open show';
	 	// Add clicked cards to 'open cards' array for comparison
	 	openCards.push(event.target.innerHTML);
	 	if (openCards.length == 2) {
	 		// Remove click listeners to compare 'open cards'
	 		deck.removeEventListener('click', cardOpen);
	 		compareCards();
	 	}
	 	// Update move count
	 	moveCounter();
	}
 }

// Check for card matching
function compareCards() {
	openCards[0] === openCards[1] ? setTimeout(cardMatch, 500) : setTimeout(cardNotMatch, 700);
}

// Card matching 
function cardMatch() {
	openCards = [];
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].className == 'card open show') {
			cards[i].className = 'card match';
		}
	}
	// Replace click listeners on cards
	deck.addEventListener('click', cardOpen);
}

// Card not matching
function cardNotMatch() {
	openCards = [];
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].className == 'card open show') {
			cards[i].className = 'card';
		}
	}
	// Replace click listeners on cards
	deck.addEventListener('click', cardOpen);
}

// Update move count and star rating
const scorePanel = document.querySelector('.score-panel');
const stars = scorePanel.getElementsByTagName('li');
const moves = scorePanel.querySelector('.moves');
let clickCount = 0;

function moveCounter() {
	// Increment move counter
	clickCount++;
	moves.innerHTML = clickCount;
	// Set click limits for star ratings
 	if (clickCount == 15) {
 		stars[0].style.visibility = 'hidden';
 	} else if (clickCount == 25) {
 		stars[0, 1].style.visibility = 'hidden';
 	} else if (clickCount == 40) {
 		stars[0, 1, 2].style.visibility = 'hidden';
 		// Display game over modal
 		setTimeout(gameOver, 500);
 	}
}

// Game timer function based on examples from https://stackoverflow.com/questions/30747364
const timerText = document.querySelector('.timer');
let counter = 0;

function timer(event) {
	// Timer starts on first click only
	if (event.target.nodeName == 'LI') {
		deck.removeEventListener('click', timer);
	}
	// Increment timer every second
	timer = setInterval(function() {
		counter++;
		// Calculate minutes and seconds
		let m = ((counter / 60) | 0);
		let s = counter % 60;
		// Add leading zeros if minutes or seconds are < 10
		if (m < 10) {
			m = '0' + m;
		}
		if (s < 10) {
			s = '0' + s;
		}
		timerText.innerHTML = m + ':' + s;
		// Stop timer once all cards are matched
		if (document.getElementsByClassName('card match').length == 16) {
			clearInterval(timer);
			// Display game win modal
			gameWin();
		}
	}, 1000);
}

// Game win modal
const winModal = document.querySelector('.win-modal');
const winTime = document.querySelector('.win-time');
const winMessage = document.querySelector('.win-stats');
const playAgain = document.querySelector('.play-again');

function gameWin() {
	winModal.style.display = 'block';
	winTime.innerHTML = timerText.innerHTML;
	winMessage.innerHTML = 'You won with ' + moves.innerHTML + ' moves and ' + stars.length + ' stars';
	playAgain.addEventListener('click', restartGame);
}

// Game over modal
const loseModal = document.querySelector('.lose-modal');
const tryAgain = document.querySelector('.try-again');

function gameOver() {
	loseModal.style.display = 'block';
	tryAgain.addEventListener('click', restartGame);
}

// Reset game during game play
const reset = document.querySelector('.restart');

reset.addEventListener('click', restartGame);

// Restart game 
function restartGame() {
	location.reload();
}