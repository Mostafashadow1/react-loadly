import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";

interface PlaybackControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
}

export function PlaybackControls({
  isPlaying,
  onTogglePlay,
  onReset,
}: PlaybackControlsProps) {
  return (
    <div className="flex gap-1.5 sm:gap-2">
      <Button
        onClick={onTogglePlay}
        variant="outline"
        size="sm"
        className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        ) : (
          <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        )}
        <span className="hidden sm:inline">{isPlaying ? "Pause" : "Play"}</span>
      </Button>

      <Button
        onClick={onReset}
        variant="outline"
        size="sm"
        className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
      >
        <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Reset</span>
      </Button>
    </div>
  );
}
