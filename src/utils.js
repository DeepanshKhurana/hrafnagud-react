export const sample = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const range = (start, end, step = 1) => {
  let output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

export const getRandomGreeting = (name = "Deepansh") => {
  const greetings = ["Hello", "Howdy", "Hey", "Hola"];
  const emojis = ["👋", "🤟", "🙌", "✌️"];
  
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  return `${greeting}, ${name}! ${emoji}`;
};

const trueRound = (number, digits = 1) => {
  const factor = Math.pow(10, digits);
  return Math.trunc((Math.abs(number) * factor) + 0.5 + Math.sqrt(Number.EPSILON)) / factor * Math.sign(number);
};

const formatPrice = (value, round = 2) => {
  return trueRound(Number(value), round).toFixed(round);
};

export const shortenPrice = (value, round = 1) => {
  const formattedValue = Number(formatPrice(value, 3)); // Ensure numeric rounding
  if (isNaN(formattedValue)) return value.toString();

  if (formattedValue < 1e3) return trueRound(formattedValue, round).toString();
  if (formattedValue < 1e5) return `${trueRound(formattedValue / 1e3, round)}K`;
  if (formattedValue < 1e7) return `${trueRound(formattedValue / 1e5, round)}L`;
  return `${trueRound(formattedValue / 1e7, round)}Cr`;
};
