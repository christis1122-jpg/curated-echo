import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyLibrary = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-accent/50 flex items-center justify-center mb-5">
        <BookOpen size={28} className="text-primary" />
      </div>
      <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
        Your library is waiting
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
        Start reading and highlighting articles to build your personal knowledge base. Your notes, highlights, and AI insights will appear here.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        Start Reading
      </button>
    </div>
  );
};

export default EmptyLibrary;
