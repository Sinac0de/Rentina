import StarFilledIcon from "./Icons/StarFilledIcon";
import StarOutlineIcon from "./Icons/StarOutlineIcon";

const RatingStars = () => {
  return (
    <div className="flex gap-1 items-center">
      <StarFilledIcon />
      <StarFilledIcon />
      <StarFilledIcon />
      <StarFilledIcon />
      <StarOutlineIcon />
    </div>
  );
};

export default RatingStars;
