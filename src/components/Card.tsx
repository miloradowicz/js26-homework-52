import React, { FormEventHandler } from 'react';
import './card.css';
import { ranks, ranksType, suits, suitsType } from '../shared/cards';

interface Props {
  rank: ranksType;
  suit: suitsType;
  checked: boolean;
  onChange: FormEventHandler;
}

const Card: React.FC<Props> = ({ rank, suit, checked, onChange }) => {
  return (
    <label htmlFor={`${rank}-${suit}`} className={`card rank-${rank} ${suit}`}>
      <span className='rank'>{ranks[rank].symbol}</span>
      <span className='suit'>{suits[suit].symbol}</span>
      <input type='checkbox' id={`${rank}-${suit}`} checked={checked} onChange={onChange} />
    </label>
  );
};

export default Card;
