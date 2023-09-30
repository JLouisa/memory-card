import PropTypes from "prop-types";

function PokemonCard(arr) {
  const capitalLetter = (word) => {
    const capital = word[0].toUpperCase();
    return capital + word.slice(1);
  };

  return (
    <div className="cardTile">
      <div className="cardImg">
        <img
          src={arr.pokemonArr[0] === undefined ? "" : arr.pokemonArr[0].url}
          alt={arr.pokemonArr[0] === undefined ? "undefined" : arr.pokemonArr[0].name}
        />
      </div>
      <div className="cardName">
        <p>{arr.pokemonArr[0] === undefined ? "undefined" : capitalLetter(arr.pokemonArr[0].name)}</p>
        {/* <p>{arr.pokemonArr[0] === undefined ? "undefined" : "Crabominable"}</p> */}
      </div>
    </div>
  );
}

PokemonCard.propTypes = {
  arr: PropTypes.array,
};

export { PokemonCard };
