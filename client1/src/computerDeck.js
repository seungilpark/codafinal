import React, { Component } from "react";
import "./App.css";
import Card from "./card.js";
import _ from "lodash";

class ComputerDeck extends Component {
  renderCard = (card, selectedCardName) => {
    return (
      <div
        key={card.getCardName()}
        onClick={
          this.props.isPlayerTurn && !card.isVisible()
            ? () => this.props.selectCard(card.getCardName())
            : ""
        }
        className={
          card.getCardName() === selectedCardName
            ? card.getColor() === "B"
              ? "selectedBlackComputerCard"
              : "selectedWhiteComputerCard"
            : card.getColor() === "B"
            ? card.isVisible()
              ? "visibleBlackComputerCard"
              : "blackComputerCard"
            : card.isVisible()
            ? "visibleWhiteComputerCard"
            : "whiteComputerCard"
        }
      >
        {card.isVisible() ? card.getNumber() : ""}
      </div>
    );
  };

  render() {
    let deck = this.props.deck.map(cardName => new Card(cardName));
    if (this.props.deck.length !== 0) {
      deck = _.sortBy(deck, [card => card.getValue()]);
    }
    return (
      <div className="computerDeckContainer">
        {deck.map(card => this.renderCard(card, this.props.selectedCardName))}
      </div>
    );
  }
}

export default ComputerDeck;
