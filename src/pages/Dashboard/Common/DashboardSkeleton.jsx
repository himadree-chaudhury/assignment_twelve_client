import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="aside-layout p-6">
      <div className="card flex-centric gap-2">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
        <p className="animate-pulse">Wait! Your data is fetching.........</p>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
