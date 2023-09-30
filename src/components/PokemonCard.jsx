import PropTypes from "prop-types";
import loading from "../assets/loading2.png";
import getRandomNumber from "./RandomNumberGenerator.jsx";
import { useState } from "react";
import { useEffect } from "react";

function PokemonCard({ pokemonArr, fullGameArr, createGameArr }) {
  const [gameArr, setGameArr] = useState([]);
  const [lost, setLost] = useState(true);

  useEffect(() => {
    console.log("Effect fullGameArr");
    console.log(fullGameArr);
  }, [fullGameArr]);

  useEffect(() => {
    if (pokemonArr !== undefined) {
      setGameArr(pokemonArr);
    }
  }, [pokemonArr]);

  const capitalLetter = (word) => {
    const capital = word[0].toUpperCase();
    return capital + word.slice(1);
  };

  function hitting(card) {
    const newArr = shuffle(gameArr);
    console.log("newArr");
    console.log(newArr);
    console.log(card.id);
    console.log((card.health += 1));
    if (card.health > 1) {
      console.log("reset game");
      console.log(fullGameArr);
      createGameArr(fullGameArr);
    }
  }

  const shuffle = (arr) => {
    let i = 0;
    const gameArr = [];
    const indArr = [];
    while (i <= 19) {
      const randomNum = getRandomNumber(0, 19);
      if (!indArr.includes(randomNum)) {
        indArr.push(randomNum);
        gameArr.push(arr[randomNum]);
        i++;
      }
      if (i >= 50) {
        break;
      }
    }
    return gameArr;
  };

  return (
    <>
      <section className="cards">
        {gameArr.map((card) => {
          return (
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
          );
        })}
      </section>
    </>
  );
}

PokemonCard.propTypes = {
  pokemonArr: PropTypes.array,
  fullGameArr: PropTypes.array,
  createGameArr: PropTypes.func,
};

export { PokemonCard };
