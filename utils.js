import { CHOICES } from "./constants.js";

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
