export const CHOICES = {
  rock: {
    name: "Rock",
    beats: "scissors"
  },
  paper: {
    name: "Paper",
    beats: "rock"
  },
  scissors: {
    name: "Scissors",
    beats: "paper"
  }
};

export const TOTAL_ROUNDS = 5;

export const GAME_FLOW_MESSAGES = {
  welcome: `
    ✊✋✌️ Welcome to the Ultimate Rock, Paper, Scissors Showdown! ✊✋✌️
    Here are the rules:
    - You will play ${TOTAL_ROUNDS} rounds against the computer.
    - Choose wisely between Rock, Paper, or Scissors each round.
    - Rock beats Scissors, Scissors beats Paper, and Paper beats Rock.
    🏆 The player with the most wins after ${TOTAL_ROUNDS} rounds will be crowned the champion!
    Can you outsmart the computer and claim victory? Let the game begin!
  `,
  thanksForPlaying: "Thanks for playing!",
  gameCancelled: "The game has been cancelled",
  unexpectedError: "An unexpected error occurred: ",
};

export const ROUND_OUTCOME_MESSAGES = {
  tie: "It's a tie!",
  win: "You win this round!",
  lose: "You lost this round!",
  invalidChoice: "Invalid choice! Please select rock, paper, or scissors.",
  cancelled: "The game has been cancelled",
};

export const PROMPT_MESSAGES = {
  playerChoice: "Choose Rock, Paper, or Scissors:",
  tryAgain: "Would you like to try again?",
};

export const FINAL_RESULT_MESSAGES = {
  win: "Congratulations! You won the game!",
  lose: "You lost the game. Better luck next time!",
  tie: "The game is a tie!",
};
