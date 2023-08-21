import * as readline from 'readline';
import BlackJackGame from '../entities/BlackJackGame';

export default class RunGame {
  protected rl: readline.Interface;
  protected isRoundFinished: boolean = false;

  constructor(
    public delay: number,
    public playerName: string
  ) {
    this.delay = delay;
    this.playerName = playerName;

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  public async execute() {
    while (true) {
      await this.delayTime();

      const game = new BlackJackGame();
      game.dealInitialCards();

      console.log(
        `${this.playerName}'s Hand: ${game.playerHand.cards
          .map((card) => `${card.rank} (${card.suit})`)
          .join(', ')}`
      );
      console.log(
        `Dealer's Hand: ${game.dealerHand.cards[0].rank} (${game.dealerHand.cards[0].suit}), ?`
      );

      while (!this.isRoundFinished) {
        const action = await this.getInput('Hit or Stay? ');

        if (action.toLowerCase() === 'hit') {
          this.hit(game);
        } else if (action.toLowerCase() === 'stay') {
          this.stay(game);
        }
      }

      if (this.isRoundFinished) {
        console.log('Round result:', game.getWinner());
        const newGame = await this.getInput('Play again? (y/n) ');

        if (newGame.toLowerCase() === 'y') {
          this.isRoundFinished = false;
          this.clearTerminal();
        } else {
          this.isRoundFinished = false;
          this.rl.close();
          break;
        }
      }
    }
  }

  private hit(game: BlackJackGame): void {
    game.playerHit();

    console.log(
      `${this.playerName}'s Hand after hit: ${game.playerHand.cards
        .map((card) => `${card.rank} (${card.suit})`)
        .join(', ')}`
    );

    if (game.playerHand.getValue() > 21) {
      this.isRoundFinished = true;
      console.log(`${this.playerName} busts! Dealer wins.`);
    } else {
      this.isRoundFinished = false;
    }
  }

  private stay(game: BlackJackGame): void {
    game.playDealer();
    const winner = game.getWinner();

    console.log(
      `Dealer's Hand: ${game.dealerHand.cards
        .map((card) => `${card.rank} (${card.suit})`)
        .join(', ')}`
    );

    if (winner.result === 'win') {
      const winnerHandValue =
        winner.who === 'dealer'
          ? game.dealerHand.getValue()
          : game.playerHand.getValue();

      console.log(
        `${winner.who?.toUpperCase()} WINS WITH A HAND VALUE OF ${winnerHandValue}!`
      );
    } else {
      console.log("IT'S A DRAW!");
    }

    this.isRoundFinished = true;
  }

  private async delayTime(): Promise<void> {
    console.log(`Round starting in ${this.delay} seconds...`);
    await new Promise((resolve) => setTimeout(resolve, this.delay * 1000));
  }

  private async getInput(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(prompt, (answer) => {
        resolve(answer);
      });
    });
  }

  private clearTerminal(): void {
    process.stdout.write('\x1B[2J\x1B[0f');
  }
}
