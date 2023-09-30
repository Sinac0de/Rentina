import StarPlaceHolder from "src/assets/Icons/StarPlaceHolder";

const SkeletonInfo = () => {
  const styles = {
    text: "h-3 mb-1 rounded-full",
    longText: "dark:bg-slate-500 w-28 h-4 bg-[#EFF3FD] mb-1 rounded-full",
    longBlueText: "w-28 h-4 bg-primary-300 mb-1 rounded-full",
    fullText: "dark:bg-slate-500 w-full h-4 bg-[#EFF3FD] mb-1 rounded-full",
    shortText: "dark:bg-slate-500 w-20 h-4 bg-[#EFF3FD] mb-1 rounded-full",
  };

  return (
    <div className="dark:bg-slate-600 flex flex-col gap-5 bg-white p-4 rounded-[10px] lg:w-1/2 lg:justify-around animate-pulse">
      {/* info header */}
      <div className="flex flex-col gap-1 lg:gap-3">
        <div className="w-32 h-4 bg-primary-300 mb-1 rounded-full"></div>
        <div className="flex gap-2 items-center">
          <StarPlaceHolder isBig />
          <div className={styles.longText}></div>
        </div>
      </div>
      {/* info body */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className={styles.fullText}></div>
          <div className={styles.fullText}></div>
          <div className={styles.fullText}></div>
        </div>

        {/* car specs */}
        <div className="flex justify-between gap-4 items-center flex-wrap lg:gap-5">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center">
              <div className={styles.longText}></div>
              <div className={styles.longBlueText}></div>
            </div>

            <div className="flex justify-between items-center">
              <div className={styles.longText}></div>
              <div className={styles.longBlueText}></div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center">
              <div className={styles.longText}></div>
              <div className={styles.longBlueText}></div>
            </div>

            <div className="flex justify-between items-center">
              <div className={styles.longText}></div>
              <div className={styles.longBlueText}></div>
            </div>
          </div>
        </div>
      </div>
      {/* info footer */}
      <div>
        <div className="flex items-center justify-between gap-2">
          {/* price and discount */}
          <div>
            <div className={styles.longBlueText}></div>
            <div className={styles.shortText}></div>
          </div>
          {/* button */}
          <div className="bg-primary-500 w-20 h-7 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonInfo;
