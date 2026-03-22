import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
//Images of cards
const cardImages = [
  {"src": "/img/BlueSmiley.png", matched: false},
  {"src": "/img/GreenSmiley.png", matched: false},
  {"src": "/img/OrangeSmiley.png", matched: false},
  {"src": "/img/PinkSmiley.png", matched: false},
  {"src": "/img/WhiteSmiley.png", matched: false},
  {"src": "/img/YellowSmiley.png", matched: false}
];


function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // shuffle cards 
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ... cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}));
  
    setCards(shuffleCards);
    setTurns(0);
  }

  const handleChoice = (card) => {
    if (card.matched) { //ignore already matched cards
      return;
    }
    if (choiceOne == null) {
      setChoiceOne(card);
      return;
    }
    if (choiceOne.id == card.id) { //ignore if it is already the selected card
      return;
    }
    setChoiceTwo(card);
  }


  const onTurnOver = () => {
      resetTurn();
      if (choiceOne.src === choiceTwo.src) {
        //Flag cards as already matched
        setCards(prevCards => {
            return prevCards.map(card => {
              return card.src == choiceOne.src ? {...card, matched: true} : card           
            });
        })  
        console.log("card match");
        return;
      } 
      console.log("card mismatch");
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      onTurnOver();
    }
  }, [choiceOne, choiceTwo])

  //Resetting turn
  const resetTurn = () => {
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className="App">
      <h1>Match stuff</h1>  
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
            <SingleCard 
            card={card}
            handleChoice={handleChoice}
            flipped={card.matched || card === choiceOne || card == choiceTwo}
            />  
        ))}
      </div>
    </div>
  );
}

export default App;
