import ProfileIcon from "src/components/Icons/ProfileIcon";
import RatingStars from "src/components/common/RatingStars";

const Review = () => {
  return (
    <div className="flex items-start gap-2">
      <div className="w-fit">
        <ProfileIcon />
      </div>
      <div className="flex flex-col gap-3 w-full">
        {/* comment header */}
        <div className="flex justify-between">
          <div className="flex flex-col justify-between">
            <h3 className="text-base font-semibold">Alex Stanton</h3>
            <h4 className="text-xs text-secondary-300 font-medium">
              CEO at Bukalapak
            </h4>
          </div>
          <div className="flex flex-col justify-between items-end pt-1">
            <h4 className="text-xs text-secondary-300 font-medium">
              21 July 2022
            </h4>
            <div>
              <RatingStars />
            </div>
          </div>
        </div>
        {/* comment text */}
        <p className="text-xs ellipsis font-normal text-secondary-300 leading-6">
          We are very happy with the service from the MORENT App. Morent has a
          low price and also a large variety of cars with good and comfortable
          facilities. In addition, the service provided by the officers is also
          very friendly and very polite.
        </p>
      </div>
    </div>
  );
};

export default Review;
