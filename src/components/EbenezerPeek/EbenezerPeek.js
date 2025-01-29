import React, { useState, useEffect } from 'react';
import Peek from '../Peek';
import { processApiWithCache } from '../../apiUtils';
import { shortenPrice } from '../../utils';

const EbenezerPeek = () => {
  const [networth, setNetworth] = useState(null);
  const [loans, setLoans] = useState(null);
  const [cacheStatus, setCacheStatus] = useState('gray');
  
  const fetchData = async (forceRefresh = false) => {
    const { response, status } = await processApiWithCache('ebenezer/networth', forceRefresh);
    setLoans(response.loans);
    setNetworth(response.networth);
    setCacheStatus(status);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData(true);
  };

  if (!networth) {
    return (
      <Peek 
        firstSentence="Loading..."
        secondSentence="Please wait while the data loads."
        emoji="⏳"
        buttonLink="#"
        buttonName="Refresh"
        isLive={false} 
        cardClass="loading-card"
      />
    );
  }

  const current = shortenPrice(networth.current, 2);
  const invested = shortenPrice(networth.invested, 2); 
  const loanAmount = shortenPrice(-1 * loans.current, 2);

  return (
    <Peek
      cardClass="networth"
      firstSentence={`You're worth ${current}`} 
      secondSentence={`${invested} invested with ${loanAmount} in loans`}
      emoji="💸"
      buttonLink="https://hrafnagud.me/app/ebenezer"
      buttonName="Ebenezer"
      statusButton={
        <button 
          className={`status-circle btn-default bg-${cacheStatus}`}
          onClick={handleRefresh}
        >
          <i className="fas fa-circle" />
        </button>
      }
    />
  );
};

export default EbenezerPeek;