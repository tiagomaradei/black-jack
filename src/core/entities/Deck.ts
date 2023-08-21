import Card from './Card';

export default class Deck {
  public suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  public ranks = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'Jack',
    'Queen',
    'King',
    'Ace',
  ];

  public cards: Card[];

  constructor() {
    this.cards = this.generateDeck();
    this.shuffle();
  }

  public generateDeck(): Card[] {
    const cards: Card[] = [];

    for (let i = 0; i < 6; i++) {
      for (const suit of this.suits) {
        for (const rank of this.ranks) {
          cards.push(new Card(suit, rank));
        }
      }
    }

    return cards;
  }

  private shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  public drawCard(): Card {
    return this.cards.pop() as Card;
  }
}
