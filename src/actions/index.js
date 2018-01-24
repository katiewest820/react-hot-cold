export const USER_GUESS = 'USER_GUESS';
export const FEEDBACK = 'FEEDBACK';
export const AURAL_STATUS = 'AURURAL_STATUS';
export const CORRECT_ANS = 'CORRECT_ANS';

export const userGuess = (payload) => ({
  type: USER_GUESS,
  payload
});

export const feedback = (payload) => ({
  type: FEEDBACK,
  payload
});

export const auralStatus = (payload) => ({
  type: AURAL_STATUS,
  payload
});

export const correctAnswer = (payload) => ({
  type: CORRECT_ANS,
  payload
});