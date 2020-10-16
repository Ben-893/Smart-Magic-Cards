const suit = ['hearts', 'spades', 'clubs', 'diamonds'];
const cardsWrapper = document.querySelector('.cards-wrapper');
const btnWrapper = document.querySelector(
  '.btn-wrapper'
); /* eslint-disable-line */
const selectedCardsWrapper = document.querySelector(
  '.selected-cards'
); /* eslint-disable-line */

function createCards() {
  const cards = [];
  // Create an array with objects containing the value and the suit of each card
  for (let i = 0; i < suit.length; i++) {
    for (let x = 1; x <= 13; x++) {
      const cardObject = {
        value: x,
        suit: suit[i],
      };
      cards.push(cardObject);
    }
  }

  console.log(cards);

  // For each dataObject, create a new card and append it to the DOM
  cards.forEach((card, i) => {
    const positionFromLeft = i * 31.5;
    const cardElement = document.createElement('div'); //Creates a div
    cardElement.setAttribute('data-value', card.value); // Sets the attribute of the newly created div to a number associated with that card
    cardElement.classList.add('card', `${card.suit}-${card.value}`); // Sets the class of the newly created div equal to the suit-number of the card
    cardElement.style.left = `${positionFromLeft}px`; // Manipulates the positioning of a div 'card'
    cardsWrapper.append(cardElement); // Appends each new div 'card' to the cardsWrapper div
  });
}

// Function to clear out the initial button and create new buttons to play the game.
function createButtons() {
  // Your Code
}

// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame() {
  createButtons();
  createCards();
}

document.getElementById('start-game').addEventListener('click', startGame);
