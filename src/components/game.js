import React from 'react';
import {connect} from 'react-redux';
import {userGuess, feedback, auralStatus, correctAnswer} from '../actions';
import store from '../store';
import Header from './header';
import GuessSection from './guess-section';
import StatusSection from './status-section';
import InfoSection from './info-section';

export class Game extends React.Component {

  addGuess(guess){
      store.dispatch(userGuess(guess))
  }

  feedback(msg){
    store.dispatch(feedback(msg))
  }

  auralStatus(auralMsg){
    store.dispatch(auralStatus(auralMsg))
  }

  correctAnswer(){
    store.dispatch(correctAnswer())
  }

  restartGame() {
    this.correctAnswer()
   }

  makeGuess(guess) {
    guess = parseInt(guess, 10);
    if (isNaN(guess)) {
      this.feedback('Please enter a valid number')
      return;
    }else{
      this.addGuess(guess)
    }

    let myState = store.getState()
    const difference = Math.abs(guess - myState.correctAns);

    let feedback;
    if (difference >= 50) {
      this.feedback('You\'re Ice Cold...')
    } else if (difference >= 30) {
      this.feedback('You\'re Cold...')
    } else if (difference >= 10) {
      this.feedback('You\'re Warm.')
    } else if (difference >= 1) {
      this.feedback('You\'re Hot!')
    } else {
      this.feedback('You got it!')
     
    } 

    // We typically wouldn't touch the DOM directly like this in React
    // but this is the best way to update the title of the page,
    // which is good for giving screen-reader users
    // instant information about the app.
    document.title = feedback ? `${feedback} | Hot or Cold` : 'Hot or Cold';
  }

  generateAuralUpdate() {
    const { guesses, feedback } = store.getState()

    // If there's not exactly 1 guess, we want to
    // pluralize the nouns in this aural update.
    const pluralize = guesses.length !== 1;

    let  auralStatus = `Here's the status of the game right now: ${feedback} You've made ${guesses.length} ${pluralize ? 'guesses' : 'guess'}.`;

    if (guesses.length > 0) {
      auralStatus += ` ${pluralize ? 'In order of most- to least-recent, they are' : 'It was'}: ${guesses.reverse().join(', ')}`;
    }

    this.auralStatus(auralStatus)
  }

  render() {
    const { feedback, guesses, auralStatus } = store.getState()
    const guessCount = guesses.length;

    return (
      <div>
        <Header
          onRestartGame={() => this.restartGame()}
          onGenerateAuralUpdate={() => this.generateAuralUpdate()}
        />
        <main role="main">
          <GuessSection
            feedback={feedback}
            guessCount={guessCount}
            onMakeGuess={guess => this.makeGuess(guess)}
          />
          <StatusSection guesses={guesses} 
            auralStatus={auralStatus}
          />
          <InfoSection />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  guesses: state.guesses,
  auralStatus: state.auralStatus,
  feedback: state.feedback,
});

export default connect(mapStateToProps)(Game);
