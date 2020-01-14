
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

function checkForMatch() {
  if ( cardsInPlay[0] === cardsInPlay[1] ) {
    console.log("Oh wow! You found a match!")
  } else {
    console.log("Boo no match :( Try again!")
  }
}

function flipCard(cardId) {
  cardsInPlay.push(cards[cardId].rank);
  console.log("You flipped the " + cards[cardId].rank + " of " + cards[cardId].suit);
  console.log("This is an image of the card: " + cards[cardId].cardImage);
  if (cardsInPlay.length == 2) {
    checkForMatch();
  }
}
flipCard(0);
flipCard(1);
