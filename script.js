//UI
const scoreInfo = document.getElementById('scoreInfo')
const scoreMessage = document.getElementById('scoreMessage')
const playerScorePara = document.getElementById('playerScore')
const computerScorePara = document.getElementById('computerScore')
const playerSign = document.getElementById('playerSign')
const computerSign = document.getElementById('computerSign')
const rockBtn = document.getElementById('rockBtn')
const paperBtn = document.getElementById('paperBtn')
const scissorsBtn = document.getElementById('scissorsBtn')
const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')

rockBtn.addEventListener('click', () => handleClick('ROCK'))
paperBtn.addEventListener('click', () => handleClick('PAPER'))
scissorsBtn.addEventListener('click', () => handleClick('SCISSORS'))
restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndGameModal)

function handleClick(playerSelection) {
    if(isGameOver()) {
        openEndGameModal();
        return
    }

    const computerSelection = getRandomChoice();
    playRound(playerSelection,computerSelection);
    updateChoices(playerSelection,computerSelection);
    updateScore()

    if(isGameOver()) {
        openEndGameModal();
        setFinalMessage()
    }
}

// GAME ROCK PAPER SCISSORS
let playerScore = 0
let computerScore = 0
let roundWinner = ''

const playRound = (playerSelection, computerSelection) => {
    if (playerSelection === computerSelection) {
        roundWinner = 'tie'
    }

    if (
        (playerSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
        (playerSelection === 'SCISSORS' && computerSelection === 'PAPER') ||
        (playerSelection === 'PAPER' && computerSelection === 'ROCK')
    ) {
        playerScore++
        roundWinner = 'player'
    }

    if (
        (computerSelection === 'ROCK' && playerSelection === 'SCISSORS') ||
        (computerSelection === 'SCISSORS' && playerSelection === 'PAPER') ||
        (computerSelection === 'PAPER' && playerSelection === 'ROCK')
    ) {
        computerScore++
        roundWinner = 'computer'
    }

    updateScoreMessage(roundWinner, playerSelection, computerSelection)
}

function updateScoreMessage(winner, playerSelection, computerSelection) {
    if (winner === 'player') {
      scoreMessage.textContent = `${capitalizeFirstLetter(
        playerSelection
      )} beats ${computerSelection.toLowerCase()}`
      return
    }
    if (winner === 'computer') {
      scoreMessage.textContent = `${capitalizeFirstLetter(
        playerSelection
      )} is beaten by ${computerSelection.toLowerCase()}`
      return
    }
  
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} ties with ${computerSelection.toLowerCase()}`
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function isGameOver() {
    return playerScore === 5 || computerScore === 5
}

function getRandomChoice() {
    let randomRandom = Math.floor(Math.random() * 3)
    switch (randomRandom) {
        case 0:
            return 'ROCK'
        case 1:
            return 'PAPER'
        case 2:
            return 'SCISSORS'
    }
}


function updateChoices(playerSelection,computerSelection) {
    let imagesDatabase = {
      ROCK: document.getElementById('rock').src,
      PAPER: document.getElementById('paper').src,
      SCISSORS: document.getElementById('scissors').src,
    }

    playerSign.textContent = ''
    computerSign.textContent = ''

    let humanDiv = document.createElement('div');
    let botDiv = document.createElement('div');

    humanDiv.innerHTML =
        "<img src='" +
        imagesDatabase[playerSelection] +
        "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(52, 119, 219, 0.7);'>";
    botDiv.innerHTML =
        "<img src='" +
        imagesDatabase[computerSelection] +
        "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(219, 52, 60, 0.7);'>";


    switch (playerSelection) {
        case 'ROCK':
          document.getElementById('playerSign').appendChild(humanDiv);
          break
        case 'PAPER':
          document.getElementById('playerSign').appendChild(humanDiv);
          break
        case 'SCISSORS':
          document.getElementById('playerSign').appendChild(humanDiv);
          break
      }
    
      switch (computerSelection) {
        case 'ROCK':
          document.getElementById('computerSign').appendChild(botDiv);
          break
        case 'PAPER':
          document.getElementById('computerSign').appendChild(botDiv);
          break
        case 'SCISSORS':
          document.getElementById('computerSign').appendChild(botDiv);
          break
      }
}

function updateScore() {
    if (roundWinner === 'tie') {
        scoreInfo.textContent = "It's a tie "
    } else if (roundWinner === 'player') {
        scoreInfo.textContent = 'You won!'
    } else if (roundWinner === 'computer') {
        scoreInfo.textContent = 'You lost!'
    }

    playerScorePara.textContent = `Player: ${playerScore}`
    computerScorePara.textContent = `Computer: ${computerScore}`
}

function openEndGameModal() {
    endgameModal.classList.add('active')
    overlay.classList.add('active')
}

function closeEndGameModal() {
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
}

function setFinalMessage() {
    return playerScore > computerScore
    ?(endgameMsg.textContent = 'You Won!')
    :(endgameMsg.textContent = 'You lost...')
}

function restartGame() {
    playerScore = 0
    computerScore = 0
    scoreInfo.textContent = 'Choose your weapon'
    scoreMessage.textContent = 'First to score 5 points wins the game'
    playerScorePara.textContent = 'Player: 0'
    computerScorePara.textContent = 'Computer: 0'
    playerSign.textContent = '❔'
    computerSign.textContent = '❔'
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
}