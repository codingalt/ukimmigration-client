import React from 'react'
import congrats from "../Assets/congrats-tick.svg";
import "../style/Rejectpopup.css";

const CongratsGroupPhase1 = () => {
  return (
    <div>
      <div className="overlay">
        <div className="popoup">
          <img src={congrats} alt="" className="cross-img" />
          <p className="Confermation-text-2">Congratulations!</p>
          <p className="form-submited-text">
            Your Application is now with a caseworker and we will revert within
            48 hours.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CongratsGroupPhase1