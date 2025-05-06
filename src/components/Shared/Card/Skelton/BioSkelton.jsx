const BioSkelton = () => {
  return (
    <div className="max-w-sm animate-pulse rounded-lg border border-text-secondary-dark shadow-md">
      {/* Profile Image Skeleton */}
      <div className="h-48 w-full rounded-t-lg bg-text-secondary-dark"></div>

      {/* Card Body Skeleton */}
      <div className="p-5">
        {/* Name and Premium Badge Skeleton */}
        <div className="mb-2 flex items-center justify-between">
          <div className="h-6 w-3/4 rounded bg-text-secondary-dark"></div>
          <div className="h-5 w-16 rounded bg-text-secondary-dark"></div>
        </div>

        {/* Biodata Details Skeleton */}
        <ul className="space-y-2 text-sm">
          <li className="h-4 w-2/3 rounded bg-text-secondary-dark"></li>
          <li className="h-4 w-1/2 rounded bg-text-secondary-dark"></li>
          <li className="h-4 w-1/3 rounded bg-text-secondary-dark"></li>
          <li className="h-4 w-2/3 rounded bg-text-secondary-dark"></li>
          <li className="h-4 w-1/2 rounded bg-text-secondary-dark"></li>
        </ul>

        {/* Description Skeleton */}
        <div className="mt-3 space-y-2">
          <div className="h-4 w-full rounded bg-text-secondary-dark"></div>
          <div className="h-4 w-5/6 rounded bg-text-secondary-dark"></div>
        </div>

        {/* View Details Button Skeleton */}
        <div className="mt-4 h-10 w-full rounded bg-text-secondary-dark"></div>
      </div>
    </div>
  );
};
export default BioSkelton;
