import { CHOICES, LOCAL_STORAGE_KEY, RESULTS } from "./constants.js";
import { DEFAULT_STATE } from "./stateManager.js";

export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const validateSelections = (playerSelection, computerSelection) => {
  let isValid = playerSelection in CHOICES && computerSelection in CHOICES;

  return isValid;
};

export const logSelections = (playerSelection, computerSelection) => {
  Logger.info(`You chose: ${CHOICES[playerSelection].name}`);
  Logger.info(`Computer chose: ${CHOICES[computerSelection].name}`);
};

// Logger utility for logging various message types
export const Logger = {
  log: (message) => console.log(`%c${message}`, "color: black;"),
  info: (message) =>
    console.log(`%c${message}`, "color: blue; font-weight: bold;"),
  warn: (message) =>
    console.log(`%c${message}`, "color: orange; font-weight: bold;"),
  error: (message) =>
    console.log(`%c${message}`, "color: red; font-weight: bold;"),
  success: (message) =>
    console.log(`%c${message}`, "color: green; font-weight: bold;"),
};

// Function to calculate the total score and round statistics
export const calculateGameStats = (state) => {
  let totalScore = 0;
  let matchesWon = 0;
  let matchesLost = 0;
  let matchesTied = 0;
  let matchesCancelled = 0;

  state.matches.forEach((match) => {
    totalScore += match.playerScore;

    if (match.result === RESULTS.win) matchesWon++;
    else if (match.result === RESULTS.lose) matchesLost++;
    else if (match.result === RESULTS.cancelled) matchesCancelled++;
    else matchesTied++;
  });

  return {
    totalScore,
    matchesWon,
    matchesLost,
    matchesTied,
    matchesCancelled,
  };
};

//Local Storage helper functions
export const saveStateToLocalStorage = (state) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
};

export const loadStateFromLocalStorage = () => {
  const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (savedState) return JSON.parse(savedState);
  else return JSON.parse(JSON.stringify(DEFAULT_STATE)); //Deep Copy
};
