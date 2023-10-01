import "./styles/App.css";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import getRandomNumber from "./components/RandomNumberGenerator.jsx";
import { PokemonCard } from "./components/PokemonCard.jsx";
import FooterInfo from "./components/FooterInfo.jsx";
import ScoreBoardInfo from "./components/ScoreBoardInfo.jsx";
import loading from "./assets/loading.gif";

//Fetch pokemon data list with name and img url
//Create objects from the list to add health and id key
//Save list in session storage and load for the game after every loss
// Create a gameList from the list with only 24 items
//Render and display the gameList with onclick function to affect object health
//When all object in the gameList health is 1, win the game.
//    end game and restart
//    remake gameList
//    render new gameList

//When atleast one object in the list has more than 1 health
//    end game and restart
//    remake gameList
//    render new gameList

function App() {
  const [fullGameArr, setFullGameArr] = useState([]);
  const [pokemonArr, setPokemonArr] = useState([]);

  //!ScoreBoard State Lifted
  const [currentScore, SetCurrentScore] = useState(0);
  const [highScore, SetHighScore] = useState(0);

  //! Create Pokemon Objects from JSON
  class Pokemon {
    constructor(name, url, type) {
      this.name = name;
      this.url = url;
      this.type = type;
      this.health = 0;
      this.id = uuidv4();
    }
  }

  //! Fetch data from PokéAPI
  async function getData() {
    const url = "https://pokeapi.co/api/v2/";
    const apiKey = "pokemon?limit=100&offset=0";

    const data = await fetch(url + apiKey, { method: "GET", mode: "cors" });
    const result = await data.json();
    await createGameFullArr(result.results);
  }
  async function createGameFullArr(arr) {
    const fullArr = await Promise.all(
      arr.map(async (pokemon) => {
        const url = await getDataURL(pokemon.url);
        const newArr = new Pokemon(pokemon.name, url.url, url.type);
        return newArr;
      })
    );
    saveSessionStorage(fullArr);
    setFullGameArr(fullArr);
    createGameArr(fullArr);
  }

  //! Fetch image URL per Pokemon
  async function getDataURL(url) {
    const dataURL = await fetch(url, { method: "GET", mode: "cors" });
    const response = await dataURL.json();
    const result = {
      url: response.sprites.front_default,
      type: response.types[0].type.name,
    };
    return result;
  }

  //! Create game list of 24 items
  async function createGameArr(arr) {
    let i = 0;
    const gameArr = [];
    const indArr = [];
    while (i <= 19) {
      const randomNum = getRandomNumber(0, 99);
      if (!indArr.includes(randomNum)) {
        indArr.push(randomNum);
        gameArr.push(arr[randomNum]);
        i++;
      }
      if (i >= 50) {
        break;
      }
    }
    await setPokemonArr(gameArr);
  }

  //!Save fullList in Session Storage
  function saveSessionStorage(obj) {
    sessionStorage.setItem("fullGameList", JSON.stringify(obj));
  }
  function loadSessionStorage() {
    const savedFile = JSON.parse(sessionStorage.getItem("fullGameList"));
    return savedFile;
  }

  useEffect(() => {
    const loadingFile = loadSessionStorage();

    if (loadingFile === null) {
      getData();
    } else {
      setFullGameArr(loadingFile);
      createGameArr(loadingFile);
    }
  }, []);

  if (fullGameArr.length === 0) {
    return (
      <>
        <header>
          <h1>Memory Card Game</h1>
        </header>
        <main className="loadingMain">
          <section className="loadingScreen">
            <img src={loading} />
            <span>Loading...</span>
          </section>
        </main>
        <FooterInfo />
      </>
    );
  }

  return (
    <>
      <header>
        <h1>Memory Card Game</h1>
      </header>
      <main>
        <section className="title">
          <p className="read-the-docs">Click on the card you haven&apos;t clicked on before</p>
          <div className="scoreBoard">
            <ScoreBoardInfo currentScore={currentScore} highScore={highScore} />
          </div>
        </section>
        {/* Only render PokemonCard when fullGameArr is not empty */}
        {fullGameArr.length > 0 && (
          <PokemonCard
            pokemonArr={pokemonArr}
            fullGameArr={fullGameArr}
            createGameArr={createGameArr}
            currentScore={currentScore}
            SetCurrentScore={SetCurrentScore}
            highScore={highScore}
            SetHighScore={SetHighScore}
          />
        )}
      </main>
      <FooterInfo />
    </>
  );
}

export { App };
