const StorySkeleton = () => {
    return (
      <div className="max-w-sm animate-pulse rounded-lg border border-gray-200 shadow-md">
        {/* Story Image Skeleton */}
        <div className="h-48 w-full rounded-t-lg bg-text-secondary-dark"></div>

        {/* Card Body Skeleton */}
        <div className="p-5">
          {/* Title Skeleton */}
          <div className="mb-2 h-6 w-2/3 rounded bg-text-secondary-dark"></div>

          {/* Marriage Details Skeleton */}
          <div className="mb-2 h-4 w-1/2 rounded bg-text-secondary-dark"></div>
          <div className="mb-2 h-4 w-1/2 rounded bg-text-secondary-dark"></div>

          {/* Story Description Skeleton */}
          <div className="mb-4 space-y-2">
            <div className="h-4 w-full rounded bg-text-secondary-dark"></div>
            <div className="h-4 w-5/6 rounded bg-text-secondary-dark"></div>
            <div className="h-4 w-4/5 rounded bg-text-secondary-dark"></div>
          </div>

          {/* Read More Link Skeleton */}
          <div className="h-5 w-1/4 rounded bg-text-secondary-dark"></div>
        </div>
      </div>
    );
};
export default StorySkeleton;