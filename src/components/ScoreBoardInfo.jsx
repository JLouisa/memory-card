import PropTypes from "prop-types";
// import { useState } from "react";

function ScoreBoardInfo({ currentScore, highScore }) {
  return (
    <>
      <p>Score: {currentScore}</p>
      <p>High Score: {highScore}</p>
    </>
  );
}

ScoreBoardInfo.propTypes = {
  currentScore: PropTypes.number,
  highScore: PropTypes.number,
  // createGameArr: PropTypes.func,
};

export default ScoreBoardInfo;
