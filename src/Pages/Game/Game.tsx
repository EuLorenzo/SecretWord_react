import { useEffect, useRef, useState } from "react";
import Words from "../../Words";
import WordBox from "../../components/WordBox/WordBox";
import styles from "./Game.module.css";
import { toast } from "react-toastify";

const Game = () => {
  const [splitedWord, setSplitedWord] = useState<string[]>([]);
  const [guessingWord, setGuessingWord] = useState<string[]>([]);
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef<HTMLInputElement>(null);
  const [wrongLetter, setWrongLetter] = useState<string[]>([]);
  const [pontuacao, setPontuacao] = useState(0);

  const handleLetterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (wrongLetter.includes(letter) || guessingWord.includes(letter)) {
      setLetter("");
      return sendToast("sameLetter");
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
      if (letterInputRef.current) {
        letterInputRef.current.focus();
      }

      setLetter("");
    } else {
      setGuessingWord((prev) => {
        const newGuessingWord = [...prev];

        arrayLetterIndex.forEach((value) => {
          newGuessingWord[value] = letter;
        });

        if (!newGuessingWord.includes("")) {
          setWords();
          setLetter("");
          setWrongLetter([]);
          setPontuacao((prev) => prev + 1);
          sendToast("finishedGame");
          return prev;
        }

        return newGuessingWord;
      });

      if (letterInputRef.current) {
        letterInputRef.current.focus();
      }
      setLetter("");
    }
  };

  const setWords = () => {
    const guessWord: string[] = [];
    const randomNumber = Math.floor(Math.random() * Words.length);
    const randomWord = Words[randomNumber].toUpperCase();

    const splitedWord = randomWord.split("");
    splitedWord.map(() => {
      guessWord.push("");
    });

    setSplitedWord(splitedWord);
    setGuessingWord(guessWord);
  };

  useEffect(() => {
    setWords();
  }, []);

  return (
    <div className={styles.main}>
      <span>Pontuação: {pontuacao}</span>
      <h1>Adivinhe a palavra: </h1>
      <div className={styles.wordContainer}>
        {guessingWord.map((l, key) => {
          return <WordBox key={key} letter={l} />;
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
            ref={letterInputRef}
            required
          />
        </label>

        <button className={styles.button} type="submit" children={"Jogar!"} />
      </form>

      <p>
        {wrongLetter.map((l) => (
          <span>{l}, </span>
        ))}
      </p>
    </div>
  );
};

const sendToast = (mensage: "sameLetter" | "finishedGame") => {
  switch (mensage) {
    case "sameLetter":
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
    case "finishedGame":
      return toast.success("Você acertou a palavra!", {
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
};

export default Game;
