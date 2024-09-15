import { ranks, suits } from '../shared/cards';

class Card {
  public readonly rank: string;
  public readonly suit: string;

  constructor(rank: string, suit: string) {
    rank = rank.toLowerCase();
    suit = suit.toLowerCase();

    if (!ranks.includes(rank)) {
      throw new Error('Invalid rank.');
    }

    if (!Object.keys(suits).includes(suit)) {
      throw new Error('Invalid suit.');
    }

    [this.rank, this.suit] = [rank, suit];
  }
}

export default Card;
