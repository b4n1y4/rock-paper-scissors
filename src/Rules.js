import React from "react";
import CloseButton from "./assets/images/icon-close.svg";
import RulesImage from "./assets/images/image-rules.svg";

const Rules = ({ setShowRules }) => {
  return (
    <div className="card-backdrop">
      <div className={`card rules ${setShowRules ? "open" : ""}`}>
        <div className="card-header">
          <h1 className="card-title">RULES</h1>
          <button className="close-card toggle-btn">
            <img
              src={CloseButton}
              alt="Close"
              className="btn-icon"
              onClick={() => {
                setShowRules(false);
              }}
            />
          </button>
        </div>
        <div className="card-content">
          <img src={RulesImage} alt="Rules" className="image-rules" />
        </div>
      </div>
    </div>
  );
};

export default Rules;
