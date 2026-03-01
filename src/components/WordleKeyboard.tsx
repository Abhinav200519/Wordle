import { KeyState, LetterState } from "@/hooks/useWordle";
import { Delete } from "lucide-react";

interface WordleKeyboardProps {
  onKey: (key: string) => void;
  keyStates: KeyState;
}

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

function getKeyColorClass(state?: LetterState): string {
  switch (state) {
    case "correct":
      return "bg-wordle-green text-foreground";
    case "present":
      return "bg-wordle-yellow text-foreground";
    case "absent":
      return "bg-wordle-gray text-foreground";
    default:
      return "bg-wordle-key-bg text-foreground";
  }
}

export function WordleKeyboard({ onKey, keyStates }: WordleKeyboardProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {ROWS.map((row, rowIdx) => (
        <div key={rowIdx} className="flex gap-[6px]">
          {row.map((key) => {
            const isWide = key === "ENTER" || key === "BACKSPACE";
            return (
              <button
                key={key}
                onClick={() => onKey(key)}
                className={`
                  ${isWide ? "px-3 min-w-[65px]" : "min-w-[43px]"}
                  h-[58px] rounded font-bold text-sm uppercase
                  flex items-center justify-center
                  cursor-pointer select-none
                  transition-colors duration-100
                  ${getKeyColorClass(keyStates[key])}
                `}
              >
                {key === "BACKSPACE" ? <Delete className="w-5 h-5" /> : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
