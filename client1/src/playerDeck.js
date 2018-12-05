import React, { Component } from "react";
import "./App.css";
import Card from "./card.js";
import _ from "lodash";

class PlayerDeck extends Component {

  renderCard = card => {

    let cardClassName;
    if (card.getCardName()===this.props.lastDrawnCard){
      // card is last drawn card 
      if (card.getColor() === "B") {
        cardClassName = "drawnBlackPlayerCard";
      } else {
        cardClassName = "drawnWhitePlayerCard";
      }
    } else if (card.isVisible()) {
      // card is visible
      if (card.getColor() === "B") {
        cardClassName = "visibleBlackPlayerCard";
      } else {
        cardClassName = "visibleWhitePlayerCard";
      }
    } else {
      // card is hidden
      if (card.getColor() === "B") {
        cardClassName = "blackPlayerCard";
      } else {
        cardClassName = "whitePlayerCard";
      }
    }

    return (
      <div key={card.getCardName()} className={cardClassName}>
        {card.getNumber()}
      </div>
    );
  };

  render() {
    let deck = _.sortBy(this.props.deck.map(cardName => new Card(cardName)), [
      card => card.getValue()])
    return (
      <div className="playerDeckContainer">
        {deck.map(card => this.renderCard(card))}
      </div>
    );
  }
}

export default PlayerDeck;
