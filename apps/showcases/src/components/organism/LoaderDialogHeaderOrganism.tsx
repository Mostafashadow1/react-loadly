import { Badge } from "@/components/ui/badge";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlaybackControls } from "../molecules/PlaybackControlsMolecule";
interface LoaderDialogHeaderProps {
  title: string;
  interfaceName: string;
  totalProps: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
}

export function LoaderDialogHeader({
  title,
  interfaceName,
  totalProps,
  isPlaying,
  onTogglePlay,
  onReset,
}: LoaderDialogHeaderProps) {
  return (
    <DialogHeader className="p-2 sm:p-4 md:p-5 lg:p-6 border-b border-gray-800 bg-linear-to-r from-indigo-500/10 to-purple-500/10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
        <div className="flex-1 min-w-0">
          <DialogTitle className="text-base sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 truncate">
            {title}
          </DialogTitle>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <Badge
              variant="outline"
              className="text-xs sm:text-sm px-1.5 sm:px-2 py-0.5"
            >
              {interfaceName}
            </Badge>
            <Badge
              variant="secondary"
              className="text-xs sm:text-sm px-1.5 sm:px-2 py-0.5"
            >
              {totalProps} Props
            </Badge>
          </div>
        </div>

        <div className="shrink-0">
          <PlaybackControls
            isPlaying={isPlaying}
            onTogglePlay={onTogglePlay}
            onReset={onReset}
          />
        </div>
      </div>
    </DialogHeader>
  );
}
