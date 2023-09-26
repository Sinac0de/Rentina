import SkeletonReview from "./parts/SkeletonReview";

const SkeletonReviews = () => {
  return (
    <div className="bg-white p-5 pb-10 flex flex-col gap-5 rounded-[10px] animate-pulse">
      {/* header */}
      <div className="flex gap-2 items-center">
        <div className="w-28 h-3 bg-primary-300 mb-1 rounded-full"></div>
        <div className="w-3 h-3 bg-primary-400 mb-1 rounded-full"></div>
      </div>
      {/* comments */}
      <div className="flex flex-col gap-5">
        {Array.from({ length: 2 }).map((_, index) => (
          <SkeletonReview key={index} />
        ))}
      </div>
    </div>
  );
};

export default SkeletonReviews;
