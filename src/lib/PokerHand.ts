import Card from './Card';
import { ranks } from '../shared/cards';

enum OrderType {
  Broadway,
  Baby,
}

export enum Hand {
  RoyalFlush = 'Royal flush',
  StraightFlush = 'Straight flush',
  FourOfAKind = 'Four of a kind',
  FullHouse = 'Full house',
  Flush = 'Flush',
  Straight = 'Straight',
  ThreeOfAKind = 'Three of a kind',
  TwoPairs = 'Two pairs',
  OnePair = 'One pair',
  Air = 'Air',
}

class PokerHand {
  private static getCardRankOrdinal(card: Card, order: OrderType = OrderType.Broadway) {
    if (order === OrderType.Broadway) {
      return ranks[card.rank].order;
    } else {
      return ranks[card.rank].babyOrder;
    }
  }

  private static getCardRankOrdinalAsCharacter(card: Card, order: OrderType = OrderType.Broadway) {
    return String.fromCharCode(97 + this.getCardRankOrdinal(card, order));
  }

  private static sortHand(hand: Card[], order: OrderType = OrderType.Broadway) {
    return hand.sort((a, b) => this.getCardRankOrdinal(a, order) - this.getCardRankOrdinal(b, order));
  }

  private static isRanksInOrder(hand: Card[], order: OrderType) {
    hand = this.sortHand(hand, order);

    let dissatisfied = false;
    let i = 0;
    while (!dissatisfied && i < hand.length - 1) {
      if (this.getCardRankOrdinal(hand[i + 1], order) !== this.getCardRankOrdinal(hand[i], order) + 1) {
        dissatisfied = true;
      }

      i++;
    }

    return !dissatisfied;
  }

  private static isStraightWithAceAsHighest(hand: Card[]) {
    return this.isRanksInOrder(hand, OrderType.Broadway);
  }

  private static isStraightWithAceAsLowest(hand: Card[]) {
    return this.isRanksInOrder(hand, OrderType.Baby);
  }

  private static evaluateRepeatingRanks(hand: Card[]) {
    hand = this.sortHand(hand);

    const handAsStringOfCharacters = hand.map((x) => this.getCardRankOrdinalAsCharacter(x)).join('');

    const matches = handAsStringOfCharacters.match(/([a-z])(\1)+/g);

    let result = Hand.Air;

    if (matches?.length === 1) {
      switch (matches[0].length) {
        case 2:
          result = Hand.OnePair;
          break;

        case 3:
          result = Hand.ThreeOfAKind;
          break;

        case 4:
          result = Hand.FourOfAKind;
          break;
      }
    } else if (matches?.length === 2) {
      if (matches[0].length === 2 && matches[1].length === 2) {
        result = Hand.TwoPairs;
      } else {
        result = Hand.FullHouse;
      }
    }

    return result;
  }

  static getHighestRankingCard(hand: Card[]) {
    hand = this.sortHand(hand, OrderType.Broadway);

    return hand.slice(-1)[0];
  }

  private static isOnePair(hand: Card[]) {
    return this.evaluateRepeatingRanks(hand) === Hand.OnePair;
  }

  private static isTwoPairs(hand: Card[]) {
    return this.evaluateRepeatingRanks(hand) === Hand.TwoPairs;
  }

  private static isThreeOfAKind(hand: Card[]) {
    return this.evaluateRepeatingRanks(hand) === Hand.ThreeOfAKind;
  }

  private static isStraight(hand: Card[]) {
    return this.isStraightWithAceAsHighest(hand) || this.isStraightWithAceAsLowest(hand);
  }

  private static isFlush(hand: Card[]) {
    let dissatisfied = false;
    let i = 0;
    while (!dissatisfied && i < hand.length - 1) {
      if (hand[i].suit !== hand[i + 1].suit) {
        dissatisfied = true;
      }

      i++;
    }

    return !dissatisfied;
  }

  private static isFullHouse(hand: Card[]) {
    return this.evaluateRepeatingRanks(hand) === Hand.FullHouse;
  }

  private static isFourOfAKind(hand: Card[]) {
    return this.evaluateRepeatingRanks(hand) === Hand.FourOfAKind;
  }

  private static isStraigthFlush(hand: Card[]) {
    return this.isFlush(hand) && this.isStraight(hand);
  }

  private static isRoyalFlush(hand: Card[]) {
    return (
      this.isFlush(hand) &&
      this.isStraightWithAceAsHighest(hand) &&
      ranks[this.getHighestRankingCard(hand).rank].order === Math.max(...Object.values(ranks).map((x) => x.order))
    );
  }

  static getOutcome(hand: Card[]) {
    if (this.isRoyalFlush(hand)) {
      return Hand.RoyalFlush;
    } else if (this.isStraigthFlush(hand)) {
      return Hand.StraightFlush;
    } else if (this.isFourOfAKind(hand)) {
      return Hand.FourOfAKind;
    } else if (this.isFullHouse(hand)) {
      return Hand.FullHouse;
    } else if (this.isFlush(hand)) {
      return Hand.Flush;
    } else if (this.isStraight(hand)) {
      return Hand.Straight;
    } else if (this.isThreeOfAKind(hand)) {
      return Hand.ThreeOfAKind;
    } else if (this.isTwoPairs(hand)) {
      return Hand.TwoPairs;
    } else if (this.isOnePair(hand)) {
      return Hand.OnePair;
    } else {
      return Hand.Air;
    }
  }
}

export default PokerHand;
