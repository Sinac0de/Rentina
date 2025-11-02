import { Link } from "react-router";
import ArrowLeft from "src/assets/Icons/ArrowLeft";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 mb-8"
        >
          <span className="flex items-center">
            <ArrowLeft />
            <span className="ml-2">Back to Home</span>
          </span>
        </Link>
        
        <div className="bg-white dark:bg-slate-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-slate-700">
            <h1 className="text-3xl font-bold leading-6 text-gray-900 dark:text-white">
              About Rentina
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Learn more about our company and mission
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                Welcome to Rentina, your trusted partner in car rental services. Our vision is to provide convenience and help increase your sales business through innovative solutions and exceptional customer service.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8">Our Mission</h2>
              <p className="text-gray-700 dark:text-gray-300">
                At Rentina, we strive to revolutionize the car rental industry by offering seamless, reliable, and affordable rental solutions. We believe in making transportation accessible to everyone while maintaining the highest standards of quality and customer satisfaction.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8">Why Choose Us</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Wide selection of well-maintained vehicles</li>
                <li>Competitive pricing with transparent fees</li>
                <li>Easy online booking process</li>
                <li>24/7 customer support</li>
                <li>Flexible rental terms</li>
                <li>Commitment to safety and sustainability</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8">Our Story</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Founded in 2020, Rentina began with a simple idea: to make car rentals easier and more convenient for everyone. What started as a small local service has grown into a trusted platform serving thousands of customers across the region. Our team of dedicated professionals works tirelessly to ensure every customer has a smooth and enjoyable experience.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8">Looking Forward</h2>
              <p className="text-gray-700 dark:text-gray-300">
                As we continue to grow, we remain committed to our core values of integrity, innovation, and customer satisfaction. We{`'`}re constantly exploring new technologies and partnerships to enhance our services and expand our reach, always with the goal of providing the best possible experience for our customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;