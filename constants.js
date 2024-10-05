import { Logger } from "./utils.js";

export const CHOICES = {
  rock: {
    name: "Rock",
    beats: "scissors",
  },
  paper: {
    name: "Paper",
    beats: "rock",
  },
  scissors: {
    name: "Scissors",
    beats: "paper",
  },
};

export const TOTAL_ROUNDS = 5;

//local storage
export const LOCAL_STORAGE_KEY = "gameState";

export const GAME_INITIAL_DELAY = 1000;

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
  unexpectedError: "An unexpected error occurred: ",
};

export const ROUND_OUTCOME_MESSAGES = {
  tie: "It's a tie!",
  win: "You win this round!",
  lose: "You lost this round!",
  invalidChoice: "Invalid choice! Please select rock, paper, or scissors.",
};

export const PROMPT_MESSAGES = {
  playerChoice: "Choose Rock, Paper, or Scissors:",
  tryAgain: "Would you like to try again?",
};

export const MATCH_RESULT_MESSAGES = {
  win: "Congratulations! You won the match!",
  lose: "You lost the match. Better luck next time!",
  tie: "The match is a tie!",
  cancelled: "The match was cancelled.",
};

export const RESULTS = {
  win: "win",
  lose: "lose",
  tie: "tie",
  cancelled: "cancelled",
};

// Configuration for match results
export const MATCH_RESULT_CONFIG = {
  win: {
    logMethod: Logger.success,
    message: MATCH_RESULT_MESSAGES.win,
  },
  lose: {
    logMethod: Logger.error,
    message: MATCH_RESULT_MESSAGES.lose,
  },
  tie: {
    logMethod: Logger.log,
    message: MATCH_RESULT_MESSAGES.tie,
  },
};
