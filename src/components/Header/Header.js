import React, { useState, useEffect } from 'react';

const Header = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  
  const greetings = ["Hello", "Howdy", "Hey", "Hola"];
  const emojis = ["👋", "🤟", "🙌", "✌️"];
  const name = "Deepansh";
  
  const getRandomGreeting = () => {
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    return `${greeting}, ${name}! ${emoji}`;
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Get weather directly using coordinates
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHERMAP_KEY}&units=metric`
          );
          const data = await response.json();
          if (data) {
            // If multiple weather conditions, randomly select one (like in R code)
            const weatherIndex = data.weather.length > 1 
              ? Math.floor(Math.random() * data.weather.length) 
              : 0;
            
            setWeather({
              temp: Math.round(data.main.temp),
              description: data.weather[weatherIndex].main,
              icon: data.weather[weatherIndex].icon,
              city: data.name
            });
          }
        } catch (error) {
          console.error("Error fetching weather:", error);
        }
      });
    }
  }, []);

  return (
    <div className="welcome">
      <p className="hi-message">
        {getRandomGreeting()}
      </p>
      
      {weather && (
        <div className="weather-info">
          <img 
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
          />
          <span>
            <p className="temperature">
              {weather.temp}℃
            </p>
            <p className="description">
              {weather.description} in {weather.city}
            </p>
          </span>
        </div>
      )}
    </div>
  );
};

export default Header;