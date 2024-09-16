import { ranks, ranksType, suits, suitsType } from '../shared/cards';
import Card from './Card';
import { randomInt } from './utils';

class CardDeck {
  private readonly deck: Card[] = [];

  public get CardsLeft() {
    return this.deck.length;
  }

  constructor() {
    for (const suit in suits) {
      for (const rank in ranks) {
        this.deck.push(new Card(rank as ranksType, suit as suitsType));
      }
    }
  }

  getCard() {
    if (this.deck.length < 1) {
      throw new Error('The deck is empty.');
    }

    return this.deck.splice(randomInt(this.deck.length - 1, 0), 1)[0];
  }

  getCards(howMany: number) {
    if (!Number.isInteger(howMany) || howMany <= 0 || howMany > this.deck.length) {
      throw new Error('Invalid number of cards.');
    }

    const hand: Card[] = [];

    for (let i = 0; i < howMany; i++) {
      hand.push(this.getCard());
    }

    return hand;
  }
}

export default CardDeck;
