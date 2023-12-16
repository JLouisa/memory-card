import PropTypes from "prop-types";
import loading from "../assets/loading2.png";
import getRandomNumber from "./RandomNumberGenerator.jsx";
import { useState } from "react";
import { useEffect } from "react";

function PokemonCard({
  pokemonArr,
  fullGameArr,
  createGameArr,
  currentScore,
  SetCurrentScore,
  highScore,
  SetHighScore,
  isChecked,
}) {
  const [gameArr, setGameArr] = useState([]);
  // const [tempGameArr, setTempGameArr] = useState([]);

  useEffect(() => {
    const copyPokemonArr = JSON.parse(JSON.stringify(pokemonArr));
    if (pokemonArr !== undefined) {
      setGameArr(copyPokemonArr);
    }
  }, [pokemonArr]);

  const capitalLetter = (word) => {
    const capital = word[0].toUpperCase();
    return capital + word.slice(1);
  };

  function hitting(card) {
    card.health += 1;
    SetCurrentScore((currentScore += 1));
    const newArr = shuffle(gameArr);
    setGameArr(newArr);
    console.log("newArr");
    console.log(newArr);
    if (losingLogic(card) === 0) return;
    if (winGameLogic(newArr) === 1) return;
  }

  function losingLogic(card) {
    if (card.health > 1) {
      alert(`You lost! You have already clicked on ${capitalLetter(card.name)}`);
      SetCurrentScore(0);
      resetGame();
      if (currentScore > highScore) SetHighScore(currentScore - 1);
      return 0;
    }
    return -1;
  }

  function winGameLogic(arr) {
    let winPoint = 0;
    arr.forEach((card) => {
      if (card.health === 1) winPoint += 1;
    });
    if (winPoint === 20) {
      alert(`You won! Keep going to increase your High Score!`);
      resetGame();
      return 1;
    }
    return -1;
  }

  function resetGame() {
    createGameArr(fullGameArr);
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
    setGameArr(gameArr);
    return gameArr;
  };

  function getColorRGBA(cardType) {
    if (!isChecked) {
      return "white";
    } else {
      const colorMap = {
        normal: "rgba(139, 69, 19, 0.2)",
        fire: "rgba(255, 0, 0, 0.2)",
        water: "rgba(0, 0, 255, 0.2)",
        grass: "rgba(0, 128, 0, 0.2)",
        flying: "rgba(0, 0, 0, 0.2)",
        fighting: "rgba(139, 69, 19, 0.2)",
        poison: "rgba(128, 0, 128, 0.2)",
        electric: "rgba(255, 255, 0, 0.2)",
        ground: "rgba(139, 69, 19, 0.2)",
        rock: "rgba(169, 169, 169, 0.2)",
        psychic: "rgba(128, 0, 128, 0.2)",
        ice: "rgba(135, 206, 250, 0.2)",
        bug: "rgba(128, 128, 0, 0.2)",
        ghost: "rgba(128, 0, 128, 0.2)",
        steel: "rgba(128, 128, 128, 0.2)",
        dragon: "rgba(0, 0, 0, 0.2)",
        dark: "rgba(0, 0, 0, 0.2)",
        fairy: "rgba(255, 192, 203, 0.2)",
      };

      return colorMap[cardType] || "white";
    }
  }
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
              <div className="cardImg" style={{ backgroundColor: getColorRGBA(card.type) }}>
                <img
                  src={card === undefined ? { loading } : card.url}
                  alt={card === undefined ? "undefined" : card.name}
                  draggable="false"
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
  currentScore: PropTypes.number,
  SetCurrentScore: PropTypes.func,
  highScore: PropTypes.number,
  SetHighScore: PropTypes.func,
  isChecked: PropTypes.bool,
};

export { PokemonCard };
