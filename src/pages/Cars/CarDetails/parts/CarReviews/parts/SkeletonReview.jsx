import ProfileIcon from "src/assets/Icons/ProfileIcon";

const SkeletonReview = () => {
  return (
    <div className="flex items-start gap-2">
      <span className="p-2 border rounded-full cursor-pointer">
        <ProfileIcon />
      </span>
      <div className="flex flex-col gap-3 w-full">
        {/* comment header */}
        <div className="flex justify-between">
          <div className="flex flex-col justify-between">
            <div className="w-28 h-3 bg-primary-300 mb-1 rounded-full"></div>
            <div className="w-20 h-3 bg-[#EFF3FD] mb-1 rounded-full"></div>
          </div>
          <div className="flex flex-col justify-between items-end pt-1">
            <div className="w-20 h-3 bg-[#EFF3FD] mb-1 rounded-full"></div>
            <div>
              <div className="w-20 h-3 bg-[#EFF3FD] mb-1 rounded-full"></div>
            </div>
          </div>
        </div>
        {/* comment text */}
        <div>
          <div className="w-full h-3 bg-[#EFF3FD] mb-1 rounded-full"></div>
          <div className="w-full h-3 bg-[#EFF3FD] mb-1 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonReview;
