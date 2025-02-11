import styles from "./WordBox.module.css";

interface WordBoxProps {
  letter: string;
}

const WordBox = ({ letter }: WordBoxProps) => {
  return <div className={styles.box}>{letter}</div>;
};

export default WordBox;
