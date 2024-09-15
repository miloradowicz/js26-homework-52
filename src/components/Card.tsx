import React from 'react';
import './card.css';
import { ranks, suits } from '../shared/cards';

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
