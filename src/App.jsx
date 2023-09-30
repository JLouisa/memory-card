import "./styles/App.css";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import getRandomNumber from "./components/RandomNumberGenerator.jsx";
import { PokemonCard } from "./components/PokemonCard.jsx";
import FooterInfo from "./components/FooterInfo.jsx";

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
  const [lost, setLost] = useState(true);

  class Pokemon {
    constructor(name, url) {
      this.name = name;
      this.url = url;
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
        const newArr = new Pokemon(pokemon.name, url);
        return newArr;
      })
    );
    await saveSessionStorage(fullArr);
    await setFullGameArr(fullArr);
    await createGameArr(fullArr);
  }

  //! Fetch image URL per Pokemon
  async function getDataURL(url) {
    const dataURL = await fetch(url, { method: "GET", mode: "cors" });
    const result = await dataURL.json();
    return result.sprites.front_default;
  }

  //! Create game list of 24 items
  async function createGameArr(arr) {
    await console.log("arr2");
    await console.log(arr);
    let i = 0;
    const gameArr = [];
    const indArr = [];
    while (i <= 23) {
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
    console.log(loadingFile);
    if (loadingFile === null) {
      getData();
    } else {
      setFullGameArr(loadingFile);
      createGameArr(loadingFile);
    }
  }, []);

  return (
    <>
      <header>
        <h1>Memory Card Game</h1>
      </header>
      <main>
        <p className="read-the-docs">Click on the card you haven&apos;t click on before</p>
        <section className="cards">
          <PokemonCard pokemonArr={pokemonArr} />
        </section>
      </main>
      <FooterInfo />
    </>
  );
}

export { App };
