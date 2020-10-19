const suit = ['hearts', 'spades', 'clubs', 'diamonds'];
const cardsWrapper = document.querySelector('.cards-wrapper');
const btnWrapper = document.querySelector(
  '.btn-wrapper',
); /* eslint-disable-line */
const selectedCardsWrapper = document.querySelector(
  '.selected-cards',
); /* eslint-disable-line */

function createCards() {
  const cards = [];
  // Create an array with objects containing the value and the suit of each card
  for (let i = 0; i < suit.length; i += 1) {
    for (let x = 1; x <= 13; x += 1) {
      const cardObject = {
        value: x,
        suit: suit[i],
      };
      cards.push(cardObject);
    }
  }

  // For each dataObject, create a new card and append it to the DOM
  cards.forEach((card, i) => {
    const positionFromLeft = i * 31.5;
    const cardElement = document.createElement('div'); // Creates a div
    cardElement.setAttribute('data-value', card.value); // Sets the attribute of the newly created div to a number associated with that card
    cardElement.classList.add('card', `${card.suit}-${card.value}`); // Sets the class of the newly created div equal to the suit-number of the card
    cardElement.style.left = `${positionFromLeft}px`; // Manipulates the positioning of a div 'card'
    cardsWrapper.append(cardElement); // Appends each new div 'card' to the cardsWrapper div
  });
}

function flipCards() {
  const cards = cardsWrapper;
  cards.classList.toggle('hidden');
}

function shuffleCards() {
  const cards = [...cardsWrapper.children];
  const shuffledCards = cards
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);

  while (cardsWrapper.firstChild) {
    cardsWrapper.removeChild(cardsWrapper.lastChild);
  }

  shuffledCards.forEach((card, i) => {
    const positionFromLeft = i * 31.5;
    card.style.left = `${positionFromLeft}px`;
    cardsWrapper.appendChild(card);
  });
}

// Function to clear out the initial button and create new buttons to play the game.
function replaceInitialButton() {
  const initialButton = document.getElementById('start-game');
  btnWrapper.removeChild(initialButton);

  const shuffleButton = document.createElement('button');
  shuffleButton.className = 'btn btn-lg btn-secondary';
  shuffleButton.textContent = 'Shuffle';
  shuffleButton.style = 'margin:5px';
  shuffleButton.addEventListener('click', shuffleCards);
  btnWrapper.appendChild(shuffleButton);

  const flipButton = document.createElement('button');
  flipButton.className = 'btn btn-lg btn-secondary';
  flipButton.textContent = 'Show/Hide';
  flipButton.style = 'margin:5px';
  flipButton.addEventListener('click', flipCards);
  btnWrapper.appendChild(flipButton);
}

// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame() {
  replaceInitialButton();
  createCards();
}

document.getElementById('start-game').addEventListener('click', startGame);
