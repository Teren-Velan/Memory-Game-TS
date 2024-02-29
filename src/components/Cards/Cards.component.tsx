import "./cards.css";
import SingleCard from "./SingleCard.component";
import { SingleCardType, CardsType } from "../../App";

type CardsProps = {
  cards: CardsType;
  choiceOne: SingleCardType | null;
  choiceTwo: SingleCardType | null;
  disabled: boolean;
  handleChoice: (card: SingleCardType) => void;
};

const Cards = ({
  cards,
  choiceOne,
  choiceTwo,
  disabled,
  handleChoice,
}: CardsProps) => {
  return (
    <div className="card-grid">
      {cards.map((card: { id?: number; src: string; matched: boolean }) => (
        <div key={card.id}>
          <SingleCard
            handleChoice={handleChoice}
            card={card}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
