import React, { useState, useEffect } from 'react';
import Peek from '../Peek';

const HugoPeek = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const formatTimeString = () => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    };
    return time.toLocaleTimeString('en-US', options);
  };

  const formatDateString = () => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      timeZone: 'Asia/Kolkata'
    });
    
    const parts = formatter.formatToParts(time);
    const weekday = parts.find(p => p.type === 'weekday').value;
    const day = parseInt(parts.find(p => p.type === 'day').value);
    const month = parts.find(p => p.type === 'month').value;
    const ordinal = getOrdinalSuffix(day);

    return `${weekday}, ${day}${ordinal} of ${month}`;
  };

  return (
    <Peek
      cardClass="clock"
      firstSentence={formatTimeString()}
      secondSentence={formatDateString()}
      emoji="🕰️"
      buttonLink="https://time.is/"
      buttonName="Hugo"
    />
  );
};

export default HugoPeek;