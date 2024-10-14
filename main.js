import {
  CHOICES,
  ROUND_OUTCOME_MESSAGES,
  PROMPT_MESSAGES,
  MATCH_RESULT_MESSAGES,
  TOTAL_ROUNDS,
  GAME_FLOW_MESSAGES,
  RESULTS,
  MATCH_RESULT_CONFIG,
} from "./constants.js";

import {
  saveCurrentMatch,
  saveCurrentRound,
  setCurrentMatch,
  setCurrentRound,
  DEFAULT_STATE,
} from "./stateManager.js";

import {
  Logger,
  validateSelections,
  logSelections,
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
  calculateGameStats,
} from "./utils.js";

const computerPlay = () => {
  const choices = Object.keys(CHOICES);
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

const playRound = (playerSelection, computerSelection) => {
  logSelections(playerSelection, computerSelection);

  // Check for a tie
  if (playerSelection === computerSelection)
    return { outcome: RESULTS.tie, message: ROUND_OUTCOME_MESSAGES.tie };

  // Determine the outcome based on the relationship in CHOICES
  if (CHOICES[playerSelection].beats === computerSelection) {
    return {
      outcome: RESULTS.win,
      message: `${ROUND_OUTCOME_MESSAGES.win} ${CHOICES[playerSelection].name} beats ${CHOICES[computerSelection].name}`,
    };
  } else {
    return {
      outcome: RESULTS.lose,
      message: `${ROUND_OUTCOME_MESSAGES.lose} ${CHOICES[computerSelection].name} beats ${CHOICES[playerSelection].name}`,
    };
  }
};

const getCurrentMatchResult = (state) => {
  let result;
  const { playerScore, computerScore } = state.currentMatch;

  if (playerScore > computerScore) result = RESULTS.win;
  else if (playerScore < computerScore) result = RESULTS.lose;
  else result = RESULTS.tie;

  return result;
};

// Function to log the match result
const logMatchResult = (matchResult) => {
  const resultDetail = MATCH_RESULT_CONFIG[matchResult];

  resultDetail
    ? resultDetail.logMethod(resultDetail.message)
    : Logger.error("Unknown result");
};

const updateStateAfterRound = (state, outcome) => {
  //update the scores
  if (outcome === RESULTS.win) {
    state = setCurrentMatch(state, {
      playerScore: state.currentMatch.playerScore + 1,
    });
  } else if (outcome === RESULTS.lose) {
    state = setCurrentMatch(state, {
      computerScore: state.currentMatch.computerScore + 1,
    });
  }

  //update round result
  state = setCurrentRound(state, { result: outcome });

  //save the current round
  state = saveCurrentRound(state, { ...state.currentRound });

  //reset the current round
  state = setCurrentRound(state, {
    ...DEFAULT_STATE.currentRound,
    roundNumber: state.currentMatch.rounds.length + 1,
  });

  return state;
};

const updateStateAfterMatch = (state, matchResult) => {
  //update the result
  state = setCurrentMatch(state, { result: matchResult });

  //save the current match
  state = saveCurrentMatch(state, { ...state.currentMatch });

  //reset the current round
  state = setCurrentRound(state, {
    ...DEFAULT_STATE.currentRound,
  });

  //reset the current match
  state = setCurrentMatch(state, {
    ...DEFAULT_STATE.currentMatch,
    matchNumber: state.matches.length + 1,
  });

  return state;
};

const game = (state) => {
  //Welcome message(only for the first time)
  state.currentMatch.matchNumber === 1 &&
    Logger.log(GAME_FLOW_MESSAGES.welcome);

  // Notify the player which match they are currently playing
  Logger.warn(`Match ${state.currentMatch.matchNumber}`);

  // Play rounds
  while (state.currentRound.roundNumber <= TOTAL_ROUNDS) {
    Logger.log(`Round ${state.currentRound.roundNumber}:`);

    // Get selections
    const playerSelection = prompt(PROMPT_MESSAGES.playerChoice);
    const computerSelection = computerPlay();

    // Check if the player canceled the game
    if (playerSelection === null) {
      state = setCurrentMatch(state, { result: RESULTS.cancelled });
      Logger.warn(MATCH_RESULT_MESSAGES.cancelled);
      break;
    }

    //update selections in state
    state = setCurrentRound(state, {
      playerChoice: playerSelection.trim().toLowerCase(),
      computerChoice: computerSelection,
    });

    // Validate both selections
    const isSelectionsValid = validateSelections(
      state.currentRound.playerChoice,
      state.currentRound.computerChoice
    );

    if (isSelectionsValid) {
      // Play one round and get the result
      const resultDetail = playRound(
        state.currentRound.playerChoice,
        state.currentRound.computerChoice
      );

      // Display the result of the round
      Logger.log(resultDetail.message);

      // Update state after each round
      state = updateStateAfterRound(state, resultDetail.outcome);

      // Show current score
      Logger.info(
        `Score: Player ${state.currentMatch.playerScore}, Computer ${state.currentMatch.computerScore}`
      );
    } else {
      Logger.error(ROUND_OUTCOME_MESSAGES.invalidChoice);
    }
  }

  // getting the current match result
  const matchResult = getCurrentMatchResult(state);

  // Log the result
  logMatchResult(matchResult);

  // updating the state after each match
  state = updateStateAfterMatch(state, matchResult);

  // Calculate the total score and other game statistics after the match
  const { totalScore, matchesWon, matchesLost, matchesTied, matchesCancelled } =
    calculateGameStats(state);

  // Alert the player of the total score, and matches won, lost, and cancelled
  Logger.info(
    `Your total score is ${totalScore}. Matches won: ${matchesWon}, Matches lost: ${matchesLost}, Matches Tied: ${matchesTied}, Matches cancelled: ${matchesCancelled}.`
  );
  Logger.log("----------------------");

  // save the updated state to local storage
  saveStateToLocalStorage(state);

  //Asking the player if they want to play again
  const shouldPlayAgain = confirm(PROMPT_MESSAGES.tryAgain);

  shouldPlayAgain
    ? game(state)
    : Logger.log(GAME_FLOW_MESSAGES.thanksForPlaying);
};

//Get the initilized State
const state = loadStateFromLocalStorage();

try {
  //play
  game(state);
} catch (error) {
  Logger.error(GAME_FLOW_MESSAGES.unexpectedError + error.message);
}
