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
const cards = deck.getElementsByTagName('li');

function cardOpen(event) {
	// Ensure matched cards are no longer clickable
	if (event.target.className == 'card match') {
		// Do nothing
	} else if (event.target.nodeName == 'LI') {
		// Check how many cards in deck are open
		let countOpen = 0;
		for (let i = 0; i < cards.length; i++) {
			if (cards[i].className == 'card open show') {
				countOpen += 1;
			}
		}
		// Open card on first click
		if (countOpen < 1) {
			event.target.className = 'card open show';
		// Open card on second click
		} else if (countOpen == 1) {
			// Update move count for first click
			moveCounter();
			// Prevent same card being clicked more than once in a turn
		 	if (event.target.className == 'card open show') {
		 		//Do nothing
		 	} else {
		 		event.target.className = 'card open show';
		 		// Compare the cards clicked
		 		compareCards();
			}
			// Update move count for second click
			setTimeout(moveCounter, 500);
		}
	}
}

// Check for card matching
function compareCards() {
	let chosenCard = '';
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].className == 'card open show' && chosenCard == '') {
			chosenCard = cards[i].innerHTML;
		} else if (cards[i].className == 'card open show' && chosenCard !== '') {
			if (chosenCard == cards[i].innerHTML) {
				setTimeout(cardMatch, 500);
			}
		}
	}
	setTimeout(cardNotMatch, 700);
}

// Card matching
function cardMatch() {
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].className == 'card open show') {
			cards[i].className = 'card match';
		}
	}
}

// Card not matching
function cardNotMatch() {
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].className == 'card open show') {
			cards[i].className = 'card';
		}
	}
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