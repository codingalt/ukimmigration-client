import React from 'react'
import congrats from "../Assets/congrats-tick.svg"
import "../style/Rejectpopup.css";

const Congratspopup = () => {
    return (
      <div>
        <div className="overlay">
          <div className="popoup">
            <img src={congrats} alt="" className="cross-img" />
            <p className="Confermation-text-2">Congratulations!</p>
            <p className="form-submited-text" style={{textAlign:"center",maxWidth:"80%",margin:"auto",marginTop:"2rem"}}>
              The case is under review and the team will respond within 48
              hours.{" "}
            </p>
          </div>
        </div>
      </div>
    );
    };

export default Congratspopup