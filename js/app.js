 // Display the cards on the page
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

function makeCards() {
	const shuffledCards = shuffle(icons);

	for (let i = 0; i < shuffledCards.length; i++) {
		const card = document.createElement('li');
		card.className = 'card';
		const newCard = '<i class="fa fa-' + shuffledCards[i] + '"></i>';
		card.innerHTML = newCard;
		deck.appendChild(card);
	}

	deck.addEventListener('click', cardOpen);
	deck.addEventListener('click', timer);
}

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

// Matching cards logic
let openCards = [];
const cards = deck.getElementsByTagName('li');

function cardOpen(event) {
	if (event.target.nodeName == 'LI') {
		event.target.className = 'card open show';
	 	openCards.push(event.target.innerHTML);
	 	if (openCards.length == 2) {
	 		deck.removeEventListener('click', cardOpen);
	 		compareCards();
	 	}
	 	moveCounter();
	}
 }

function compareCards() {
	openCards[0] === openCards[1] ? setTimeout(cardMatch, 500) : setTimeout(cardNotMatch, 700);
}

function cardMatch() {
	openCards = [];
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].className == 'card open show') {
			cards[i].className = 'card match';
		}
	}
	deck.addEventListener('click', cardOpen);
}

function cardNotMatch() {
	openCards = [];
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].className == 'card open show') {
			cards[i].className = 'card';
		}
	}
	deck.addEventListener('click', cardOpen);
}

// Move counter
const scorePanel = document.querySelector('.score-panel');
const stars = scorePanel.getElementsByTagName('li');
const moves = scorePanel.querySelector('.moves');
let clickCount = 0;

function moveCounter() {
	clickCount++;
	moves.innerHTML = clickCount;
 	if (clickCount == 15) {
 		stars[0].style.visibility = 'hidden';
 	} else if (clickCount == 25) {
 		stars[0, 1].style.visibility = 'hidden';
 	} else if (clickCount == 40) {
 		stars[0, 1, 2].style.visibility = 'hidden';
 		setTimeout(gameOver, 500);
 	}
}

// Timer
const timerText = document.querySelector('.timer');
let counter = 0;

function timer(event) {
	if (event.target.nodeName == 'LI') {
		deck.removeEventListener('click', timer);
	}
	timer = setInterval(function() {
		counter++;
		let m = ((counter / 60) | 0);
		let s = counter % 60;
		if (m < 10) {
			m = '0' + m;
		}
		if (s < 10) {
			s = '0' + s;
		}
		timerText.innerHTML = m + ':' + s;
		if (document.getElementsByClassName('card match').length == 16) {
			clearInterval(timer);
			gameWin();
		}
	}, 1000);
}

// Winning modal
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

// Restart game
const reset = document.querySelector('.restart');

reset.addEventListener('click', restartGame);

function restartGame() {
	location.reload();
}