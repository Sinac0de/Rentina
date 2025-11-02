import { Link } from "react-router";
import heroCarImageUrl from "src/assets/images/Cars/Nissan_GT-R.png";
import circlePatternUrl from "src/assets/images/Patterns/circularPattern.png";

const Hero = () => {
  return (
    <section className="relative my-10 lg:my-0 py-16 lg:py-24 overflow-hidden rounded-2xl">
      {/* Background pattern */}
      <div className="absolute inset-0 z-10">
        <img
          src={circlePatternUrl}
          alt="Background pattern"
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 dark:from-blue-800 dark:via-blue-900 dark:to-indigo-950 opacity-90"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content section */}
          <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              The Best Platform for
              <br />
              <span className="text-secondary-800 dark:text-secondary-300">
                Car Rental
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto lg:mx-0">
              Experience effortless car rental with our wide selection of
              vehicles, competitive pricing, and exceptional customer service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/cars"
                className="bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Browse Cars
              </Link>
              <Link
                to="/blog"
                className="bg-white hover:bg-gray-100 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Blogs
              </Link>
            </div>
          </div>

          {/* Image section */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <img
                src={heroCarImageUrl}
                alt="Luxury sports car"
                className="w-full lg:scale-125 drop-shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500"
              />
              {/* Badge */}
              <div className="absolute -top-4 -right-0 lg:-top-4 lg:-right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
                Hot Deal
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
