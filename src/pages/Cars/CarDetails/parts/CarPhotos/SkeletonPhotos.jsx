import GalleryIcon from "src/assets/Icons/GalleryIcon";

const SkeletonPhotos = () => {
  return (
    <div className="flex flex-col gap-6 h-full lg:w-1/2 animate-pulse">
      <div className="dark:bg-slate-600 w-full h-56 lg:h-80  rounded-[10px] bg-white flex justify-center items-center">
        <GalleryIcon isBig />
      </div>
      <div className="grid grid-cols-3 grid-rows-1 w-full gap-5 h-14 lg:h-20 lg:h-[99px] lg:flex-1">
        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <div
              key={index}
              id={index}
              className="h-full w-full flex justify-center items-center rounded-md"
            >
              <div className="dark:bg-slate-600 bg-white py-5 w-full h-full flex justify-center items-center rounded-xl">
                <GalleryIcon />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkeletonPhotos;
