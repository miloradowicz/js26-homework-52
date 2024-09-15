import React from 'react';
import './card.css';
import { ranks, ranksType, suits, suitsType } from '../shared/cards';

interface Props {
  rank: ranksType;
  suit: suitsType;
}

const Card: React.FC<Props> = ({ rank, suit }) => {
  return (
    <div className={`card rank-${rank} ${suit}`}>
      <span className='rank'>{ranks[rank].symbol}</span>
      <span className='suit'>{suits[suit].symbol}</span>
    </div>
  );
};

export default Card;
