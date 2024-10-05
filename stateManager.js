export const DEFAULT_STATE = {
  matches: [],
  currentMatch: {
    matchNumber: 1,
    rounds: [],
    playerScore: 0,
    computerScore: 0,
    result: null,
  },
  currentRound: {
    roundNumber: 1,
    playerChoice: null,
    computerChoice: null,
    result: null,
  },
};

export const saveCurrentMatch = (state, payload) => {
  const newState = {
    ...state,
    matches: [...state.matches, payload],
  };

  return newState;
};

export const saveCurrentRound = (state, payload) => {
  const newState = {
    ...state,
    currentMatch: {
      ...state.currentMatch,
      rounds: [...state.currentMatch.rounds, payload],
    },
  };

  return newState;
};

export const setCurrentMatch = (state, payload) => {
  const newState = {
    ...state,
    currentMatch: {
      ...state.currentMatch,
      ...payload,
    },
  };

  return newState;
};

export const setCurrentRound = (state, payload) => {
  const newState = {
    ...state,
    currentRound: {
      ...state.currentRound,
      ...payload,
    },
  };

  return newState;
};
