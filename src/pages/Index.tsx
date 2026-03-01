import { useWordle } from "@/hooks/useWordle";
import { WordleGrid } from "@/components/WordleGrid";
import { WordleKeyboard } from "@/components/WordleKeyboard";
import { RotateCcw } from "lucide-react";

const Index = () => {
  const {
    grid,
    keyStates,
    handleKey,
    gameOver,
    shakeRow,
    revealRow,
    bounceRow,
    message,
    isLoading,
    newGame,
    currentGuess,
  } = useWordle();

  // Derive currentRow from grid state
  const currentRow = grid.findIndex((row) =>
    row.some((t) => t.state === "tbd" || t.state === "empty")
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-background select-none">
      {/* Header */}
      <header className="w-full border-b border-border py-3 px-4 flex items-center justify-center relative">
        <h1 className="text-3xl font-bold tracking-[0.2em] text-foreground">
          WORDLE
        </h1>
        {gameOver && (
          <button
            onClick={newGame}
            className="absolute right-4 p-2 rounded-full hover:bg-secondary transition-colors text-foreground"
            title="New Game"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}
      </header>

      {/* Message toast */}
      <div className="h-8 mt-2 flex items-center justify-center">
        {message && (
          <div className="bg-foreground text-background px-4 py-1 rounded font-bold text-sm">
            {message}
          </div>
        )}
        {isLoading && (
          <div className="text-muted-foreground text-sm">Loading...</div>
        )}
      </div>

      {/* Game board */}
      <div className="flex-1 flex items-center justify-center py-4">
        <WordleGrid
          grid={grid}
          shakeRow={shakeRow}
          revealRow={revealRow}
          bounceRow={bounceRow}
          currentRow={currentRow >= 0 ? currentRow : 6}
        />
      </div>

      {/* Keyboard */}
      <div className="pb-4">
        <WordleKeyboard onKey={handleKey} keyStates={keyStates} />
      </div>
    </div>
  );
};

export default Index;
