import StarFilledIcon from "../../assets/Icons/StarFilledIcon";
import StarOutlineIcon from "../../assets/Icons/StarOutlineIcon";

const RatingStars = ({ isBig = false }) => {
  return (
    <div className="flex gap-1 items-center">
      <StarFilledIcon isBig={isBig} />
      <StarFilledIcon isBig={isBig} />
      <StarFilledIcon isBig={isBig} />
      <StarFilledIcon isBig={isBig} />
      <StarOutlineIcon isBig={isBig} />
    </div>
  );
};

export default RatingStars;
