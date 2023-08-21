import Card from './Card';

export default class Hand {
  public cards: Card[];

  constructor() {
    this.cards = [];
  }

  public addCard(card: Card) {
    this.cards.push(card);
  }

  public getValue() {
    let value = 0;
    let numAces = 0;

    for (const card of this.cards) {
      if (card.rank === 'Ace') {
        numAces++;
        value += 11;
      } else if (['Jack', 'Queen', 'King'].includes(card.rank)) {
        value += 10;
      } else {
        value += parseInt(card.rank);
      }
    }

    while (numAces > 0 && value > 21) {
      value -= 10;
      numAces--;
    }

    return value;
  }
}
