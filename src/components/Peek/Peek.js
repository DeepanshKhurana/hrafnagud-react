import React from 'react';

const Peek = ({
  cardClass = "",
  firstSentence,
  secondSentence,
  emoji,
  buttonLink,
  buttonName,
  isLive = true,
  statusButton = ""
}) => {
  return (
    <div className={`card ${cardClass} ${!isLive ? 'greyscale' : ''}`}>
      <div className="key-info-line">
        <div className="key-info-text">
          <p className="first">{firstSentence}</p>
          <p className="second">{secondSentence}</p>
        </div>
        <div className="key-info-emoji">
          <p>{emoji}</p>
        </div>
      </div>
      <div className="card-footer">
        <a 
          className="goto-button" 
          href={buttonLink} 
          target="_blank"
          rel="noopener noreferrer"
        >
          {buttonName}
        </a>
        {statusButton && (
          <button className="status-circle btn-default">
            {statusButton}
          </button>
        )}
      </div>
    </div>
  );
};

export default Peek;