export function generateRandomUsername() {
  const adjectives = [
    'Quick', 'Bright', 'Happy', 'Calm', 'Brave', 'Eager', 'Jolly', 'Kind', 'Lively', 'Silly',
    'Clever', 'Gentle', 'Witty', 'Bold', 'Lucky', 'Wise', 'Swift', 'Fierce', 'Sunny', 'Mighty'
  ];

  const nouns = [
    'Panda', 'Tiger', 'Eagle', 'Lion', 'Dragon', 'Wolf', 'Bear', 'Fox', 'Shark', 'Hawk',
    'Falcon', 'Leopard', 'Owl', 'Phoenix', 'Griffin', 'Unicorn', 'Dolphin', 'Panther', 'Bison', 'Rhino'
  ];

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 10000);

  return `${randomAdjective}${randomNoun}${randomNumber}`;
}
