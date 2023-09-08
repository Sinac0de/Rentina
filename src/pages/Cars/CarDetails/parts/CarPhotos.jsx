import bigImg from "src/assets/images/Cars/test/car-img-1.png";
import smallImg2 from "src/assets/images/Cars/test/car-img-2.png";
import smallImg3 from "src/assets/images/Cars/test/car-img-3.png";
import { useState } from "react";

const CarPhotos = () => {
  const [activeImg, setActiveImg] = useState({ id: 1, src: bigImg });

  const activeImgHandler = (e) => {
    setActiveImg({ id: e.target.parentNode.id, src: e.target.src });
  };

  return (
    <div className="flex flex-col gap-6 h-full lg:w-1/2">
      <img src={activeImg.src} className="w-full object-contain" />
      <div className="grid grid-cols-3 grid-rows-1 w-full gap-5 h-2/5 md:flex-1">
        {/* active image */}
        <div
          id="img1"
          className={`cursor-pointer ${
            activeImg.id == "img1"
              ? "p-1 border-[1.5px] border-primary-500 rounded-lg"
              : ""
          }`}
        >
          <img
            src={bigImg}
            className="h-full w-full object-cover object-center rounded-md"
            onClick={activeImgHandler}
          />
        </div>

        <div
          id="img2"
          className={`cursor-pointer ${
            activeImg.id == "img2"
              ? "p-1 border-[1.5px] border-primary-500 rounded-lg"
              : ""
          }`}
        >
          <img
            src={smallImg2}
            className="h-full w-full object-cover object-center rounded-md"
            onClick={activeImgHandler}
          />
        </div>

        <div
          id="img3"
          className={`cursor-pointer ${
            activeImg.id == "img3"
              ? "p-1 border-[1.5px] border-primary-500 rounded-lg"
              : ""
          }`}
        >
          <img
            src={smallImg3}
            className="h-full w-full object-cover object-center rounded-md"
            onClick={activeImgHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default CarPhotos;
