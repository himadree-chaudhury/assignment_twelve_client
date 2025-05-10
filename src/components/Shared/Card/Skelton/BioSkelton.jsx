const BioSkelton = () => {
  return (
    <div className="border-text-secondary-dark max-w-sm animate-pulse rounded-lg border shadow-md">
      {/* Profile Image Skeleton */}
      <div className="bg-text-secondary-dark h-48 w-full rounded-t-lg"></div>

      {/* Card Body Skeleton */}
      <div className="p-5">
        {/* Name and Premium Badge Skeleton */}
        <div className="mb-2 flex items-center justify-between">
          <div className="bg-text-secondary-dark h-6 w-3/4 rounded"></div>
          <div className="bg-text-secondary-dark h-5 w-16 rounded"></div>
        </div>

        {/* Biodata Details Skeleton */}
        <ul className="space-y-2 text-sm">
          <li className="bg-text-secondary-dark h-4 w-2/3 rounded"></li>
          <li className="bg-text-secondary-dark h-4 w-1/2 rounded"></li>
          <li className="bg-text-secondary-dark h-4 w-1/3 rounded"></li>
          <li className="bg-text-secondary-dark h-4 w-2/3 rounded"></li>
          <li className="bg-text-secondary-dark h-4 w-1/2 rounded"></li>
        </ul>

        {/* Description Skeleton */}
        <div className="mt-3 space-y-2">
          <div className="bg-text-secondary-dark h-4 w-full rounded"></div>
          <div className="bg-text-secondary-dark h-4 w-5/6 rounded"></div>
        </div>

        {/* View Details Button Skeleton */}
        <div className="bg-text-secondary-dark mt-4 h-10 w-full rounded"></div>
      </div>
    </div>
  );
};
export default BioSkelton;
