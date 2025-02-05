import styles from "./WordBox.module.css";

interface WordBoxProps {
  word: string;
}

const WordBox = ({ word }: WordBoxProps) => {
  return <div className={styles.box}>{word}</div>;
};

export default WordBox;
