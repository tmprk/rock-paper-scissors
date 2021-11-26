let playerScore = 0;
let computerScore = 0;
let games = 5

let moves = {
    '✊🏻': 0,
    '✋🏻': 1,
    '✌🏻': 2,
}

document.getElementById('start-game').addEventListener('click', function () {
    resetMatch();
    startGame();
});

let dialog = document.getElementById('dialog')
let startButton = document.getElementById('start-game')

let playerSlot = document.getElementById('player-slot');
let computerSlot = document.getElementById('computer-slot')

let computerScoreText = document.getElementById('computer-score')
let playerScoreText = document.getElementById('player-score')

function startGame() {
    // make dialog visible and hide start button
    dialog.style.display = 'block';
    startButton.style.display = 'none';

    document.querySelectorAll('.selectable').forEach(function (item) {
        item.addEventListener('click', function () {
            // get computer player's selection
            let computerSelection = computerPlay()
            let playerSelection = item.innerHTML

            // fill computer player's card
            computerSlot.innerHTML = computerSelection
            playerSlot.innerHTML = playerSelection

            playerSlot.style.opacity = 1
            playerSlot.style.transform = "rotate(7deg) translatey(0px)";

            computerSlot.style.opacity = 1
            computerSlot.style.transform = "rotate(-7deg) translatey(0px)";

            let message = ''
            let result = playRound(playerSelection, computerSelection)
            if (result == 1) {
                playerScore++;
                playerScoreText.innerHTML = `Player Score: ${playerScore}`
                message = `You Win! ${playerSelection} beats ${computerSelection}.`
                dialog.style.color = 'green'
            } else if (result == 2) {
                computerScore++;
                computerScoreText.innerHTML = `Computer Score: ${computerScore}`
                message = `You Lose! ${computerSelection} beats ${playerSelection}.`
                dialog.style.color = 'red'
            } else {
                message = 'It\'s a tie.'
            }
            dialog.innerHTML = message

            if (playerScore == 5 || computerScore == 5) {
                (playerScore > computerScore) ? dialog.innerHTML = "You win the match!" : "Better luck next time!";
                console.log("end game")
                setTimeout(function () {
                    resetMatch();
                    refreshSelection()
                }, 4000)
            } else {
                setTimeout(function () {
                    refreshSelection();
                }, 2000)
            }
            console.log(`Player: ${playerScore}, Computer: ${computerScore}`)
        });
    });
}

function resetMatch() {
    playerScore = 0
    computerScore = 0
    games = 0

    dialog.style.display = 'none';
    startButton.style.display = 'block';
    playerScoreText.innerHTML = `Player Score: 0`
    computerScoreText.innerHTML = `Computer Score: 0`
}

function refreshSelection() {
    playerSlot.style.opacity = 0;
    playerSlot.style.transform = "scale(2) rotate(0deg) translatey(-40px)";
    computerSlot.style.opacity = 0;
    computerSlot.style.transform = "scale(2) rotate(0deg) translatey(-40px)";

    dialog.innerHTML = "Pick your move.";
    dialog.style.color = 'black';
}

function computerPlay() {
    let options = ['✊🏻', '✋🏻', '✌🏻'];
    return options[Math.floor(Math.random() * options.length)];
}

// Shorter version
// https://stackoverflow.com/questions/9553058/scalable-solution-for-rock-paper-scissor
function playRound(playerSelection, computerSelection) {
    let a = moves[playerSelection]
    let b = moves[computerSelection]
    let result = (3 + a - b) % 3
    return result
}

// Longer version
// function playRound(playerSelection, computerSelection) {
//     if (playerSelection.toLowerCase() == 'rock') {
//         if (computerSelection == 'paper') {
//             return "You Lose! Paper beats Rock"
//         } else if (computerSelection == 'scissors') {
//             return "You Win! Rock beats Scissors"
//         } else {
//             return "Tied"
//         }
//     } else if (playerSelection.toLowerCase() == 'paper') {
//         if (computerSelection == 'scissors') {
//             return "You Lose! Scissors beats Rock"
//         } else if (computerSelection == 'rock') {
//             return "You Win! Paper beats Rock"
//         } else {
//             return "Tied"
//         }
//     } else if (playerSelection.toLowerCase() == 'Scissors') {
//         if (computerSelection == 'rock') {
//             return "You Lose! Rock beats Scissors"
//         } else if (computerSelection == 'Paper') {
//             return "You Win! Scissors beats Paper"
//         } else {
//             return "Tied"
//         }
//     }
// }