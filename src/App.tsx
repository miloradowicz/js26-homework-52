import { Component } from 'react';
import CardComp from './components/Card';
import './App.css';
import Card from './lib/Card';
import CardDeck from './lib/CardDeck';

interface AppState {
  hand: Card[];
}

class App extends Component<null, AppState> {
  private deck: CardDeck | undefined;
  state: AppState = { hand: [] };

  dealHand() {
    try {
      this.deck = new CardDeck();

      this.setState({ hand: this.deck.getCards(5) });
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
            <ul className='hand'>
              {this.state.hand.length > 0
                ? this.state.hand.map((x, i) => (
                    <li>
                      <CardComp key={i} rank={x.rank} suit={x.suit} />
                    </li>
                  ))
                : ''}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default App;
