const SkeletonCard = () => (
  <div className="bg-card rounded-xl border border-border p-5 space-y-3">
    <div className="flex gap-2">
      <div className="skeleton-shimmer h-5 w-16" />
      <div className="skeleton-shimmer h-5 w-20" />
    </div>
    <div className="skeleton-shimmer h-6 w-4/5" />
    <div className="skeleton-shimmer h-4 w-full" />
    <div className="skeleton-shimmer h-4 w-3/4" />
    <div className="flex items-center gap-3 pt-2">
      <div className="skeleton-shimmer h-8 w-8 rounded-full" />
      <div className="space-y-1.5 flex-1">
        <div className="skeleton-shimmer h-3 w-28" />
        <div className="skeleton-shimmer h-3 w-20" />
      </div>
    </div>
    <div className="flex gap-4 pt-2 border-t border-border">
      <div className="skeleton-shimmer h-3 w-16" />
      <div className="skeleton-shimmer h-3 w-20" />
      <div className="skeleton-shimmer h-3 w-24 ml-auto" />
    </div>
  </div>
);

export default SkeletonCard;
