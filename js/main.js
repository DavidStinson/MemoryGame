
let cards = ["queen", "queen", "king", "king"]
let cardsInPlay = [];

function checkForMatch() {
  if ( cardsInPlay[0] === cardsInPlay[1] ) {
    console.log("Oh wow! You found a match!")
  } else {
    console.log("Boo no match :( Try again!")
  }
}

function flipCard(cardId) {
  cardsInPlay.push(cards[cardId]);
  console.log("You flipped the " + cards[cardId] + " card!");
  if (cardsInPlay.length == 2) {
    checkForMatch();
  }
}
flipCard(0);
flipCard(2);
