const board = document.getElementById("game-board");
const turnIndicator = document.getElementById("turn-indicator");
const score1Text = document.getElementById("score1-text");
const score2Text = document.getElementById("score2-text");

const icons = ["⚽", "🥅", "🏆", "👟", "🟨", "🏟️", "🟥", "🧤", "⏱️", "📣"];
let cards = [];//3O
let flippedCards = [];// trojice, takze max 3

let player1Name = "Player 1";
let player2Name = "Player 2";
let score1 = 0;
let score2 = 0;
let currentPlayer = 1;

function startGame() {
    let input1 = prompt("Zadej jméno prvního hráče:");
    if (input1) { player1Name = input1; }

    let input2 = prompt("Zadej jméno druhého hráče:");
    if (input2) { player2Name = input2; }

    score1 = 0;
    score2 = 0;

    if (Math.random() < 0.5) { // randomizer, kdo bude hdat prvni
        currentPlayer = 1;
    } else {
        currentPlayer = 2;
    }

    updateScoreboard();

    board.innerHTML = "";
    flippedCards = [];

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

function updateScoreboard() {
    score1Text.innerText = player1Name + ": " + score1;
    score2Text.innerText = player2Name + ": " + score2;

    if (currentPlayer === 1) {
        turnIndicator.innerText = "Na řadě je: " + player1Name;
    } else {
        turnIndicator.innerText = "Na řadě je: " + player2Name;
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
 * z casti vygenerovane, zbytek dodelan mnou
 */
function checkMatch() {
    let card1 = flippedCards[0];
    let card2 = flippedCards[1];
    let card3 = flippedCards[2];

    if (card1.innerText === card2.innerText && card2.innerText === card3.innerText) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        card3.classList.add("matched");

        if (currentPlayer === 1) {
            score1++;
        } else {
            score2++;
        }

        if (score1 + score2 === icons.length) {
            if (score1 > score2) {
                alert("Vyhrál " + player1Name + " se skóre " + score1);
            } else if (score2 > score1) {
                alert("Vyhrál " + player2Name + " se skóre " + score2);
            } else {
                alert("Remiza");
            }
        }
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card3.classList.remove("flipped");

        if (currentPlayer === 1) {
            currentPlayer = 2;
        } else {
            currentPlayer = 1;
        }
    }

    updateScoreboard();
    flippedCards = [];
}

startGame();