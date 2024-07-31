import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { UserContext } from "../contexts/UserContext";
import { putUser } from "../api/putUser";

export default function Game(props) {

  const router = useRouter()
  const { difficulty } = router.query
  const { user, isLogged } = useContext(UserContext);
  useEffect(() => {
    if (isLogged == "false") {
      router.push("/");
    }
  }, []);

  const [word, setWord] = useState('')
  // console.log(word);
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(6);
  const [gameOver, setGameOver] = useState(false);
  const [reload, setReload] = useState(false)

  useEffect(() => {
    if (!difficulty) return;

    const fetchWord = async () => {
      if (difficulty == 'facile') {
        fetch("https://trouve-mot.fr/api/size/5")
          .then((response) => response.json())
          .then((words) => setWord(words[0].name.toUpperCase()))
      } else if (difficulty == 'normal') {
        fetch("https://trouve-mot.fr/api/size/10")
          .then((response) => response.json())
          .then((words) => setWord(words[0].name.toUpperCase()))
      } else if (difficulty == 'difficile') {
        fetch("https://trouve-mot.fr/api/size/15")
          .then((response) => response.json())
          .then((words) => setWord(words[0].name.toUpperCase()))
      }
    };
    fetchWord();
  }, [difficulty, reload]);

  const getWordLength = (difficulty) => {
    switch (difficulty) {
      case 'facile':
        return 5;
      case 'normal':
        return 10;
      case 'difficile':
        return 15;
      default:
        return 0;
    }
  };

  const wordLength = getWordLength(difficulty);

  const handleGuess = () => {
    if (input.length !== word.length) {
      setMessage('Le mot doit être de la même longueur que le mot à deviner.');
      return;
    }

    const guess = input.toUpperCase();
    setGuesses([...guesses, guess]);
    setInput('');
    setAttempts(attempts - 1);

    if (guess === word) {
      setMessage('Félicitations! Vous avez trouvé le mot.');
      setGameOver(true);
      var info = {
        score: Number(user.score) + Number(wordLength),
      };
      const response = putUser(user.id, info);
    } else if (attempts - 1 === 0) {
      setMessage(`Vous avez perdu! Le mot était: ${word}`);
      setGameOver(true);
    } else {
      setMessage(`Essayez encore. Tentatives restantes: ${attempts - 1}`);
    }
  };

  const restart = () => {
    setReload(prev => !prev)
    setAttempts(6)
    setGameOver(false)
    setGuesses([])
    setMessage('');
  }

  return (
    <Box sx={{ height: '96vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Motus - {difficulty && difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} ({wordLength} caractères)
      </Typography>
      <Typography variant="h6" gutterBottom>
        Tentatives restantes: {attempts}
      </Typography>
      <Box sx={{ mb: 2 }}>
        {guesses.map((guess, index) => (
          <Typography key={index} variant="h6">
            {guess.split('').map((char, i) => (
              <span key={i} style={{ color: char === word[i] ? 'green' : word.includes(char) ? 'orange' : 'red' }}>
                {char}
              </span>
            ))}
          </Typography>
        ))}
      </Box>
      <TextField
        label="Votre essai"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && !gameOver && handleGuess()}
        disabled={gameOver}
        sx={{ background: 'white' }}
      />
      <Box sx={{ marginTop: 3, gap: 3, display: 'flex' }}>
        <Button onClick={handleGuess} variant="contained" color='success' sx={{ ml: 2 }} disabled={gameOver}>
          Valider
        </Button>
        <Button onClick={restart} variant="contained" sx={{ ml: 2 }}>
          Réessayer
        </Button>
        <Button onClick={() => router.push('/home')} variant="contained" color='error' sx={{ ml: 2 }}>
          Quitter
        </Button>
      </Box>
      {message && <Typography variant="h6" sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
};