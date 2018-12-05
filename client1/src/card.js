/* Card Class Definition */

class Card {
  /* Card definition */
  constructor(cardName) {
    // cardName = 'W0R',which translates to White, 0, Revealed 'B1H', Black 1 Hidden
    this._validateInput(cardName);
    let props = this._getPropsArray(cardName); //props list based on the cardName
    const VALUES = {
      B0: 0,
      W0: 1,
      B1: 2,
      W1: 3,
      B2: 4,
      W2: 5,
      B3: 6,
      W3: 7,
      B4: 8,
      W4: 9,
      B5: 10,
      W5: 11,
      B6: 12,
      W6: 13,
      B7: 14,
      W7: 15,
      B8: 16,
      W8: 17,
      B9: 18,
      W9: 19,
      B10: 20,
      W10: 21,
      B11: 22,
      W11: 23,
      BJ: 88,
      WJ: 89
    };
    this._absoluteValue = VALUES[cardName.slice(0, cardName.length - 1)];
    this._cardName = cardName;
    this._color = props[0]; //color W or B
    this._number = props[1]; // number
    this._visible = props[2]; //True or False
  }
  getCardName() {
    /* getter for cardname */
    return this._cardName;
  }

  getNumber() {
    return this._number;
  }
  getColor() {
    return this._color;
  }

  isVisible(){
    return this._visible;
  }

  getValue(){
    return this._absoluteValue;
  }

  flipCard() {
    /* whenever card is flipped the visibility changes */
    this._visible = this._visible ? false : true;
    let visibility = this._visible ? "R" : "H";
    this._cardName = this._cardName.slice(0, -1) + visibility;
  }
  
  getAbsoluteValue() {
    return this._absoluteValue;
  }

  _validateInput(input) {
    /* validate input */
    if (input === undefined) {
      throw new Error("Input must be defined");
    } else if (input === "") {
      throw new Error("Input cannot be empty");
    }
  }

  _getPropsArray(cardName) {
    /* reads a cardName strings and return list of property */
    const pattern = /\b[WB]([0-9]|1[01]|J)[RH]\b/g;
    const props_array = [];
    if (!pattern.test(cardName)) {
      throw new Error("ValueError: cardName must match the vaild pattern");
    } else {
      if (cardName.length === 3) {
        props_array.push(cardName.slice(0, 1)); //'W' or 'B'
        if (cardName.slice(1, 2) === "J") {
          props_array.push(cardName.slice(1, 2)); //'J' for Joker
        } else {
          // props_array.push(parseInt(cardName.slice(1, 2))); //Numbers type-conversion
          props_array.push((cardName.slice(1, 2))); //Numbers type-conversion
        }
        if (cardName.slice(2, 3) === "R") {
          props_array.push(true);
        } else {
          props_array.push(false);
        }
      } else if (cardName.length === 4) {
        /* when the number is more than two digits */
        props_array.push(cardName.slice(0, 1)); //'W' or 'B'
        // props_array.push(parseInt(cardName.slice(1, 3))); //Numbers
        props_array.push((cardName.slice(1, 3))); //Numbers
        if (cardName.slice(3, 4) === "R") {
          props_array.push(true);
        } else if (cardName.slice(3, 4) === "H") {
          props_array.push(false);
        } //'R' or 'H'
      }
    }
    return props_array;
  }} //get_props_array()

export default Card;
