import React from 'react';
import Weather from '../Weather';
import { getRandomGreeting } from '../../utils';

const Header = () => {
  return (
    <div className="welcome">
      <p className="hi-message">
        {getRandomGreeting()}
      </p>
      <Weather />
    </div>
  );
};

export default Header;