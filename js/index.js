const suit = ['hearts', 'spades', 'diamonds', 'clubs'];
const cardsWrapper = document.querySelector('.cards-wrapper');
const btnWrapper = document.querySelector(
  '.btn-wrapper',
); /* eslint-disable-line */
const selectedCardsWrapper = document.querySelector(
  '.selected-cards',
); /* eslint-disable-line */

function magicTrick() {
  const card = selectedCardsWrapper.firstChild.className;
  const cards = [...cardsWrapper.children];
  const number = card.split('-').pop();
  const matchingCards = cards.filter(
    (matchingCard) => matchingCard.className.split('-').pop() === number,
  );

  matchingCards.forEach((matchedCard, i) => {
    const positionFromLeft = i * 31.5;
    matchedCard.style.left = `${positionFromLeft + 20}px`;
    selectedCardsWrapper.appendChild(matchedCard);
  });
}

function createMagicButton() {
  const cards = [...cardsWrapper.children];
  const magicButton = document.createElement('button');

  magicButton.className = 'btn btn-lg btn-secondary';
  magicButton.textContent = 'Magic';
  magicButton.style = 'margin:5px';
  magicButton.addEventListener('click', magicTrick);

  cards.forEach((card) => card.removeEventListener('click', createMagicButton));
  btnWrapper.appendChild(magicButton);
}

function selectedCardsHandler(event) {
  if (selectedCardsWrapper.children.length > 0) return;
  event.target.style.left = '0px';
  selectedCardsWrapper.appendChild(event.target);
  createMagicButton();
}

function createCards() {
  const cards = [];

  for (let i = 0; i < suit.length; i += 1) {
    for (let x = 1; x <= 13; x += 1) {
      const cardObject = {
        value: x,
        suit: suit[i],
      };
      cards.push(cardObject);
    }
  }

  cards.forEach((card, i) => {
    const positionFromLeft = i * 31.5;
    const cardElement = document.createElement('div');

    cardElement.setAttribute('data-value', card.value);
    cardElement.classList.add('card', `${card.suit}-${card.value}`);
    cardElement.style.left = `${positionFromLeft}px`;
    cardElement.addEventListener('click', selectedCardsHandler);
    cardsWrapper.append(cardElement);
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
  flipButton.textContent = 'Flip cards';
  flipButton.style = 'margin:5px';
  flipButton.addEventListener('click', flipCards);
  btnWrapper.appendChild(flipButton);
}

function startGame() {
  replaceInitialButton();
  createCards();
}

document.getElementById('start-game').addEventListener('click', startGame);
