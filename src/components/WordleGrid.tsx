import { TileData, LetterState } from "@/hooks/useWordle";

interface WordleGridProps {
  grid: TileData[][];
  shakeRow: number;
  revealRow: number;
  bounceRow: number;
  currentRow: number;
}

function getTileColorClass(state: LetterState): string {
  switch (state) {
    case "correct":
      return "bg-wordle-green border-wordle-green";
    case "present":
      return "bg-wordle-yellow border-wordle-yellow";
    case "absent":
      return "bg-wordle-gray border-wordle-gray";
    default:
      return "";
  }
}

export function WordleGrid({ grid, shakeRow, revealRow, bounceRow, currentRow }: WordleGridProps) {
  return (
    <div className="flex flex-col items-center gap-[5px]">
      {grid.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className={`flex gap-[5px] ${shakeRow === rowIdx ? "tile-shake" : ""}`}
        >
          {row.map((tile, colIdx) => {
            const isRevealing = revealRow === rowIdx && (tile.state === "correct" || tile.state === "present" || tile.state === "absent");
            const isBouncing = bounceRow === rowIdx;
            const hasLetter = tile.letter !== "";
            const isCurrentRow = rowIdx === currentRow;
            const justTyped = isCurrentRow && hasLetter;

            return (
              <div
                key={colIdx}
                className={`
                  w-[62px] h-[62px] flex items-center justify-center
                  text-[2rem] font-bold uppercase select-none
                  border-2
                  ${tile.state === "empty" || tile.state === "tbd"
                    ? hasLetter
                      ? "border-wordle-tile-active text-foreground"
                      : "border-wordle-tile-border text-foreground"
                    : `${getTileColorClass(tile.state)} text-foreground`
                  }
                  ${isRevealing ? "tile-flip" : ""}
                  ${isBouncing ? "tile-bounce" : ""}
                  ${justTyped ? "tile-pop" : ""}
                `}
                style={{
                  animationDelay: isRevealing
                    ? `${colIdx * 300}ms`
                    : isBouncing
                    ? `${colIdx * 100}ms`
                    : "0ms",
                }}
              >
                {tile.letter}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
