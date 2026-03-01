import { useState, useEffect, useCallback } from "react";
import { checkWordValid, fetchRandomWord } from "@/lib/words";

export type LetterState = "correct" | "present" | "absent" | "empty" | "tbd";

export interface TileData {
  letter: string;
  state: LetterState;
}

export interface KeyState {
  [key: string]: LetterState;
}

export function useWordle() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState<TileData[][]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [keyStates, setKeyStates] = useState<KeyState>({});
  const [shakeRow, setShakeRow] = useState(-1);
  const [revealRow, setRevealRow] = useState(-1);
  const [bounceRow, setBounceRow] = useState(-1);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchRandomWord().then((word) => {
      setSolution(word);
      setIsLoading(false);
      console.log("Solution:", word);
    });
  }, []);

  const showMessage = useCallback((msg: string, duration = 1500) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), duration);
  }, []);

  const evaluateGuess = useCallback(
    (guess: string): TileData[] => {
      const result: TileData[] = Array(5).fill(null).map(() => ({ letter: "", state: "absent" as LetterState }));
      const solutionArr = solution.split("");
      const guessArr = guess.split("");
      const taken = Array(5).fill(false);

      // First pass: correct positions
      for (let i = 0; i < 5; i++) {
        result[i].letter = guessArr[i];
        if (guessArr[i] === solutionArr[i]) {
          result[i].state = "correct";
          taken[i] = true;
        }
      }

      // Second pass: present but wrong position
      for (let i = 0; i < 5; i++) {
        if (result[i].state === "correct") continue;
        for (let j = 0; j < 5; j++) {
          if (!taken[j] && guessArr[i] === solutionArr[j]) {
            result[i].state = "present";
            taken[j] = true;
            break;
          }
        }
      }

      return result;
    },
    [solution]
  );

  const submitGuess = useCallback(async () => {
    if (currentGuess.length !== 5) {
      setShakeRow(currentRow);
      showMessage("Not enough letters");
      setTimeout(() => setShakeRow(-1), 500);
      return;
    }

    const valid = await checkWordValid(currentGuess);
    if (!valid) {
      setShakeRow(currentRow);
      showMessage("Not in word list");
      setTimeout(() => setShakeRow(-1), 500);
      return;
    }

    const result = evaluateGuess(currentGuess);
    const newGuesses = [...guesses, result];
    setGuesses(newGuesses);
    setRevealRow(currentRow);

    // Update key states after reveal
    setTimeout(() => {
      const newKeyStates = { ...keyStates };
      result.forEach((tile) => {
        const key = tile.letter;
        const current = newKeyStates[key];
        if (tile.state === "correct") {
          newKeyStates[key] = "correct";
        } else if (tile.state === "present" && current !== "correct") {
          newKeyStates[key] = "present";
        } else if (!current) {
          newKeyStates[key] = "absent";
        }
      });
      setKeyStates(newKeyStates);
    }, 5 * 300);

    const won = currentGuess === solution;
    if (won) {
      setTimeout(() => {
        setBounceRow(currentRow);
        showMessage(["Genius!", "Magnificent!", "Impressive!", "Splendid!", "Great!", "Phew!"][currentRow], 3000);
        setGameWon(true);
        setGameOver(true);
      }, 5 * 300 + 200);
    } else if (currentRow === 5) {
      setTimeout(() => {
        showMessage(solution, 5000);
        setGameOver(true);
      }, 5 * 300 + 200);
    }

    setCurrentGuess("");
    setCurrentRow((r) => r + 1);
  }, [currentGuess, currentRow, guesses, keyStates, solution, evaluateGuess, showMessage]);

  const handleKey = useCallback(
    (key: string) => {
      if (gameOver || isLoading) return;

      if (key === "ENTER") {
        submitGuess();
      } else if (key === "BACKSPACE") {
        setCurrentGuess((g) => g.slice(0, -1));
      } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess((g) => g + key);
      }
    },
    [gameOver, isLoading, currentGuess, submitGuess]
  );

  // Physical keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const key = e.key.toUpperCase();
      if (key === "ENTER") handleKey("ENTER");
      else if (key === "BACKSPACE") handleKey("BACKSPACE");
      else if (/^[A-Z]$/.test(key)) handleKey(key);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleKey]);

  const newGame = useCallback(() => {
    setIsLoading(true);
    setGuesses([]);
    setCurrentGuess("");
    setCurrentRow(0);
    setGameOver(false);
    setGameWon(false);
    setKeyStates({});
    setShakeRow(-1);
    setRevealRow(-1);
    setBounceRow(-1);
    setMessage("");
    fetchRandomWord().then((word) => {
      setSolution(word);
      setIsLoading(false);
      console.log("Solution:", word);
    });
  }, []);

  // Build display grid
  const grid: TileData[][] = [];
  for (let i = 0; i < 6; i++) {
    if (i < guesses.length) {
      grid.push(guesses[i]);
    } else if (i === currentRow) {
      const row: TileData[] = [];
      for (let j = 0; j < 5; j++) {
        row.push({
          letter: currentGuess[j] || "",
          state: "tbd",
        });
      }
      grid.push(row);
    } else {
      grid.push(Array(5).fill({ letter: "", state: "empty" }));
    }
  }

  return {
    grid,
    keyStates,
    handleKey,
    gameOver,
    gameWon,
    shakeRow,
    revealRow,
    bounceRow,
    message,
    isLoading,
    newGame,
    currentGuess,
  };
}
