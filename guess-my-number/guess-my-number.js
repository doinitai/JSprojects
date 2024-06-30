const guessField = document.querySelector('.guess')//input
const guessSubmit = document.querySelector('.submit')//button Check
const resetButton = document.querySelector('.header-left')//button Again
const lowOrHigh = document.querySelector('.first-line')
const yourScore = document.querySelector('.score')
const highScoreEl = document.querySelector('.highscore')
const yourPrevAnswer = document.querySelector('.answer')//prev answer
const canvas = document.querySelector('#confetti');
const jsConfetti = new JSConfetti();

//number random generator
let randomNumber = generateRandomNumber()

function generateRandomNumber() {
    return Math.floor(Math.random() * 20) + 1;
}

console.log(randomNumber)

let score = 20
let highscore = 0

//input and verification
function checkGuess() {
    const userGuess = parseInt(guessField.value); //transform introduced value in integer
    const answerButton = yourPrevAnswer; //check if number is correct
    if (!userGuess) {
        lowOrHigh.textContent = 'No number entered!';//if no number in input
    } else if(userGuess === randomNumber) {
        document.body.style.background = 'linear-gradient(to right, #051937, #004d7a, #008793, #00bf72, #a8eb12)';
        lowOrHigh.textContent = 'Congratulations! You guessed the number';
        answerButton.textContent = `${userGuess}`
        jsConfetti.addConfetti()
        if (score > highscore) {
            highscore = score
            highScoreEl.textContent = highscore
        }
    } else if (userGuess > randomNumber) {
        if (score > 1) {
            lowOrHigh.textContent = '📈The number is too high';
            score--
            yourScore.textContent = score
        } else {
            lowOrHigh.textContent = '😥YOU LOST!';
            yourScore.textContent = '0'
            document.body.style.background = 'linear-gradient(to right, #dc256d, #db1859, #d70e44, #d10f2f, #c91717)'
        }
    } else if (userGuess < randomNumber) {
        if (score > 1) {
            lowOrHigh.textContent = '📉The number is too small';
            score--
            yourScore.textContent = score
        } else {
            lowOrHigh.textContent = '😥YOU LOST!';
            yourScore.textContent = '0'
            document.body.style.background = 'linear-gradient(to right, #dc256d, #db1859, #d70e44, #d10f2f, #c91717)'
        }
    }
    guessField.value = ''; //delete input value after each guess
}

guessSubmit.addEventListener('click', checkGuess);//when click on button Check, checkGuess function is called
guessField.addEventListener('keyup', function(event) { //when click on Enter, checkGuess function is called
    if (event.key === 'Enter') {
        checkGuess();
    }
});


//button 'Again'
resetButton.addEventListener('click', resetGame); //when click on button Again, resetGame function is called

function resetGame() {
    score = 20
    yourScore.textContent = score
    randomNumber = generateRandomNumber(); //on click on button, program will generate new random number
    document.body.style.background = ''; //reset background color
    lowOrHigh.textContent = 'Start guessing...';//change text of 'first-line'
    guessField.value = '';//delete value of input
    yourPrevAnswer.textContent = '?';//reset prev answer with ?
    yourPrevAnswer.disabled = true;
}
