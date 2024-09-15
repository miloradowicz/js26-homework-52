export const ranks = {
  '2': { order: 2, babyOrder: 2, symbol: '2', name: 'Two' },
  '3': { order: 3, babyOrder: 3, symbol: '3', name: 'Three' },
  '4': { order: 4, babyOrder: 4, symbol: '4', name: 'Four' },
  '5': { order: 5, babyOrder: 5, symbol: '5', name: 'Five' },
  '6': { order: 6, babyOrder: 6, symbol: '6', name: 'Six' },
  '7': { order: 7, babyOrder: 7, symbol: '7', name: 'Seven' },
  '8': { order: 8, babyOrder: 8, symbol: '8', name: 'Eight' },
  '9': { order: 9, babyOrder: 9, symbol: '9', name: 'Nine' },
  '10': { order: 10, babyOrder: 10, symbol: '10', name: 'Ten' },
  j: { order: 11, babyOrder: 11, symbol: 'J', name: 'Jack' },
  q: { order: 12, babyOrder: 12, symbol: 'Q', name: 'Queen' },
  k: { order: 13, babyOrder: 13, symbol: 'K', name: 'King' },
  a: { order: 14, babyOrder: 1, symbol: 'A', name: 'Ace' },
};

export type ranksType = keyof typeof ranks;

export const suits = {
  diams: { symbol: '♦', name: 'Diamonds' },
  hearts: { symbol: '♥', name: 'Hearts' },
  spades: { symbol: '♣', name: 'Spades' },
  clubs: { symbol: '♠', name: 'Clubs' },
};

export type suitsType = keyof typeof suits;
