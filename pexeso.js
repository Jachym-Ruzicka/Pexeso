const board = document.getElementById("game-board");
const icons = ["⚽", "🥅", "🏆", "👟", "🟨", "🏟️"];
let cards = [];
let flippedCards = [];
let matchedCount = 0;

function startGame() {
    board.innerHTML = "";
    flippedCards = [];
    matchedCount = 0;

    cards = [...icons, ...icons, ...icons];

    /**
     * AI Used
     * Model: Gemini 3.Pro
     */
    cards.sort(() => 0.5 - Math.random());

    for (let i = 0; i < cards.length; i++) {
        let cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.innerText = cards[i];

        cardElement.onclick = function() {
            flipCard(cardElement);
        };

        board.appendChild(cardElement);
    }
}

/**
 * AI Used
 * Model: Gemini 3.Pro
 */
function flipCard(card) {
    if (card.classList.contains("flipped") || card.classList.contains("matched") || flippedCards.length === 3) {
        return;
    }

    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 3) {
        setTimeout(checkMatch, 1000);
    }
}

/**
 * AI Generated
 * Model: Gemini 3.Pro
 */
function checkMatch() {
    let card1 = flippedCards[0];
    let card2 = flippedCards[1];
    let card3 = flippedCards[2];

    if (card1.innerText === card2.innerText && card2.innerText === card3.innerText) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        card3.classList.add("matched");
        matchedCount++;

        if (matchedCount === icons.length) {
            alert("Vyhrál jsi!");
        }
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card3.classList.remove("flipped");
    }

    flippedCards = [];
}

startGame();