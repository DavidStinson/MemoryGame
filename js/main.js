
let cards = [
  {
    rank: "queen",
    suit: "hearts",
    cardImage: "images/queen-of-hearts.png"
  },
  {
    rank: "queen",
    suit: "diamonds",
    cardImage: "images/queen-of-diamonds.png"
  },
  {
    rank: "king",
    suit: "hearts",
    cardImage: "images/king-of-hearts.png"
  },
  {
    rank: "king",
    suit: "diamonds",
    cardImage: "images/king-of-diamonds.png"
  }
]
let cardsInPlay = [];
let cardsRandom = [];
let cardInPlayId = -1;
let playerWins = 0;
let playerLosses = 0;
let playerWinsMessage = "";
let playerLossesMessage = "";


function cardRandomizer() {
  let cardsToShuffle = [];
  for (let i = 0; i < cards.length; i++) {
    cardsToShuffle[i] = cards[i];
  }
  let i = 0;
  while (i < cards.length) {
    let randomIndex = Math.floor(Math.random()*cardsToShuffle.length)
    cardsRandom[i] = cardsToShuffle[randomIndex];
    cardsToShuffle.splice(randomIndex, 1);
    i++;
  }
}

function createBoard() {
  for (let i = 0; i < cardsRandom.length; i++){
    let cardElement = document.createElement("img");
    cardElement.setAttribute("src", "images/back.png");
    cardElement.setAttribute("id", i);
    cardElement.addEventListener("click", processGuess);
    document.getElementById("gameBoard").appendChild(cardElement);
  }
}

function resetButtonListener() {
  let resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", resetGame);
}

function resetBoard() {
  for (let i = 0; i < cards.length; i++){
    let cardElement = document.getElementById(i);
    cardElement.setAttribute("src", "images/back.png");
  }
}

function resetGame() {
  cardRandomizer();
  resetBoard();
  cardsInPlay = [];
  cardInPlayId = -1;
}

function pauseBoard() {
  for (let i = 0; i < cardsRandom.length; i++){
    let cardElement = document.getElementById(i);
    cardElement.removeEventListener("click", processGuess);
  }
}

function resumeBoard() {
  for (let i = 0; i < cardsRandom.length; i++){
    let cardElement = document.getElementById(i);
    cardElement.addEventListener("click", processGuess);
  }
  resetGame();
}

function playerWon(playerWon) {
  playerWon === true ? playerWins++ : playerLosses++;
  switch (playerWins) {
    case 0:
      playerWinsMessage = "You have not won yet";
      break;
    case 1:
      playerWinsMessage = "You have won 1 time";
      break;
    default:
      playerWinsMessage = "You have won " + playerWins + " times";
  }
  switch (playerLosses) {
    case 0:
      playerLossesMessage = "have not lost yet.";
      break;
    case 1:
      playerLossesMessage = "have lost once.";
      break;
    default:
      playerLossesMessage = "have lost " + playerLosses + " times.";
  }
  console.log(playerWinsMessage + " and " + playerLossesMessage);
}

function checkForMatch() {
  if ( cardsInPlay[0] === cardsInPlay[1] ) {
    console.log("Oh wow! You found a match!")
    playerWon(true);
  } else {
    console.log("Boo no match :( Try again!")
    playerWon(false);
  }
  window.setTimeout(resumeBoard, 1000)
}

function processGuess() {
  let cardId = this.getAttribute("id");
  if (cardInPlayId == cardId) {
    console.log("You're not trying to cheat are you?!")
  } else {
    cardInPlayId = cardId;
    cardsInPlay.push(cardsRandom[cardId].rank);
    console.log("You flipped the " + cardsRandom[cardId].rank +
      " of " + cardsRandom[cardId].suit);
    this.setAttribute("src", cardsRandom[cardId].cardImage)
    if (cardsInPlay.length == 2) {
      pauseBoard();
      checkForMatch();
    }
  }
}
cardRandomizer();
createBoard();
resetButtonListener();
