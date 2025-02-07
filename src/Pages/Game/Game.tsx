import { useState } from "react";
import Words from "../../Words";
import WordBox from "../../components/WordBox/WordBox";
import styles from "./Game.module.css";
import { toast } from "react-toastify";

const Game = () => {
  const [word] = useState(pickHandleWord);
  const [splitedWord] = useState(splitWord(word));
  const [guessingWord, setGuessingWord] = useState(
    settingGuessingWord(splitedWord)
  );
  const [letter, setLetter] = useState("");
  const [wrongLetter, setWrongLetter] = useState<string[]>([]);

  const handleLetterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (wrongLetter.includes(letter) || guessingWord.includes(letter)) {
      setLetter("");
      return toast.error("Você já tentou essa letra!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    const arrayLetterIndex: number[] = [];

    splitedWord.forEach((value, index) => {
      if (value === letter) {
        arrayLetterIndex.push(index);
      }
    });

    if (arrayLetterIndex.length <= 0) {
      setWrongLetter((prev) => {
        const newWrongLetter = [...prev];
        newWrongLetter.push(letter);
        return newWrongLetter;
      });
      setLetter("");
    } else {
      setGuessingWord((prev) => {
        const newGuessingWord = [...prev];

        arrayLetterIndex.forEach((value) => {
          newGuessingWord[value] = letter;
        });

        return newGuessingWord;
      });

      setLetter("");
    }
  };

  return (
    <div className={styles.main}>
      <span>Pontuação: {0}</span>
      <h1>Adivinhe a palavra: </h1>
      <div className={styles.wordContainer}>
        {guessingWord.map((w, key) => {
          return <WordBox key={key} word={w} />;
        })}
      </div>
      <p>Tente adivinhar uma letra da palavra: </p>

      <form className={styles.form} onSubmit={(e) => handleLetterSubmit(e)}>
        <label>
          <input
            id="Letter"
            name="Letter"
            type="text"
            maxLength={1}
            value={letter}
            onChange={(e) => setLetter(e.target.value.toUpperCase())}
          />
        </label>

        <button className={styles.button} type="submit" children={"Jogar!"} />
      </form>

      <p>{wrongLetter}</p>
    </div>
  );
};

const pickHandleWord = () => {
  const randomNumber = Math.floor(Math.random() * Words.length);
  const randomWord = Words[randomNumber];
  return randomWord.toUpperCase();
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
