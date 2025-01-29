import React, { useState, useEffect } from 'react';
import Peek from '../Peek';
import { processApiWithCache } from '../../apiUtils';

const shortenPrice = (price, decimals) => {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let suffixIndex = 0;
  while (price >= 1000 && suffixIndex < suffixes.length - 1) {
    price /= 1000;
    suffixIndex++;
  }
  return `$${price.toFixed(decimals)}${suffixes[suffixIndex]}`;
};

const EbenezerPeek = () => {
  const [networth, setNetworth] = useState(null);
  const [cacheStatus, setCacheStatus] = useState('gray');
  
  const fetchData = async (forceRefresh = false) => {
    const { response, status } = await processApiWithCache('ebenezer/networth', forceRefresh);
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
    return <div>Loading...</div>;
  }

  console.log(networth);

  const current = shortenPrice(networth.current, 2);
  const invested = shortenPrice(networth.invested, 2); 
  console.log(networth.loans);
  const loanAmount = shortenPrice(-1 * networth.loans, 2);

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