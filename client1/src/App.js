import React, { Component } from "react";
import "./App.css";
import _ from "lodash";
import GameStatus from "./game-status.js";
import PlayerDeck from "./playerDeck.js";
import ComputerDeck from "./computerDeck.js";
import Card from "./card.js";
import Menu from "./menu.js";
import Axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerStatus: {
        userName: "John Smith",
        wins: 0,
        loses: 0
      },
      computerDeck: [],
      pool: [
        "B0H",
        "W0H",
        "B1H",
        "W1H",
        "B2H",
        "W2H",
        "B3H",
        "W3H",
        "B4H",
        "W4H",
        "B5H",
        "W5H",
        "B6H",
        "W6H",
        "B7H",
        "W7H",
        "B8H",
        "W8H",
        "B9H",
        "W9H",
        "B10H",
        "W10H",
        "B11H",
        "W11H",
        "BJH",
        "WJH"
      ],
      playerDeck: [],
      didComputerGuess: false,
      wasComputerCorrect: false,
      didComputerDraw: false,
      cardComputerDrawn: "",
      isPlayerTurn: false,
      didPlayerMakeGuess: false,
      wasPlayerCorrect: false,
      cardPlayerDrawn: "",
      numberPlayerGuessed: "",
      cardPlayerSelected: "",
      didPlayerGuessNum: false,
      didPlayerSelect: false,
      didPlayerDraw: false,
      finished: false,
      reGuess: false,
      winner: "",
      turn: 0
    };
  }
  componentDidMount = () => {
    // after initial rendering
    // makes a Axios get request
    // to populate the menu bar with playerStatus
    // this.getPlayerStatus();
  };

  setUp = () => {
    // deal three cards to each player
    let pool = this.state.pool.slice();
    let computerDeck = this.state.computerDeck.slice();
    let playerDeck = this.state.playerDeck.slice();
    for (let i = 0; i < 3; i++) {
      let drawnCardForComputer = _.sample(pool);
      pool = pool.filter(cardName => cardName !== drawnCardForComputer);
      computerDeck.push(drawnCardForComputer);
      let drawnCardForPlayer = _.sample(pool);
      pool = pool.filter(cardName => cardName !== drawnCardForPlayer);
      playerDeck.push(drawnCardForPlayer);
    }

    this.setState({
      pool: pool,
      computerDeck: computerDeck,
      playerDeck: playerDeck,
      turn: this.state.turn + 1
    });
  };

  computerTurn = () => {
    let pool = this.state.pool.slice();
    let computerDeck = this.state.computerDeck.slice();
    let drawnCard = "";
    if (pool.length) {
      drawnCard = _.sample(pool);
      pool = pool.filter(cardName => cardName !== drawnCard);
      computerDeck.push(drawnCard);
      this.setState({
        isPlayerTurn: false,
        pool: pool,
        computerDeck: computerDeck,
        cardComputerDrawn: drawnCard,
        cardPlayerDrawn: "",
        didComputerDraw: true,
        turn: this.state.turn + 1
      });
    } else {
      this.setState({
        isPlayerTurn: false,
        cardComputerDrawn: drawnCard,
        cardPlayerDrawn: "",
        turn: this.state.turn + 1,
        reGuess: false
        // didComputerDraw:true
      });
    }
  };

  computerMakeGuess = () => {
    // TODO: computer advanced algo should go here
    let pool = this.state.pool.slice();
    let computerDeck = this.state.computerDeck.slice();
    let playerDeck = this.state.playerDeck.slice();
    let drawnCard = this.state.cardComputerDrawn;
    let wasComputerCorrect;

    // computer picks a card from playerdeck
    //  and makes a guess
    let computerChosenCard = _.sample(
      playerDeck.filter(cardName => cardName.substr(-1) === "H")
    );
    let computerGuessedCard = _.sample(
      pool.concat(playerDeck.filter(cardName => cardName.substr(-1) === "H"))
    );

    if (computerChosenCard === computerGuessedCard) {
      // if computer guessed correctly
      playerDeck = playerDeck.filter(
        cardName => cardName !== computerChosenCard
      );
      let revealedPlayerCard = computerGuessedCard.slice(0, -1) + "R";
      playerDeck.push(revealedPlayerCard);

      if (
        playerDeck.length !== 0 &&
        playerDeck.filter(cardName => cardName.substr(-1) === "H").length === 0
      ) {
        let playerStatus = Object.assign({}, this.state.playerStatus);
        playerStatus.loses = playerStatus.loses + 1;
        this.setState({
          winner: "Computer",
          finished: true,
          pool: pool,
          computerDeck: computerDeck,
          playerDeck: playerDeck,
          playerStatus: playerStatus
        });
        return;
      }
      wasComputerCorrect = true;
    } else {
      // if computer guessed incorrectly
      // reveals the drawnCard
      if (this.state.didComputerDraw) {
        computerDeck = computerDeck.filter(cardName => cardName !== drawnCard);
        drawnCard = drawnCard.slice(0, -1) + "R";
        computerDeck.push(drawnCard);
      }
      wasComputerCorrect = false;
    }

    this.setState({
      pool: pool,
      computerDeck: computerDeck,
      playerDeck: playerDeck,
      didComputerGuess: true,
      // turn: this.state.turn + 1,
      wasComputerCorrect: wasComputerCorrect
    });
  };

  startPlayerTurn = () => {
    this.setState({
      isPlayerTurn: true,
      didPlayerDraw: false,
      didPlayerMakeGuess: false,
      didPlayerSelect: false,
      didComputerGuess: false,
      didComputerDraw: false,
      turn: this.state.turn + 1,
      numberPlayerGuessed: "",
      cardPlayerSelected: ""
    });
  };

  // selectCard={(cardName)=>this.selectCard(cardName)}
  dealBlack = () => {
    let pool = this.state.pool.slice();
    let playerDeck = this.state.playerDeck.slice();
    if (pool.length) {
      let blackCard = _.sample(
        pool.filter(cardName => cardName.substr(0, 1) === "B")
      );
      pool = pool.filter(cardName => cardName !== blackCard);
      playerDeck.push(blackCard);
      this.setState({
        pool: pool,
        playerDeck: playerDeck,
        cardPlayerDrawn: blackCard,
        didPlayerDraw: true
      });
    } else {
      this.setState({
        cardPlayerDrawn: "",
        didPlayerDraw: true
      });
    }
  };

  dealWhite = () => {
    let pool = this.state.pool.slice();
    let playerDeck = this.state.playerDeck.slice();
    if (pool.length) {
      let whiteCard = _.sample(
        pool.filter(cardName => cardName.substr(0, 1) === "W")
      );
      pool = pool.filter(cardName => cardName !== whiteCard);
      playerDeck.push(whiteCard);
      this.setState({
        pool: pool,
        playerDeck: playerDeck,
        cardPlayerDrawn: whiteCard,
        didPlayerDraw: true
      });
    } else {
      this.setState({
        cardPlayerDrawn: "",
        didPlayerDraw: true
      });
    }
  };

  selectCard = cardName => {
    console.log("hahah", cardName);
    this.setState({
      cardPlayerSelected: cardName,
      didPlayerSelect: true
    });
  };

  getGuessedNum = event => {
    this.setState({
      numberPlayerGuessed: event.target.value,
      didPlayerGuessNum: true
    });
  };

  reGuess = () => {
    this.setState({
      didPlayerGuessNum: false,
      didPlayerSelect: false,
      didPlayerMakeGuess: false,
      didPlayerDraw: true,
      reGuess: true,
      numberPlayerGuessed: "",
      cardPlayerSelected: false
    });
  };

  makeGuess = () => {
    let playerDeck = this.state.playerDeck.slice();
    let computerDeck = this.state.computerDeck.slice();

    let cardBeingGuessed = this.state.cardPlayerSelected;
    cardBeingGuessed = new Card(cardBeingGuessed);
    let guess = this.state.numberPlayerGuessed;
    let lastDealt = this.state.cardPlayerDrawn;

    if (cardBeingGuessed.getNumber() === guess) {
      // when player guessed correctly
      // not reveal the lastdealt
      // append it to computerDeck
      computerDeck = computerDeck.filter(
        cardName => cardName !== cardBeingGuessed.getCardName()
      );
      cardBeingGuessed.flipCard();
      computerDeck.push(cardBeingGuessed.getCardName());

      if (
        computerDeck.length !== 0 &&
        computerDeck.filter(cardName => cardName.substr(-1) === "H").length ===
          0
      ) {
        let playerStatus = Object.assign({}, this.state.playerStatus);
        playerStatus.wins = playerStatus.wins + 1;
        this.setState({
          winner: "Player",
          finished: true,
          computerDeck: computerDeck,
          playerStatus: playerStatus
        });
        // this.updatePlayerStatus()
        return;
      } //if the game is finished

      this.setState({
        computerDeck: computerDeck,
        didPlayerMakeGuess: true,
        wasPlayerCorrect: true,
        reGuess: false,
        numberPlayerGuessed: ""
      });
    } else if (
      cardBeingGuessed.getNumber() === "J" &&
      (guess === "j" || guess === "joker" || guess === "Joker")
    ) {
      computerDeck = computerDeck.filter(
        cardName => cardName !== cardBeingGuessed.getCardName()
      );
      cardBeingGuessed.flipCard();
      computerDeck.push(cardBeingGuessed.getCardName());
      if (
        computerDeck.length !== 0 &&
        computerDeck.filter(cardName => cardName.substr(-1) === "H").length ===
          0
      ) {
        let playerStatus = Object.assign({}, this.state.playerStatus);
        playerStatus.wins = playerStatus.wins + 1;
        this.setState({
          winner: "Player",
          finished: true,
          computerDeck: computerDeck,
          playerStatus: playerStatus
        });
        // this.updatePlayerStatus()
        return;
      } //if the game is finished

      this.setState({
        computerDeck: computerDeck,
        didPlayerMakeGuess: true,
        wasPlayerCorrect: true,
        reGuess: false,
        numberPlayerGuessed: ""
      });
    } else {
      // when player guessed incorrectly
      // reveal the last dealt card
      if (lastDealt !== "") {
        playerDeck = playerDeck.filter(cardName => cardName !== lastDealt);
        lastDealt = new Card(lastDealt);
        lastDealt.flipCard();
        playerDeck.push(lastDealt.getCardName());
        this.setState({
          playerDeck: playerDeck,
          wasPlayerCorrect: false,
          didPlayerMakeGuess: true,
          reGuess: false
        });
      } else {
        this.setState({
          wasPlayerCorrect: false,
          didPlayerMakeGuess: true,
          reGuess: false
        });
      }

      // this.computerTurn();
    }
  };

  resetGame = () => {
    this.setState({
      computerDeck: [],
      pool: [
        "B0H",
        "W0H",
        "B1H",
        "W1H",
        "B2H",
        "W2H",
        "B3H",
        "W3H",
        "B4H",
        "W4H",
        "B5H",
        "W5H",
        "B6H",
        "W6H",
        "B7H",
        "W7H",
        "B8H",
        "W8H",
        "B9H",
        "W9H",
        "B10H",
        "W10H",
        "B11H",
        "W11H",
        "BJH",
        "WJH"
      ],
      playerDeck: [],
      didComputerGuess: false,
      wasComputerCorrect: false,
      didComputerDraw: false,
      cardComputerDrawn: "",
      isPlayerTurn: false,
      didPlayerMakeGuess: false,
      wasPlayerCorrect: false,
      cardPlayerDrawn: "",
      numberPlayerGuessed: "",
      cardPlayerSelected: "",
      didPlayerGuessNum: false,
      didPlayerSelect: false,
      didPlayerDraw: false,
      finished: false,
      reGuess: false,
      winner: "",
      turn: 0
    });
  };

  /* get User Status */
  getPlayerStatus = () => {
    // make a axios GET request
    //  to get userStatus Json from the server
    Axios.get(`https://localhost:3000/playerStatus`).then(res => {
      console.log(res);
      this.setState({ playerStatus: res.data });
    });
  };

  updatePlayerStatus = () => {
    // when game ended
    /* update UserStatus to the server */
    // make a axios POST request
    // with updated userStatus
    // json of {userID, userName, wins, loses}
    let playerStatus = this.state.playerStatus;
    Axios.post(`https://localhost:3000/playerStatus`, { playerStatus }).then(
      res => {
        console.log(res);
        // if success
          console.log("POST success")
      }
    );
    console.log("updating user status...");
  };

  /* save game */
  _save = () => {
    /* TODO:Save user's current game status */
    /* update all the states of the game */
    console.log("save game");
  };

  render = () => {
    return (
      <div className="App">
        <Menu playerStatus={this.state.playerStatus} />

        <ComputerDeck
          isPlayerTurn={this.state.isPlayerTurn}
          selectCard={cardName => this.selectCard(cardName)}
          selected={this.state.cardPlayerSelected}
          className="computerDeck"
          deck={this.state.computerDeck}
          selectedCardName={this.state.cardPlayerSelected}
        />

        <GameStatus
          states={this.state}
          gameBegin={() => this.setUp()}
          reset={() => this.resetGame()}
          dealBlack={() => this.dealBlack()}
          dealWhite={() => this.dealWhite()}
          guessNum={event => this.getGuessedNum(event)}
          makeGuess={() => this.makeGuess()}
          computerTurn={() => this.computerTurn()}
          computerMakeGuess={() => this.computerMakeGuess()}
          playerTurn={() => this.startPlayerTurn()}
          startComputerTurn={() => this.startComputerTurn()}
          reGuess={() => this.reGuess()}
        />

        <PlayerDeck
          className="playerDeck"
          lastDrawnCard={this.state.cardPlayerDrawn}
          deck={this.state.playerDeck}
        />
      </div>
    );
  };
}

export default App;
