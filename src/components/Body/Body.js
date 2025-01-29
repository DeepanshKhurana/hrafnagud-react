import React from 'react';
import HugoPeek from '../HugoPeek';
import EbenezerPeek from '../EbenezerPeek/EbenezerPeek';

const Body = () => {
  return (
    <div className="hrafnagud-body">
      <div className="modules">
        <HugoPeek />
        <EbenezerPeek />
      </div>
    </div>
  );
};

export default Body;