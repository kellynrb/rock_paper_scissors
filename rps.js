//Declare and initialize variables
let randomNumber = 0;
let userWins = 0;
let computerWins = 0;
let gameCount = 0;
let userWon;
let computerSelection;

//Set variables to elements selected by CSS selectors
const userChoice = document.querySelector('.choiceField');
const userSubmit = document.querySelector('.choiceSubmit');
const winner = document.querySelector('.winner');
const winTotal = document.querySelector('.winTotal');
const lossTotal = document.querySelector('.lossTotal');
const gameStatus = document.querySelector('.gameStatus');

//Returns the computer's play based on a random number from 1-3 inclusive
function computerPlay() {
    randomNumber = Math.floor(Math.random()*3) + 1;
    if (randomNumber === 1) {
        computerSelection = 'rock';
    } else if (randomNumber === 2) {
        computerSelection = 'paper';
    } else if (randomNumber === 3) {
        computerSelection = 'scissors';
    }
    return computerSelection;
}

//Returns the winner of the round based on traditional rock, paper, scissors logic
function playRound(playerSelection, computerSelection) {
    userWon = 0;
    playerSelection = playerSelection.toLowerCase();
    if (playerSelection === 'rock'){
        if (computerSelection === 'rock'){
            winner.textContent = 'Draw! Rock equals Rock.';
            userWon = 2;
        } else if (computerSelection === 'paper') {
            winner.textContent = 'You lose! Paper beats Rock.';
        } else {
            winner.textContent = 'You win! Rock beats Scissors.';
            userWon = 1;
        }
    } else if (playerSelection === 'paper'){
        if (computerSelection === 'rock'){
            winner.textContent = 'You win! Paper beats Rock.';
            userWon = 1;
        } else if (computerSelection === 'paper') {
            winner.textContent = 'Draw! Paper equals Paper.';
            userWon = 2;
        } else {
            winner.textContent = 'You lose! Scissors beats Paper.';
        }
    } else if (playerSelection === 'scissors'){
        if (computerSelection === 'rock'){
            winner.textContent = 'You lose! Rock beats Scissors.';
        } else if (computerSelection === 'paper') {
            winner.textContent = 'You win! Scissors beats Paper.';
            userWon = 1;
        } else {
            winner.textContent = 'Draw! Scissors equals Scissors.';
            userWon = 2;
        }
    } else {
        winner.textContent = 'Check your spelling.';
        userWon = 2;
    }
    userChoice.value = '';
    return userWon;
}

//Plays a 5 round game that keeps score and reports a winner at the end
function game() {
    if (gameCount < 5) {
        computerSelection = computerPlay();
        playRound(userChoice.value, computerSelection);
        if (userWon === 1) {
            userWins++;
            gameCount++;
        } else if (userWon === 0){
            computerWins++;
            gameCount++;
        }
        winTotal.textContent = 'Wins: ' + userWins.toString();
        lossTotal.textContent = 'Losses: ' + computerWins.toString();
        console.log(gameCount);
        if (gameCount === 5) {
            if (userWins > computerWins) {
                gameStatus.textContent = 'Game over! You win!';
                gameStatus.style.backgroundColor = 'green';
                gameStatus.style.color = 'white';
            } else if (userWins < computerWins) {
                gameStatus.textContent = 'Game over! You lose!';
                gameStatus.style.backgroundColor = 'red';
            } else {
                gameStatus.textContent = 'Game over! Draw!';
                gameStatus.style.backgroundColor = 'yellow';
            }
        }
    } else if (gameCount === 5) {
        gameCount = 0;
        userWins = 0;
        computerWins = 0;
        gameStatus.textContent = '';
        gameStatus.style.backgroundColor = 'white';
        game();
    }
}

//Calls the game function when the user clicks the 'Shoot!' button
userSubmit.addEventListener('click', game);

//Allows the user to submit a play by pressing 'Enter'
var input = document.getElementById("choiceField");
input.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("button").click();
    }
});