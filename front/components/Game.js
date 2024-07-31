import { useState } from 'react';
import Input from './Input';
import Feedback from './Feedback';

const words = ["bonjour", "voiture", "ordinateur", "maison", "jardin"];
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const Game = () => {
  const [word, setWord] = useState(getRandomWord());
  const [attempts, setAttempts] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.length === word.length) {
      setAttempts([...attempts, input]);
      setInput('');
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <Input value={input} onChange={handleChange} onSubmit={handleSubmit} />
      {attempts.map((attempt, index) => (
        <Feedback key={index} word={word} attempt={attempt} />
      ))}
    </div>
  );
};

export default Game;
