import ProfileIcon from "src/assets/Icons/ProfileIcon";

const SkeletonReview = () => {
  const styles = {
    text: "h-3 mb-1 rounded-full",
    longText: "w-28 bg-primary-300",
    fullText: "dark:bg-slate-500 w-full bg-[#EFF3FD]",
    shortText: "dark:bg-slate-500 w-20 bg-[#EFF3FD]",
  };
  return (
    <div className="flex items-start gap-2">
      <span className="p-2 border rounded-full cursor-pointer">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <ProfileIcon />
        </div>
      </span>
      <div className="flex flex-col gap-3 w-full">
        {/* comment header */}
        <div className="flex justify-between">
          <div className="flex flex-col justify-between">
            <div className={`${styles.text} ${styles.longText}`}></div>
            <div className={`${styles.text} ${styles.shortText}`}></div>
          </div>
          <div className="flex flex-col justify-between items-end pt-1">
            <div className={`${styles.text} ${styles.shortText}`}></div>
            <div>
              <div className={`${styles.text} ${styles.shortText}`}></div>
            </div>
          </div>
        </div>
        {/* comment text */}
        <div>
          <div className={`${styles.text} ${styles.fullText}`}></div>
          <div className={`${styles.text} ${styles.fullText}`}></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonReview;
