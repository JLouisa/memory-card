import PropTypes from "prop-types";

function PokemonCard(arr) {
  console.log("arr");
  console.log(arr.pokemonArr[0]);
  return (
    <div className="cardTile">
      <div>
        <img src={arr.pokemonArr[0] === undefined ? "undefined" : ""} alt={arr.length === 0 ? "undefined" : ""} />
      </div>
      <div>
        <p>{arr.pokemonArr[0] === undefined ? "undefined" : "something"}</p>
      </div>
    </div>
  );
}

PokemonCard.propTypes = {
  arr: PropTypes.array,
};

export { PokemonCard };
