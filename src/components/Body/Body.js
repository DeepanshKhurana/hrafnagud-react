import React from 'react';
import HugoPeek from '../HugoPeek';
import EbenezerPeek from '../EbenezerPeek/EbenezerPeek';

const Body = () => {
  return (
    <div className="hrafnagud-body">
      <div className="modules">
        <div className="module">
          <HugoPeek />
        </div>
        <div className="module">
          <EbenezerPeek />
        </div>
        
      </div>
    </div>
  );
};

export default Body;