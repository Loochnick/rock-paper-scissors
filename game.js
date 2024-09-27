function computerPlay() {
    const choices = ["Rock", "Paper", "Scissors"];
    const randomChoice = Math.floor(Math.random() * choices.length);
    return choices[randomChoice];
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    const computerSelectionLower = computerSelection.toLowerCase();

    if (playerSelection === computerSelectionLower) {
        return "It's a tie!";
    }

    if (
        (playerSelection === "rock" && computerSelectionLower === "scissors") ||
        (playerSelection === "paper" && computerSelectionLower === "rock") ||
        (playerSelection === "scissors" && computerSelectionLower === "paper")
    ) {
        return `You win this round! ${playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)} beats ${computerSelection}`;
    } else {
        return `You lost this round! ${computerSelection} beats ${playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)}`;
    }
}

function isValidChoice(choice) {
    const validChoices = ["rock", "paper", "scissors"];
    return validChoices.includes(choice.toLowerCase());
}

function game() {
    let playerScore = 0;
    let computerScore = 0;
    let round = 0;

    function playNextRound() {
        if (round < 5) {
            round++;
            setTimeout(() => {
                let playerSelection = prompt(`Round ${round}: Enter Rock, Paper, or Scissors:`);

            // Checks if the user clicked cancel, throws warning, restarts round
                if (playerSelection === null) {
                    console.log("You cancelled the round. Please type correctly.");
                    round--;
                    playNextRound();
                    return;
                }

            // User input validator, throws warning, restarts round
                playerSelection = playerSelection.trim();
                if (!isValidChoice(playerSelection)) {
                    console.log("Invalid input! Please type 'Rock', 'Paper', or 'Scissors'.");
                    round--;
                    playNextRound();
                    return;
                }

                const computerSelection = computerPlay();
                const result = playRound(playerSelection, computerSelection);
                console.log(`Round ${round}: ${result}`);
                
            // Updates scoreboard
                if (result.includes("win")) {
                    playerScore++;
                } else if (result.includes("lost")) {
                    computerScore++;
                }

            // Shows the current score
                console.log(`Current Score - You: ${playerScore}, Computer: ${computerScore}`);

            // Added time delay so the new round is not immediate
                playNextRound();
            }, 1000);
        } else {

            if (playerScore > computerScore) {
                console.log(`You won the game! Final Score: You ${playerScore} - Computer ${computerScore}`);
            } else if (computerScore > playerScore) {
                console.log(`You lost the game! Final Score: You ${playerScore} - Computer ${computerScore}`);
            } else {
                console.log(`The game is a tie! Final Score: You ${playerScore} - Computer ${computerScore}`);
            }
        }
    }

    playNextRound();
}

game();