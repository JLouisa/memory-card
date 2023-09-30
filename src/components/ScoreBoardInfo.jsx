import { useState, useEffect } from "react";

function ScoreBoardInfo() {
  const [currentScore, SetCurrentScore] = useState(0);
  const [highScore, SetHighScore] = useState(0);
  return (
    <>
      <p>Score: {currentScore}</p>
      <p>High Score: {highScore}</p>
    </>
  );
}

ScoreBoardInfo.propTypes = {
  // pokemonArr: PropTypes.array,
  // fullGameArr: PropTypes.array,
  // createGameArr: PropTypes.func,
};

export default ScoreBoardInfo;
