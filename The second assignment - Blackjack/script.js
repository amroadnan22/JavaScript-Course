let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = true
let message = ""

let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1
  return randomNumber > 10 ? 10 : randomNumber === 1 ? 11 : randomNumber
}

function startGame() {
  let firstCard = getRandomCard()
  let secondCard = getRandomCard()
  cards = [firstCard, secondCard]
  sum = firstCard + secondCard
  isAlive = true
  hasBlackJack = false
  renderGame()
}

function renderGame() {
  cardsEl.textContent = "Cards: " + cards.join(" ")
  sumEl.textContent = "Sum: " + sum

  if (sum < 21) {
    message = "Do you want to draw a new card?"
  } else if (sum === 21) {
    message = "You've got Blackjack!"
    hasBlackJack = true
  } else {
    message = "You're out of the game!"
    isAlive = false
  }

  messageEl.textContent = message
}

function newCard() {
  if (isAlive && !hasBlackJack) {
    let card = getRandomCard()
    cards.push(card)
    sum += card
    renderGame()
  }
}
