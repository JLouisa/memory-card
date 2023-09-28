import "./styles/App.css";
// import FetchAPIData from "./components/FetchAPIData.jsx";

class Pokemon {
  constructor(name, imgURL) {
    this.name = name;
    this.imgURL = imgURL;
  }
}
function App() {
  async function FetchData(apiKeyTest) {
    const url = "https://pokeapi.co/api/v2/";
    const response = await fetch(url + apiKeyTest, { method: "GET", mode: "cors" });
    const data = await response.json();
    const pokemonVar = new Pokemon(data.name, data.sprites.front_default);
    return pokemonVar;
  }

  let FetchDataInfo = FetchData("pokemon/ditto").then((result) => {
    new Pokemon(result.name, result.sprites.front_default);
  });
  console.log(FetchDataInfo);

  return (
    <>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      {/* <FetchAPIData /> */}
    </>
  );
}

export default App;
