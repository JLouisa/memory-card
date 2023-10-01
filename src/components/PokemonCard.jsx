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
}) {
  const [gameArr, setGameArr] = useState([]);
  // const [lost, setLost] = useState(true);

  useEffect(() => {
    // console.log("Effect fullGameArr");
    // console.log(fullGameArr);
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
    console.log((card.health += 1));
    console.log(card);
    SetCurrentScore((currentScore += 1));
    const newArr = shuffle(gameArr);
    console.log(newArr);
    if (losingLogic(card) === 0) return;
    if (winGameLogic(newArr) === 1) return;
  }

  function losingLogic(card) {
    if (card.health > 1) {
      console.log("reset game");
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
      console.log("You won the game!");
      alert(`You won! Keep going to increase your High Score!`);
      resetGame();
      return 1;
    }
    return -1;
  }

  function resetGame() {
    console.log(fullGameArr);
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

  function backColor(card) {
    if (card.type === "water") return "blue";
    if (card.type === "normal") return "brown";
    if (card.type === "fire") return "red";
    if (card.type === "grass") return "green";
    if (card.type === "electric") return "yellow";
    if (card.type === "ice") return "skyblue";
    if (card.type === "fighting") return "brown";
    if (card.type === "poison") return "green";
    if (card.type === "ground") return "brown";
    if (card.type === "rock") return "grey";
    if (card.type === "bug") return "green";
    if (card.type === "fairy") return "pink";
    if (card.type === "psychic") return "purple";
    if (card.type === "ghost") return "purple";
    return "white";
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
              <div className="cardImg" style={{ backgroundColor: /*backColor(card)*/ "white" }}>
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
  currentScore: PropTypes.number,
  SetCurrentScore: PropTypes.func,
  highScore: PropTypes.number,
  SetHighScore: PropTypes.func,
};

export { PokemonCard };
