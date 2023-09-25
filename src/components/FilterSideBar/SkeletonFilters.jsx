const SkeletonFilters = () => {
  return (
    <>
      <div>
        {/* ---Types--- */}
        <h3 className="text-xs text-secondary-300 tracking-widest">TYPE</h3>
        {/* checkboxes */}
        <ul className="flex flex-col gap-4 text-xl my-5 mb-10">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="animate-pulse flex flex-row gap-2" key={index}>
              <div className="w-4 h-4 rounded-full bg-primary-300"></div>
              <div className="w-28 h-4 rounded-full bg-primary-300"></div>
            </div>
          ))}
        </ul>
      </div>
      {/* ---Seatings--- */}
      <div>
        <h3 className="text-xs text-secondary-300 tracking-widest">SEATING</h3>
        {/* checkboxes */}
        <ul className="flex flex-col gap-4 text-xl my-5 mb-10">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="animate-pulse flex flex-row gap-2" key={index}>
              <div className="w-4 h-4 rounded-full bg-primary-300"></div>
              <div className="w-28 h-4 rounded-full bg-primary-300"></div>
            </div>
          ))}
        </ul>
      </div>
      {/* ---Price--- */}
      <div>
        <h3 className="text-xs text-secondary-300 tracking-widest">PRICE</h3>
        <div className="my-5 mb-10">
          <div className="animate-pulse flex flex-col gap-2">
            <div className="w-full h-4 rounded-full bg-secondary-300"></div>
            <div className="w-1/3 h-4 rounded-full bg-secondary-300"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonFilters;
