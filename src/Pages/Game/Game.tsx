import { useState } from "react";
import Words from "../../Words";
import WordBox from "../../components/WordBox/WordBox";
import styles from "./Game.module.css";

const Game = () => {
  const [word] = useState(pickHandleWord);
  const [splitedWord] = useState(splitWord(word));
  const [guessingWord, setGuessingWord] = useState(
    settingGuessingWord(splitedWord)
  );
  const [letter, setLetter] = useState("");

  const handleLetterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const arrayLetterIndex = splitedWord.findIndex((value) => value === letter);
    if (arrayLetterIndex === -1) {
      return;
    } else {
      setGuessingWord((prev) => {
        const newGuessingWord = [...prev]; // Cria um novo array
        newGuessingWord[arrayLetterIndex] = letter; // Atualiza o valor
        return newGuessingWord;
      });
    }
  };

  return (
    <div>
      <span>Pontuação: {0}</span>
      <h1>Adivinhe a palavra: {word}</h1>
      <div className={styles.wordContainer}>
        {guessingWord.map((w, key) => {
          return <WordBox key={key} word={w} />;
        })}
      </div>
      <p>Tente adivinhar uma letra da palavra: </p>
      <form onSubmit={(e) => handleLetterSubmit(e)}>
        <label>
          <input
            id="Letter"
            name="Letter"
            type="text"
            maxLength={1}
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          />
        </label>

        <button type="submit" children={"Jogar!"} />
      </form>
    </div>
  );
};

const pickHandleWord = () => {
  const randomNumber = Math.floor(Math.random() * Words.length);
  const randomWord = Words[randomNumber];
  return randomWord;
};

const splitWord = (word: string) => {
  const splitedWord = word.split("");
  return splitedWord;
};

const settingGuessingWord = (splitedWord: string[]) => {
  const guessWord: string[] = [];
  splitedWord.map(() => {
    guessWord.push("");
  });

  return guessWord;
};

export default Game;
