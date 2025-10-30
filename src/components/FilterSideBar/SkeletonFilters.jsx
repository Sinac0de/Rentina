const SkeletonFilters = () => {
  return (
    <div className="space-y-6">
      {/* Category Skeleton */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex justify-between items-center w-full py-3">
          <div className="h-5 bg-slate-300 rounded animate-pulse w-1/3"></div>
          <div className="h-5 w-5 bg-slate-300 rounded-full animate-pulse"></div>
        </div>
        <div className="mt-2 space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="h-4 w-4 rounded bg-slate-300 animate-pulse"></div>
              <div className="h-4 flex-1 rounded bg-slate-300 animate-pulse"></div>
              <div className="h-4 w-8 rounded-full bg-slate-300 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Make Skeleton */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex justify-between items-center w-full py-3">
          <div className="h-5 bg-slate-300 rounded animate-pulse w-1/3"></div>
          <div className="h-5 w-5 bg-slate-300 rounded-full animate-pulse"></div>
        </div>
        <div className="mt-2 space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="h-4 w-4 rounded bg-slate-300 animate-pulse"></div>
              <div className="h-4 flex-1 rounded bg-slate-300 animate-pulse"></div>
              <div className="h-4 w-8 rounded-full bg-slate-300 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Skeleton */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex justify-between items-center w-full py-3">
          <div className="h-5 bg-slate-300 rounded animate-pulse w-1/3"></div>
          <div className="h-5 w-5 bg-slate-300 rounded-full animate-pulse"></div>
        </div>
        <div className="mt-3 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-2/5">
              <div className="h-4 bg-slate-300 rounded animate-pulse mb-2 w-1/3"></div>
              <div className="h-10 bg-slate-300 rounded animate-pulse"></div>
            </div>
            <div className="h-4 w-4 bg-slate-300 rounded animate-pulse"></div>
            <div className="w-2/5">
              <div className="h-4 bg-slate-300 rounded animate-pulse mb-2 w-1/3"></div>
              <div className="h-10 bg-slate-300 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="pt-2">
            <div className="h-2 bg-slate-300 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Specifications Skeleton */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex justify-between items-center w-full py-3">
          <div className="h-5 bg-slate-300 rounded animate-pulse w-1/3"></div>
          <div className="h-5 w-5 bg-slate-300 rounded-full animate-pulse"></div>
        </div>
        <div className="mt-3 space-y-4">
          <div>
            <div className="h-4 bg-slate-300 rounded animate-pulse w-1/4 mb-3"></div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-8 w-16 rounded-full bg-slate-300 animate-pulse"
                ></div>
              ))}
            </div>
          </div>
          <div>
            <div className="h-4 bg-slate-300 rounded animate-pulse w-1/4 mb-3"></div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="h-8 w-20 rounded-full bg-slate-300 animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonFilters;
