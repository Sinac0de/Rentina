import { useState } from "react";

const CarPhotos = ({ photos }) => {
  const [activeImg, setActiveImg] = useState({ id: 1, src: photos[0].src });

  const activeImgHandler = (e) => {
    setActiveImg({ id: e.target.id, src: e.target.src });
  };

  return (
    <div className="flex flex-col gap-6 h-full lg:w-1/2">
      <img
        src={activeImg.src}
        className="w-full object-contain rounded-[10px]"
      />
      <div className="grid grid-cols-3 grid-rows-1 w-full gap-5 h-2/5 md:flex-1">
        {photos.map((photo) => {
          return (
            <img
              key={photo.id}
              id={photo.id}
              src={photo.src}
              className={`h-full w-full object-cover cursor-pointer ${
                activeImg.id == photo.id
                  ? "p-1 border-[3px] border-primary-500"
                  : ""
              } object-center rounded-md`}
              onClick={activeImgHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CarPhotos;
