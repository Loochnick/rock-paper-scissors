import {
  CHOICES,
  ROUND_OUTCOME_MESSAGES,
  PROMPT_MESSAGES,
  FINAL_RESULT_MESSAGES,
  TOTAL_ROUNDS,
  GAME_FLOW_MESSAGES,
} from "./constants.js";

import { gameState } from "./gameState.js";

import { delay, Logger, validateSelections, logSelections } from "./utils.js";

const computerPlay = () => {
  const choices = Object.keys(CHOICES);
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

const playRound = (playerSelection, computerSelection) => {
  logSelections(playerSelection, computerSelection);

  // Check for a tie
  if (playerSelection === computerSelection) return ROUND_OUTCOME_MESSAGES.tie;

  // Determine the outcome based on the relationship in CHOICES
  if (CHOICES[playerSelection].beats === computerSelection) {
    return `${ROUND_OUTCOME_MESSAGES.win} ${CHOICES[playerSelection].name} beats ${CHOICES[computerSelection].name}`;
  } else {
    return `${ROUND_OUTCOME_MESSAGES.lose} ${CHOICES[computerSelection].name} beats ${CHOICES[playerSelection].name}`;
  }
};

const displayFinalResult = (playerScore, computerScore) => {
  if (playerScore > computerScore) {
    Logger.success(FINAL_RESULT_MESSAGES.win);
  } else if (playerScore < computerScore) {
    Logger.error(FINAL_RESULT_MESSAGES.lose);
  } else {
    Logger.log(FINAL_RESULT_MESSAGES.tie);
  }
};

const game = () => {
  let isGameCancelled = false;
  let playerScore = 0;
  let computerScore = 0;
  let round = 1;

  try {
    //Welcome Message(only for the first round)
    !gameState.shouldRestart && alert(GAME_FLOW_MESSAGES.welcome);

    // Play rounds
    while (round <= TOTAL_ROUNDS) {
      Logger.log(`Round ${round}:`);

      // Get selections
      const playerSelection = prompt(PROMPT_MESSAGES.playerChoice);
      const computerSelection = computerPlay();

      // Check if the player canceled the game
      if (playerSelection === null) {
        isGameCancelled = true;
        Logger.warn(GAME_FLOW_MESSAGES.gameCancelled);
        break;
      }

      // trim and Make player selection lower case
      const playerSelectionLower = playerSelection.trim().toLowerCase();

      // Validate both selections
      const isSelectionsValid = validateSelections(
        playerSelectionLower,
        computerSelection
      );

      if (isSelectionsValid) {
        // Play one round and get the result
        const resultMessage = playRound(
          playerSelectionLower,
          computerSelection
        );

        // Display the result of the round
        Logger.log(resultMessage);

        // Update score based on the outcome
        if (resultMessage.includes(ROUND_OUTCOME_MESSAGES.win)) {
          playerScore++;
        } else if (resultMessage.includes(ROUND_OUTCOME_MESSAGES.lose)) {
          computerScore++;
        }

        // Show current score
        Logger.info(`Score: Player ${playerScore}, Computer ${computerScore}`);

        round++;
      } else {
        Logger.error(ROUND_OUTCOME_MESSAGES.invalidChoice);
      }
    }

    // Determine and display the final result
    !isGameCancelled && displayFinalResult(playerScore, computerScore);

    //restarting the game
    gameState.shouldRestart = confirm(PROMPT_MESSAGES.tryAgain);
    gameState.shouldRestart
      ? game()
      : Logger.log(GAME_FLOW_MESSAGES.thanksForPlaying);
  } catch (error) {
    Logger.error(GAME_FLOW_MESSAGES.unexpectedError + error.message);
  }
};

// Start the game after a delay
delay(1000).then(() => game());
