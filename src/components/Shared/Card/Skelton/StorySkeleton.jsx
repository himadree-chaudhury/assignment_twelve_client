const StorySkeleton = () => {
  return (
    <div className="max-w-sm animate-pulse rounded-lg border border-gray-200 shadow-md">
      {/* Story Image Skeleton */}
      <div className="bg-text-secondary-dark h-48 w-full rounded-t-lg"></div>

      {/* Card Body Skeleton */}
      <div className="p-5">
        {/* Title Skeleton */}
        <div className="bg-text-secondary-dark mb-2 h-6 w-2/3 rounded"></div>

        {/* Marriage Details Skeleton */}
        <div className="bg-text-secondary-dark mb-2 h-4 w-1/2 rounded"></div>
        <div className="bg-text-secondary-dark mb-2 h-4 w-1/2 rounded"></div>

        {/* Story Description Skeleton */}
        <div className="mb-4 space-y-2">
          <div className="bg-text-secondary-dark h-4 w-full rounded"></div>
          <div className="bg-text-secondary-dark h-4 w-5/6 rounded"></div>
          <div className="bg-text-secondary-dark h-4 w-4/5 rounded"></div>
        </div>

        {/* Read More Link Skeleton */}
        <div className="bg-text-secondary-dark h-5 w-1/4 rounded"></div>
      </div>
    </div>
  );
};
export default StorySkeleton;
