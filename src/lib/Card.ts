import { ranks, ranksType, suits, suitsType } from '../shared/cards';

class Card {
  public readonly rank: ranksType;
  public readonly suit: suitsType;

  constructor(rank: ranksType, suit: suitsType) {
    if (!Object.keys(ranks).includes(rank)) {
      throw new Error('Invalid rank.');
    }

    if (!Object.keys(suits).includes(suit)) {
      throw new Error('Invalid suit.');
    }

    [this.rank, this.suit] = [rank, suit];
  }
}

export default Card;
