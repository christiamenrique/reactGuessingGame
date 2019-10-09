import React from 'react';
import './App.css';

class Game extends React.Component {
  constructor() {
    super();
    this.numberImput = this.onNumberImput.bind(this);
    this.onSubmitNumber = this.onSubmitNumber.bind(this);
    this.state = {
      gameMode: 'Start',
      targetGuess: null,
      userGuess: null,
      userTotalGuesses: [],
      userMessage: null,
      standardHighScore: 0,
      expertHighScore: 0,
      gameStage: 0,
    }
  }

setGameMode(mode) {
  let target = null;
  if (mode === 'Standard') {
    target = Math.floor(Math.random() * 10) +1;
  } else if (mode === 'Expert') {
    target = Math.floor(Math.random() * 100) +1;
  }

  this.setState({
    gameMode: mode,
    targetGuess: target,
    userGuess: "",
    gameStage: 1,
   
  });
};

// changing state the userGuess
onNumberImput(event) {
  this.setState({
    userGuess: event.target.value
  })
};

resetGame() {
  this.setState({
    gameMode: 'Start',
    targetGuess: null,
    userGuess: null,
    userTotalGuesses: [],
    userMessage: null,
    gameStage: 0,
  })
}

onSubmitNumber() {
  const userInput = parseInt(this.state.userGuess);
  const target = this.state.targetGuess;
  let guessArray = this.state.userTotalGuesses;
  let newGameStage = this.state.gameStage;
  
  // Adding userGuess to array
  guessArray.push(userInput);

  // Number evaluation logic
  if (userInput === target) {
    let currentStandardHighScore = this.state.standardHighScore === null ? 0 : this.state.standardHighScore;
    let currentExpertHighScore = this.state.expertHighScore;
    newGameStage = 2;

    // Check if they got a high score
    if (this.state.gameMode === 'Standard') {
      if (guessArray.length > currentStandardHighScore) {
        currentStandardHighScore = guessArray.length; 
      }
    } else if (this.state.gameMode === 'Expert') {
      if (guessArray.length > currentExpertHighScore) {
        currentExpertHighScore = guessArray.length;
      }
    }

    this.setState ({
      userMessage: `You won in ${this.state.userTotalGuesses.length} guesses`,
      userTotalGuesses: guessArray,
      standardHighScore: currentStandardHighScore,
      expertHighScore: currentExpertHighScore,
      gameStage: newGameStage
    })
  }else if (userInput < target) {
    this.setState ({
      userMessage: 'Too Low'
    })
  }else if (userInput > target) {
    this.setState ({
      userMessage: 'Too high'
    })
  }
  
  // makes copy of userTotalGuesses in state
  let newTotalGuessArray = [...this.state.userTotalGuesses];
  newTotalGuessArray = guessArray;
  this.setState({
    userTotalGuesses: newTotalGuessArray
  });
};

  render() {
    console.log(this.state.standardHighScore)
    if (this.state.gameStage === 0) {
      return(
        <React.Fragment>
          <header>
            <h1>Start Game</h1>
          </header>
          <div className="page-spacing">
          <h2>Guess a number. Standard from 1 to 10 and Expert from 1 to 100.</h2>
          <div className="score-handle">
            <p>High score for Standard: {this.state.standardHighScore + ' tries '}</p>
            <p>High score for Expert: {this.state.expertHighScore + ' tries '}</p>
          </div>
            <button onClick={() => this.setGameMode('Standard')}>Standard</button>
            <button onClick={() => this.setGameMode('Expert')}>Expert</button>
           

          </div>
        </React.Fragment>
      )
    } else if (this.state.gameStage === 1) {
      return (
        <React.Fragment>
          <header>
            <h1>{this.state.gameMode}</h1>
          </header>
          <p>{this.state.userMessage}</p>
          <h3>Total Guesses: {this.state.userTotalGuesses.length}</h3>
          <input value={this.state.userGuess} type="number" onChange={(event) => this.onNumberImput(event)}/>
          <button onClick = {() => this.onSubmitNumber()}>Submit</button>
          <p>{this.state.guessArray}</p>
        </React.Fragment>
      );
    } else if (this.state.gameStage === 2) {
      return (
        <React.Fragment>
          <header>
            <h1>Congrats! You Won!</h1>
          </header>
          <p>
            Your score was: { this.state.gameMode === 'Standard' ? this.state.standardHighScore : this.state.expertHighScore }
          </p>
          <button onClick={() => this.resetGame()}>Reset</button>
        </React.Fragment>
      ); 
    }
  }
}


export default Game;