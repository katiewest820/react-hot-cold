import {USER_GUESS, FEEDBACK, AURAL_STATUS, CORRECT_ANS} from '../actions';

const initialState = {
  guesses: [],
  auralStatus: '',
  feedback: 'Make your guess',
  correctAns: Math.round(Math.random() * 100) + 1
}

export const gameReducer = (state=initialState, action) => {
  
  if(action.type === CORRECT_ANS){
    return Object.assign({}, state, {
      guesses: [],
      auralStatus: '',
      feedback: 'Make your guess',
      correctAns: Math.round(Math.random() * 100) + 1
    })
  }
  else if(action.type === USER_GUESS){
    return Object.assign({}, state, {
      guesses: [...state.guesses, action.payload],

    })
  }
  else if(action.type === AURAL_STATUS){
    
    return Object.assign({}, state, {
      auralStatus: action.payload
    })
  }
  else if(action.type === FEEDBACK){
    
    console.log(action)
    console.log(state)
    return Object.assign({}, state, {
      feedback: action.payload
    })
  }
  
  return state;
}
