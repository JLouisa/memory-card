import PropTypes from "prop-types";
import loading from "../assets/loading2.png";
import { useState } from "react";
import { useEffect } from "react";

function PokemonCard(arr) {
  const [gameArr, setGameArr] = useState([]);

  useEffect(() => {
    if (arr.pokemonArr !== undefined) {
      setGameArr(arr.pokemonArr);
    }
  }, [arr]);


  const capitalLetter = (word) => {
    const capital = word[0].toUpperCase();
    return capital + word.slice(1);
  };

  function hitting(card) {
    console.log(card.id);
    console.log((card.health += 1));
    if (card.health > 1) console.log("reset game");
  }

  const shuffle(){}

  return (
    <>
      {/* <section className="cards">
        <div
          className="cardTile"
          onClick={() => {
            hitting(gameArr[0]);
          }}
        >
          <div className="cardImg">
            <img
              src={gameArr[0] === undefined ? { loading } : gameArr[0].url}
              alt={gameArr[0] === undefined ? "undefined" : gameArr[0].name}
            />
          </div>
          <div className="cardName">
            <p>{gameArr[0] === undefined ? "undefined" : capitalLetter(gameArr[0].name)}</p>
          </div>
        </div>
      </section> */}
      <section className="cards">
        {gameArr.map((card) => {
          // {
          //   console.log(card);
          // }
          return (
            <>
              <div
                className="cardTile"
                key={card.id}
                onClick={() => {
                  hitting(card);
                }}
              >
                <div className="cardImg">
                  <img
                    src={card === undefined ? { loading } : card.url}
                    alt={card === undefined ? "undefined" : card.name}
                  />
                </div>
                <div className="cardName">
                  <p>{card === undefined ? "undefined" : capitalLetter(card.name)}</p>
                </div>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
}

PokemonCard.propTypes = {
  arr: PropTypes.array,
};

export { PokemonCard };
