import "./styles/App.css";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import getRandomNumber from "./components/RandomNumberGenerator.jsx";
import { PokemonCard } from "./components/PokemonCard.jsx";
import FooterInfo from "./components/FooterInfo.jsx";
import ScoreBoardInfo from "./components/ScoreBoardInfo.jsx";
import CheckoutSwitch from "./components/CheckoutSwitch.jsx";
import loading from "./assets/loading.gif";

function App() {
  //! Game full Array and partial Array
  const [fullGameArr, setFullGameArr] = useState([]);
  const [pokemonArr, setPokemonArr] = useState([]);

  //! Showing Colors
  const [isChecked, setIsChecked] = useState(false);

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
    const number = getRandomNumber(0, 900);
    const url = "https://pokeapi.co/api/v2/";
    const apiKey = `pokemon?limit=100&offset=${number}`;

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
    saveSessionStorage(fullArr, false);
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
  function saveSessionStorage(obj, bool) {
    localStorage.setItem("checkedMemGame", JSON.stringify(bool));
    sessionStorage.setItem("fullGameList", JSON.stringify(obj));
  }
  function loadSessionStorage() {
    const savedFile = {
      savedChecked: JSON.parse(localStorage.getItem("checkedMemGame")),
      savedArr: JSON.parse(sessionStorage.getItem("fullGameList")),
    };
    return savedFile;
  }

  //!Save fullList in Local Storage
  function saveLocalStorage(bool) {
    localStorage.setItem("checkedMemGame", JSON.stringify(bool));
  }

  useEffect(() => {
    const loadingFile = loadSessionStorage();

    if (loadingFile === null || loadingFile.savedArr === null) {
      getData();
    } else {
      setFullGameArr(loadingFile.savedArr);
      createGameArr(loadingFile.savedArr);
      setIsChecked(loadingFile.savedChecked);
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
          <div className="stickyHeader">
            <CheckoutSwitch isChecked={isChecked} setIsChecked={setIsChecked} saveLocalStorage={saveLocalStorage} />
            <p className="read-the-docs">Click on the card you haven&apos;t clicked on before</p>
            <div className="scoreBoard">
              <ScoreBoardInfo currentScore={currentScore} highScore={highScore} />
            </div>
          </div>
        </section>
        {fullGameArr.length > 0 && (
          <PokemonCard
            pokemonArr={pokemonArr}
            fullGameArr={fullGameArr}
            createGameArr={createGameArr}
            currentScore={currentScore}
            SetCurrentScore={SetCurrentScore}
            highScore={highScore}
            SetHighScore={SetHighScore}
            isChecked={isChecked}
          />
        )}
      </main>
      <FooterInfo />
    </>
  );
}

export { App };
