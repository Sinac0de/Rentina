import { useRef, useState } from "react";
import Review from "./parts/Review";

const CarReviews = ({ reviews }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  /* ===Handlers=== */
  const toggleReviews = () => {
    setShowAllReviews((prev) => !prev);
    /* --- Smooth transition --- */
    if (!showAllReviews) {
      collapseRef.current.style.maxHeight =
        collapseRef.current.scrollHeight + "px";
    } else {
      collapseRef.current.style.maxHeight = 0;
    }
  };

  const collapseRef = useRef();

  return (
    <div className="dark:text-slate-300 dark:bg-slate-600 bg-white p-5 flex flex-col gap-5 rounded-[10px]">
      {/* header */}
      <div className="flex gap-2 items-center">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <span className="dark:text-slate-200 bg-primary-500 py-0 px-5 text-white rounded">
          {reviews.length}
        </span>
      </div>
      {/* comments */}
      <div className="flex flex-col gap-5">
        {reviews.slice(0, 2).map((review, index) => (
          <Review key={index} reviewData={review} />
        ))}
      </div>
      {/*--- Collapse ---*/}
      <div
        className={`flex max-h-0 overflow-hidden flex-col gap-5 transition-[max-height] duration-1000`}
        ref={collapseRef}
      >
        {reviews.slice(2).map((review, index) => (
          <Review key={index} reviewData={review} />
        ))}
      </div>
      {/* footer */}
      <div
        className="flex justify-center items-center gap-1 w-fit mx-auto p-2 px-5 cursor-pointer"
        onClick={toggleReviews}
      >
        <h3 className="text-sm text-secondary-300 font-medium">
          {showAllReviews ? "Hide" : "Show All"}
        </h3>
        <span
          className={`${showAllReviews ? "rotate-180" : ""} transition-all`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.00013 9.79939C6.5918 9.79939 6.18347 9.64189 5.8743 9.33272L2.07097 5.52939C1.9018 5.36022 1.9018 5.08022 2.07097 4.91105C2.24013 4.74189 2.52013 4.74189 2.6893 4.91105L6.49263 8.71439C6.77263 8.99439 7.22763 8.99439 7.50763 8.71439L11.311 4.91105C11.4801 4.74189 11.7601 4.74189 11.9293 4.91105C12.0985 5.08022 12.0985 5.36022 11.9293 5.52939L8.12597 9.33272C7.8168 9.64189 7.40847 9.79939 7.00013 9.79939Z"
              fill="#90A3BF"
              stroke="#90A3BF"
              strokeWidth="0.5"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default CarReviews;
