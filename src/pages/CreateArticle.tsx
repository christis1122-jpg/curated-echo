import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Image, Link, Bold, Italic, List, Send } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const categories = ["Philosophy", "Science", "Technology", "Psychology", "Literature", "Culture"];

const CreateArticle = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handlePublish = () => {
    if (!title.trim()) {
      toast.error("Please add a title");
      return;
    }
    if (!body.trim()) {
      toast.error("Please add some content");
      return;
    }
    toast.success("Article published!");
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors text-foreground">
            <ArrowLeft size={20} />
          </button>
          <span className="text-sm font-semibold text-foreground">New Article</span>
          <button
            onClick={handlePublish}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Send size={14} />
            Publish
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article title..."
          className="w-full text-2xl font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground text-foreground"
        />

        {/* Category Pills */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary text-secondary-foreground border-border hover:bg-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Formatting Toolbar */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary/50 border border-border w-fit">
          {[Bold, Italic, List, Image, Link].map((Icon, i) => (
            <button key={i} className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <Icon size={16} />
            </button>
          ))}
        </div>

        {/* Body */}
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Start writing your article..."
          className="w-full min-h-[50vh] bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground leading-relaxed"
        />
      </div>
    </motion.div>
  );
};

export default CreateArticle;
