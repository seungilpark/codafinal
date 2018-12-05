// react component card

import React, { Component } from "react";
import "./App.css";
import Card from "./card.js";
// import _ from "lodash";


class Pool extends Component {
    constructor(props){
        super(props);
        this.state = {
            pool:props.deck.map(cardName => new Card(cardName))
        }
    }
    renderCard = card => {
    return (
      <div Key={card.getCardName()} className={card.getColor()==='B'? "blackPoolCard":"whitePoolCard"}></div>
    );
  };

  render() {
    return <div className="poolContainer">{this.state.pool.map( card => this.renderCard(card))}</div>;
  }
}


export default Pool;