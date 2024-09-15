import { Component } from 'react';
import CardComp from './components/Card';
import './App.css';
import Card from './lib/Card';
import CardDeck from './lib/CardDeck';
import PokerHand, { Hand } from './lib/PokerHand';
import { ranks } from './shared/cards';

interface AppState {
  hand: Card[];
  judgement?: Hand;
  highestCard?: Card;
}

class App extends Component<null, AppState> {
  private deck: CardDeck | undefined;
  state: AppState = { hand: [] };

  dealHand() {
    try {
      this.deck = new CardDeck();
      const hand = this.deck.getCards(5);

      this.setState({
        hand: hand,
        judgement: PokerHand.judgeHand(hand),
        highestCard: PokerHand.getHighestRankingCard(hand),
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  }

  render() {
    return (
      <>
        <h1>Super duper poker!</h1>
        <div className='card'>
          <button onClick={() => this.dealHand()}>Раздать карты</button>
          <div className='playingCards faceImages'>
            <ul className='table'>
              {this.state.hand.length > 0
                ? this.state.hand.map((x, i) => (
                    <li>
                      <CardComp key={i} rank={x.rank} suit={x.suit} />
                    </li>
                  ))
                : ''}
            </ul>
          </div>
          <span className='judgement'>
            {this.state.hand.length > 0
              ? this.state.judgement === Hand.Air && this.state.highestCard !== undefined
                ? 'Highest rank: ' + ranks[this.state.highestCard.rank].name
                : this.state.judgement?.toString()
              : ''}
          </span>
        </div>
      </>
    );
  }
}

export default App;
