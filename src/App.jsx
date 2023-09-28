import "./styles/App.css";
import { v4 as uuidv4 } from "uuid";
import { useState, ueseEffect } from "react";
// import FetchAPIData from "./components/FetchAPIData.jsx";

function App() {
  const [pokemonArr, setPokemonArr] = useState([]);

  class Pokemon {
    constructor(name, url) {
      this.name = name;
      this.url = url;
      this.health = 0;
      this.id = uuidv4();
    }
  }

  async function getData() {
    const url = "https://pokeapi.co/api/v2/";
    const apiKey = "pokemon?limit=100&offset=0";

    const data = await fetch(url + apiKey, { method: "GET", mode: "cors" });
    const result = await data.json();
    return createPokemonArr(result.results);
  }

  async function createPokemonArr(arr) {
    const fullArr = await arr.map((pokemon) => {
      return new Pokemon(pokemon.name, pokemon.url);
    });
    console.log(fullArr);
    return fullArr;
  }

  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async function createGameArr(arr) {
    let i = 0;
    const gameArr = [];
    const indArr = [];
    while (i != 24) {
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
    console.log(gameArr);
    return gameArr;
  }

  const info = createGameArr(getData());
  console.log(info);

  return (
    <>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      {/* <FetchAPIData /> */}
    </>
  );
}

export default App;
