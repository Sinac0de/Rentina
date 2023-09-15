import { useEffect, useState } from "react";

const CarPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [activeImg, setActiveImg] = useState({ id: 1, src: "" });

  const activeImgHandler = (e) => {
    setActiveImg({ id: e.target.id, src: e.target.src });
  };

  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/Sinac0de/Rentina_db_server/cars/1"
    )
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data.img_urls);
        setActiveImg(data.img_urls[0]);
      });
  }, []);

  if (!photos.length) {
    // !todo add skeleton loading
    return <h2>loading...</h2>;
  }

  return (
    <div className="flex flex-col gap-6 h-full lg:w-1/2">
      <img src={activeImg.src} className="w-full object-contain" />
      <div className="grid grid-cols-3 grid-rows-1 w-full gap-5 h-2/5 md:flex-1">
        {/* active image */}
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

  // -----------photos-----------
  // return (
  //   <div className="flex flex-col gap-6 h-full lg:w-1/2">
  //     <img src={photos[0].src} className="w-full object-contain" />
  //     <div className="grid grid-cols-3 grid-rows-1 w-full gap-5 h-2/5 md:flex-1">
  //       {/* active image */}
  //       <div id="img1" className={`cursor-pointer`}>
  //         <img
  //           src={photos[0].src}
  //           className="h-full w-full object-cover object-center rounded-md"
  //           onClick={activeImgHandler}
  //         />
  //       </div>

  //       <div id="img2" className={`cursor-pointer`}>
  //         <img
  //           src={photos[1].src}
  //           className="h-full w-full object-cover object-center rounded-md"
  //           onClick={activeImgHandler}
  //         />
  //       </div>

  //       <div id="img3" className={`cursor-pointer`}>
  //         <img
  //           src={photos[2].src}
  //           className="h-full w-full object-cover object-center rounded-md"
  //           onClick={activeImgHandler}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );

  // assets/teest

  // return (
  //   <div className="flex flex-col gap-6 h-full lg:w-1/2">
  //     <img src={activeImg.src} className="w-full object-contain" />
  //     <div className="grid grid-cols-3 grid-rows-1 w-full gap-5 h-2/5 md:flex-1">
  //       {/* active image */}
  //       <div
  //         id="img1"
  //         className={`cursor-pointer ${
  //           activeImg.id == "img1"
  //             ? "p-1 border-[1.5px] border-primary-500 rounded-lg"
  //             : ""
  //         }`}
  //       >
  //         <img
  //           src={photos[0]}
  //           className="h-full w-full object-cover object-center rounded-md"
  //           onClick={activeImgHandler}
  //         />
  //       </div>

  //       <div
  //         id="img2"
  //         className={`cursor-pointer ${
  //           activeImg.id == "img2"
  //             ? "p-1 border-[1.5px] border-primary-500 rounded-lg"
  //             : ""
  //         }`}
  //       >
  //         <img
  //           src={photos[1]}
  //           className="h-full w-full object-cover object-center rounded-md"
  //           onClick={activeImgHandler}
  //         />
  //       </div>

  //       <div
  //         id="img3"
  //         className={`cursor-pointer ${
  //           activeImg.id == "img3"
  //             ? "p-1 border-[1.5px] border-primary-500 rounded-lg"
  //             : ""
  //         }`}
  //       >
  //         <img
  //           src={photos[2]}
  //           className="h-full w-full object-cover object-center rounded-md"
  //           onClick={activeImgHandler}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default CarPhotos;
