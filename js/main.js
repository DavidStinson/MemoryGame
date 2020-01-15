
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

function createBoard() {
  for (let i = 0; i < cards.length; i++){
    let cardElement = document.createElement("img");
    cardElement.setAttribute("src", "images/back.png");
    cardElement.setAttribute("id", i);
    cardElement.addEventListener("click", flipCard);
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
  resetBoard();
  cardsInPlay = [];
}

function checkForMatch() {
  if ( cardsInPlay[0] === cardsInPlay[1] ) {
    console.log("Oh wow! You found a match!")
  } else {
    console.log("Boo no match :( Try again!")
  }
  window.setTimeout(resetGame, 1000)
}

function flipCard() {
  let cardId = this.getAttribute("id");
  cardsInPlay.push(cards[cardId].rank);
  console.log("You flipped the " + cards[cardId].rank + " of " + cards[cardId].suit);
  this.setAttribute("src", cards[cardId].cardImage)
  if (cardsInPlay.length == 2) {
    checkForMatch();
  }
}
createBoard();
resetButtonListener();
