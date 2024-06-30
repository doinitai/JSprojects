/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice 3 times. Each result get added to his ROUND score. After third roll, ROUND score is stored as CURRENT score
- BUT, if the player rolls a '1', all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his CURRENT score. After that, it's the next player's turn
- The first player to reach 20 points on CURRENT score wins the game
*/

//Players
const player0El = document.querySelector('.player-0')
const player1El = document.querySelector('.player-1')
//Scores
const score0El = document.getElementById('score-0')
const score1El = document.getElementById('score-1')
//Current scores
const current0El = document.getElementById('current-0')
const current1El = document.getElementById('current-1')
//Gif / Dice img
const diceEl = document.querySelector('.dice')
//Buttons
const btnNew = document.querySelector('.btn-new')
const btnRoll = document.querySelector('.btn-roll')
const btnHold = document.querySelector('.btn-hold')
//Confetti
const canvas = document.querySelector('#confetti')
const jsConfetti = new JSConfetti()

let score, currentScore, activePlayer, activeGame, clicks

function init() {
    score = [0, 0]
    currentScore = 0
    activePlayer = 0
    clicks = 0

    score0El.textContent = 0
    score1El.textContent = 0

    current0El.textContent = 0
    current1El.textContent = 0
    activeGame = true
    diceEl.src = `/roll-dice/images/animation-dice.gif`

    player0El.classList.remove('player-winner')
    player1El.classList.remove('player-winner', 'player-active')
    player0El.classList.add('player-active')
}
init()

//buttons functionality
btnRoll.addEventListener('click', function () {
    if (activeGame) {
        const dice = Math.trunc(Math.random() * 6) + 1
        clicks ++
        diceEl.src = `/roll-dice/images/dice-${dice}.png`
        if (dice === 1) {
            switchPlayer()
        }
        else if (clicks > 2) {
            currentScore += dice
            document.getElementById(`current-${activePlayer}`).textContent = currentScore
            addScore()
        } else {
            currentScore += dice
            document.getElementById(`current-${activePlayer}`).textContent = currentScore
        }
    }
})

btnHold.addEventListener('click', addScore)

btnNew.addEventListener('click', init)

//Switch Players function
function switchPlayer() {
    document.getElementById(`current-${activePlayer}`).textContent = 0
    currentScore = 0
    activePlayer = activePlayer === 0 ? 1 : 0
    player0El.classList.toggle('player-active')
    player1El.classList.toggle('player-active')
    clicks = 0
}

function addScore() {
    if (activeGame) {
        score[activePlayer] += currentScore
        document.getElementById(`score-${activePlayer}`).textContent = score[activePlayer]

        if(score[activePlayer] >= 20) {
            activeGame = false
            document.querySelector('.player-active').classList.add('player-winner')
            jsConfetti.addConfetti()
        } else {
            switchPlayer()
        }
    }
}
