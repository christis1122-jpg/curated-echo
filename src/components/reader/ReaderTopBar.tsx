import { ArrowLeft, Bookmark, BookmarkCheck, Share2, WifiOff, Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ReaderTopBarProps {
  progress: number;
  timeRemaining: string;
  bookmarked: boolean;
  onToggleBookmark: () => void;
  offline?: boolean;
}

const ReaderTopBar = ({ progress, timeRemaining, bookmarked, onToggleBookmark, offline }: ReaderTopBarProps) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between px-4 py-2.5 max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors text-foreground"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex-1 mx-4">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-1">
            <span>{Math.round(progress)}%</span>
            <span>·</span>
            <span>{timeRemaining} left</span>
            {offline !== undefined && (
              <>
                <span>·</span>
                {offline ? (
                  <WifiOff size={12} className="text-destructive" />
                ) : (
                  <Wifi size={12} className="text-accent-foreground" />
                )}
              </>
            )}
          </div>
          <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onToggleBookmark}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {bookmarked ? (
              <BookmarkCheck size={20} className="text-primary fill-primary" />
            ) : (
              <Bookmark size={20} className="text-muted-foreground" />
            )}
          </button>
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default ReaderTopBar;
