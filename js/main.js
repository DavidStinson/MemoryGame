/*
   Written by David Stinson, built on a base game created by GA.
   Project Started on 01-08-2020 - Updated 01-19-2020
*/

const cards = [
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
let shuffledCards = [];
let cardInPlayId = -1;
let playerWins = 0;
let playerLosses = 0;
let playerWinsMessage = "";
let playerLossesMessage = "";

// Shuffle the cards on the game board so every game is different
function cardRandomizer() {
  // Create a temporary array (cardsToShuffle) to fill with the cards
  // in the cards array. This array will be destroyed as it is being
  // operated on.
  let cardsToShuffle = [];
  for (let i = 0; i < cards.length; i++) {
    cardsToShuffle[i] = cards[i];
  }
  // Create a new array (shuffledCards) filled with the shuffled cards.
  // This is the array that players interact with.
  let i = 0;
  while (i < cards.length) {
    let randomIndex = Math.floor(Math.random()*cardsToShuffle.length)
    shuffledCards[i] = cardsToShuffle[randomIndex];
    cardsToShuffle.splice(randomIndex, 1);
    i++;
  }
}

// Places the shuffled cards (shuffledCards) on the game board and
// starts to listen for user to interact with cards.
function createBoard() {
  for (let i = 0; i < shuffledCards.length; i++){
    let cardElement = document.createElement("img");
    cardElement.setAttribute("src", "images/back.png");
    cardElement.setAttribute("id", i);
    // Page starts listening for user to interact with cards
    cardElement.addEventListener("click", processGuess);
    document.getElementById("gameBoard").appendChild(cardElement);
  }
}

// Start listening for player to interact with resetButton
function resetButtonListener() {
  let resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", resetGame);
}

// Hides faces of all cards
function resetBoard() {
  for (let i = 0; i < cards.length; i++){
    let cardElement = document.getElementById(i);
    cardElement.setAttribute("src", "images/back.png");
  }
}

// When the game is reset, re-shuffle the cards, flip any cards
// that have been flipped, remove any guesses from the cardsInPlay,
// and the cardInPlayId.
function resetGame() {
  cardRandomizer();
  resetBoard();
  cardsInPlay = [];
  cardInPlayId = -1;
}

// Pauses user interaction with cards
function pauseBoard() {
  for (let i = 0; i < shuffledCards.length; i++){
    let cardElement = document.getElementById(i);
    cardElement.removeEventListener("click", processGuess);
  }
}

// Resume user interaction with the cards and reset the game
function resumeBoard() {
  for (let i = 0; i < shuffledCards.length; i++){
    let cardElement = document.getElementById(i);
    cardElement.addEventListener("click", processGuess);
  }
  resetGame();
}

// Builds and displays the playerScoreMessage showing the player their
// total wins and losses
function playerScoreMessage() {
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

// Checks if the player has won or lost.
function checkForMatch() {
  if ( cardsInPlay[0] === cardsInPlay[1] ) {
    console.log("Oh wow! You found a match!");
    playerWins++;
  } else {
    console.log("Boo no match :( Try again!");
    playerLosses++;
  }
  playerScoreMessage();
  // Restart the game after 1 second. 
  window.setTimeout(resumeBoard, 1000)
}

// Process the player's guess - is it a valid guess?
function processGuess() {
  let cardId = this.getAttribute("id");
  // If it is not a valid guess accuse the player of being a dirty cheater!
  if (cardInPlayId == cardId) {
    // Really this could just fail gracefully without accusing the player
    // of cheating but what's the fun in that?
    console.log("You're not trying to cheat are you?!")
  // If it is a valid guess then...
  } else {
    // Set the card as the cardInPlayId to check for cheating.
    cardInPlayId = cardId;
    // Add the chosen card to the cardsInPlay array.
    cardsInPlay.push(shuffledCards[cardId].rank);
    // Log the card the user chose.
    console.log("You flipped the " + shuffledCards[cardId].rank +
      " of " + shuffledCards[cardId].suit);
    // Display the card the user chose.
    this.setAttribute("src", shuffledCards[cardId].cardImage)
    // When the palyer has made 2 guesses, pause the game board and
    // see if the player has made a match.
    if (cardsInPlay.length == 2) {
      pauseBoard();
      checkForMatch();
    }
  }
}

// On first launch, randomize the cards, build the board, and activate
// the reset button.
cardRandomizer();
createBoard();
resetButtonListener();
