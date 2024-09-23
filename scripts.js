function computerPlay() {
  const randomNumber = Math.random();

  let computerSelection = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerSelection = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerSelection = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerSelection = 'scissors';
  }
  console.log(computerSelection);
  return computerSelection;
}

const playerSelection = prompt(`Enter "rock", "paper" or "scissors"`).toLowerCase();
console.log(playerSelection);

function playRound(computerSelection, playerSelection) {
  let result = '';

  if (playerSelection === 'scissors') {
    if (computerSelection === 'rock') {
      result = 'You lose! Rock beats Scissors';
    } else if (computerSelection === 'paper') {
      result = 'You win! Scissors beat Paper';
    } else if (computerSelection === 'scissors') {
      result = 'Tie';
    }

  } else if (playerSelection === 'paper') {
    if (computerSelection === 'rock') {
      result = 'You win! Paper beats Rock';
    } else if (computerSelection === 'paper') {
      result = 'Tie';
    } else if (computerSelection === 'scissors') {
      result = 'You lose. Scissors beat Paper';
    }
    
  } else if (playerSelection === 'rock') {
    if (computerSelection === 'rock') {
      result = 'Tie';
    } else if (computerSelection === 'paper') {
      result = 'You lose! Paper beats Rock';
    } else if (computerSelection === 'scissors') {
      result = 'You win! Rock beats Scissors';
    }
  }

  console.log(result);
  return result;
}

playRound(computerPlay(), playerSelection);