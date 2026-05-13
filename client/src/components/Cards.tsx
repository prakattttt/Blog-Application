import Card from "./Card";
import type { CardType } from "../types/card.types";
import { blogCards } from "../dummy";

const Cards = () => {
  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-10
      "
    >
      {blogCards.map((card: CardType) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default Cards;
