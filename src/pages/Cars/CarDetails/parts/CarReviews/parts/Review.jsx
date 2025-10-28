import ProfileIcon from "src/assets/Icons/ProfileIcon";
import RatingStars from "src/components/common/RatingStars";

const Review = ({ reviewData }) => {
  const { name, review, Occupation, date, profile_img } = reviewData;

  // Fallback for profile image
  const displayProfileImg = profile_img || "";

  // Fallback for date
  const displayDate = date || "";

  return (
    <div className="flex items-start gap-2">
      <span className="border rounded-full">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          {displayProfileImg ? (
            <img
              src={displayProfileImg}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <ProfileIcon />
            </div>
          )}
        </div>
      </span>
      <div className="flex flex-col gap-3 w-full">
        {/* comment header */}
        <div className="flex justify-between">
          <div className="flex flex-col justify-between">
            <h3 className="text-base font-semibold">{name}</h3>
            <h4 className="text-xs text-secondary-300 font-medium">
              {Occupation}
            </h4>
          </div>
          <div className="flex flex-col justify-between items-end pt-1">
            {displayDate && (
              <h4 className="text-xs text-secondary-300 font-medium">
                {displayDate}
              </h4>
            )}
            <div>
              <RatingStars />
            </div>
          </div>
        </div>
        {/* comment text */}
        <p className="text-xs ellipsis font-normal text-secondary-300 leading-6">
          {review}
        </p>
      </div>
    </div>
  );
};

export default Review;
