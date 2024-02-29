import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards/Cards.component";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

export type SingleCardType = {
  id?: number;
  src: string;
  matched: boolean;
};

export type CardsType = SingleCardType[];

function App() {
  const [cards, setCards] = useState<CardsType | []>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<SingleCardType | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<SingleCardType | null>(null);
  const [disabled, setDisabled] = useState(false);

  //create duplicate cards for matching , adding ID to each card
  const shuffleCards = (): void => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card: SingleCardType): void => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //to check if both choices are selected , and update card state
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  //reset choices after every 2 card selection
  const resetTurn = (): void => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <Cards
        handleChoice={handleChoice}
        cards={cards}
        choiceOne={choiceOne}
        choiceTwo={choiceTwo}
        disabled={disabled}
      />

      <div className="turn-counter">
        <h3>Turns: {turns}</h3>
      </div>
    </div>
  );
}

export default App;
