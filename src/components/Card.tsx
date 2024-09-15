import React from 'react';
import './card.css';

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];

const suits = {
  diams: '♦',
  hearts: '♥',
  spades: '♣',
  clubs: '♠',
};

interface Props {
  rank: string;
  suit: string;
}

const Card: React.FC<Props> = ({ rank, suit }) => {
  rank = rank.toLowerCase();
  suit = suit.toLowerCase();

  if (!ranks.includes(rank)) {
    throw new Error('Invalid rank.');
  }

  if (!Object.keys(suits).includes(suit)) {
    throw new Error('Invalid suit.');
  }

  return (
    <span className={`card rank-${rank} ${suit}`}>
      <span className='rank'>{rank.toUpperCase()}</span>
      <span className='suit'>{suits[suit as keyof typeof suits]}</span>
    </span>
  );
};

export default Card;
