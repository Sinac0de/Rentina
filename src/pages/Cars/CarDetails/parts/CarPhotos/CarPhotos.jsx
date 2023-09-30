import { useEffect, useState } from "react";
import GalleryIcon from "src/assets/Icons/GalleryIcon";

const CarPhotos = ({ photos }) => {
  const [activeImg, setActiveImg] = useState({ id: 1, src: photos[0].src });
  const [isLoaded, setIsLoaded] = useState([
    { id: 1, load: false },
    { id: 2, load: false },
    { id: 3, load: false },
  ]);

  /* === Handlers === */

  /* ---Active image handler--- */
  const activeImgHandler = (e) => {
    setActiveImg({ id: e.target.id, src: e.target.src });
  };

  /* --- Show Loaded images --- */
  const handleLoadImages = (id) => {
    const imageIndex = isLoaded.findIndex((item) => item.id === id);
    const prev = [...isLoaded];
    prev[imageIndex].load = true;
    setIsLoaded(prev);
  };

  return (
    <div className="flex flex-col gap-6 h-full lg:w-1/2">
      {/* ===Big image=== */}
      <img
        src={activeImg.src}
        className={` ${
          !isLoaded[activeImg.id - 1].load ? "hidden" : "block"
        } w-full min-h-[100px] object-contain rounded-[10px]`}
      />
      {/* --- big skeleton --- */}
      <div
        className={`dark:bg-slate-600 ${
          isLoaded[activeImg.id - 1].load ? "hidden" : "flex"
        } w-full h-56 lg:h-80 xl:h-96 rounded-[10px] bg-white flex justify-center items-center animate-pulse`}
      >
        <GalleryIcon isBig />
      </div>

      {/* ===Small images=== */}
      <div className="grid grid-cols-3 grid-rows-1 w-full gap-5 h-2/5 min-h-[50px] md:flex-1">
        {photos.map((photo) => {
          return (
            <div
              key={photo.id}
              className={`${
                activeImg.id == photo.id
                  ? isLoaded[photo.id - 1].load
                    ? "p-1 border-[3px] border-primary-500"
                    : ""
                  : ""
              }`}
            >
              <img
                id={photo.id}
                src={photo.src}
                className={`h-full w-full object-cover cursor-pointer  ${
                  !isLoaded[photo.id - 1].load ? "hidden" : "block"
                }  object-center rounded-md`}
                onClick={activeImgHandler}
                onLoad={() => handleLoadImages(photo.id)}
              />
              {/* --- small skeleton --- */}
              <div
                className={`${
                  isLoaded[photo.id - 1].load ? "hidden" : "flex"
                } h-14 md:h-20 lg:h-[99px] xl:h-28 w-full flex justify-center items-center rounded-md animate-pulse`}
              >
                <div className="dark:bg-slate-600 bg-white py-5 w-full h-full flex justify-center items-center rounded-[10px]">
                  <GalleryIcon />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CarPhotos;
