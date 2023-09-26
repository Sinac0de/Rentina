import GalleryIcon from "src/components/Icons/GalleryIcon";

const SkeletonPhotos = () => {
  return (
    <div className="flex flex-col gap-6 h-full lg:w-1/2 animate-pulse">
      <div className="w-full h-56 lg:h-80  rounded-[10px] bg-white flex justify-center items-center">
        <GalleryIcon isBig />
      </div>
      <div className="grid grid-cols-3 grid-rows-1 w-full gap-5 h-14 md:h-20 lg:h-[99px] md:flex-1">
        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <div
              key={index}
              id={index}
              className="h-full w-full flex justify-center items-center rounded-md p-2 border-[3px] border-white"
            >
              <div className="bg-white py-5 w-full h-full flex justify-center items-center">
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
