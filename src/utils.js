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