import Deck from './Deck';
import Hand from './Hand';

type Winner = {
  result: 'win' | 'draw';
  who?: 'dealer' | 'player';
  winner?: Hand;
  draw?: Hand;
  playerValue?: number;
  dealerValue?: number;
};

export default class BlackJackGame {
  public deck: Deck;
  public playerHand: Hand;
  public dealerHand: Hand;

  constructor() {
    this.deck = new Deck();
    this.playerHand = new Hand();
    this.dealerHand = new Hand();
  }

  public dealInitialCards(): void {
    this.playerHand.addCard(this.deck.drawCard());
    this.dealerHand.addCard(this.deck.drawCard());
    this.playerHand.addCard(this.deck.drawCard());
    this.dealerHand.addCard(this.deck.drawCard());
  }

  public playerHit(): void {
    this.playerHand.addCard(this.deck.drawCard());
  }

  public playDealer(): void {
    while (this.dealerHand.getValue() < 17) {
      this.dealerHand.addCard(this.deck.drawCard());
    }
  }

  public getWinner(): Winner {
    const playerValue = this.playerHand.getValue();
    const dealerValue = this.dealerHand.getValue();

    let result: Winner = {
      result: 'win',
      dealerValue,
      playerValue,
    };

    if (playerValue > 21) {
      result = {
        ...result,
        result: 'win',
        who: 'dealer',
        winner: this.dealerHand,
      };
    } else if (dealerValue > 21) {
      result = {
        ...result,
        result: 'win',
        who: 'player',
        winner: this.playerHand,
      };
    } else if (playerValue > dealerValue) {
      result = {
        ...result,
        result: 'win',
        who: 'player',
        winner: this.playerHand,
      };
    } else if (dealerValue > playerValue) {
      result = {
        ...result,
        result: 'win',
        who: 'dealer',
        winner: this.dealerHand,
      };
    } else {
      result = { ...result, result: 'draw', draw: this.playerHand };
    }

    return result;
  }
}
