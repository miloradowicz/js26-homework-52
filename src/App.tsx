import { Component } from 'react';
import CardComp from './components/Card';
import './App.css';
import Card from './lib/Card';
import CardDeck from './lib/CardDeck';
import PokerHand, { Hand } from './lib/PokerHand';
import { ranks } from './shared/cards';

interface CardState {
  card: Card;
  checked: boolean;
}

interface AppState {
  cards: CardState[];
  judgement?: Hand;
  highestCard?: Card;
}

class App extends Component<React.FC<{}>, AppState> {
  private deck: CardDeck | undefined;
  state: AppState = { cards: [] };

  dealHand() {
    try {
      this.deck = new CardDeck();
      const cards = this.deck.getCards(5);

      this.setState({
        cards: cards.map((x) => {
          return { card: x, checked: false };
        }),
        judgement: PokerHand.getOutcome(cards),
        highestCard: PokerHand.getHighestRankingCard(cards),
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  }

  pickCards(i: number) {
    try {
      this.setState((state) => {
        state.cards[i].checked = !state.cards[i].checked;

        return state;
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  }

  replaceCards() {
    try {
      if (this.deck === undefined) {
        throw new Error('Invalid state.');
      }

      const oldCards = this.state.cards.filter((x) => !x.checked).map((x) => x.card);
      const newCards = this.deck.getCards(this.state.cards.length - oldCards.length);
      const cards = oldCards.concat(newCards);

      this.setState({
        cards: cards.map((x) => {
          return { card: x, checked: false };
        }),
        judgement: PokerHand.getOutcome(cards),
        highestCard: PokerHand.getHighestRankingCard(cards),
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
        <h1>Супер-пупер Покер!</h1>
        <div className='card'>
          <div className='controls'>
            <button type='button' className='btn deal-btn' onClick={() => this.dealHand()}>
              Раздать карты
            </button>
            <button
              type='button'
              className='btn replace-btn'
              onClick={() => this.replaceCards()}
              disabled={
                this.deck === undefined || !this.state.cards.some((x) => x.checked) || this.deck.CardsLeft < this.state.cards.filter((x) => x.checked).length
              }
            >
              Заменить карты
            </button>
          </div>
          <p>{this.deck !== undefined ? `Осталось карт в колоде: ${this.deck.CardsLeft}` : 'Нажмите "Раздать карты" чтобы начать игру.'}</p>
          <p>{this.deck?.CardsLeft === 0 ? '\nНачните новую игру' : ''}</p>
          <div className='playingCards faceImages'>
            <ul className='table'>
              {this.state.cards.length > 0
                ? this.state.cards.map((x, i) => (
                    <li>
                      <CardComp
                        key={`${x.card.rank}-${x.card.suit}`}
                        rank={x.card.rank}
                        suit={x.card.suit}
                        checked={x.checked}
                        onChange={() => this.pickCards(i)}
                      />
                    </li>
                  ))
                : ''}
            </ul>
          </div>
          <p className='judgement'>
            {this.state.judgement !== undefined && this.state.highestCard !== undefined
              ? this.state.judgement === Hand.Air
                ? 'Highest rank: ' + ranks[this.state.highestCard.rank].name
                : this.state.judgement?.toString()
              : ''}
          </p>
        </div>
      </>
    );
  }
}

export default App;
