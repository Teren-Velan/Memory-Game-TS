import { SingleCardType } from "../../App";
import "./cards.css";

type SingleCardProps = {
  card: SingleCardType;
  flipped: boolean;
  handleChoice: (card: SingleCardType) => void;
  disabled: boolean;
};

const SingleCard = ({
  card,
  flipped,
  handleChoice,
  disabled,
}: SingleCardProps) => {
  const handleClick = (): void => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className={`${flipped ? "flipped" : ""} card`}>
      <img className="front" src={card.src} alt="card-front" />
      <img
        className="back"
        onClick={handleClick}
        src="/img/cover.png"
        alt="card-back"
      />
    </div>
  );
};

export default SingleCard;
