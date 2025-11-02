import { Link } from "react-router";
import ArrowLeft from "src/assets/Icons/ArrowLeft";

const PrivacyPolicy = () => {
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
              Privacy Policy
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Your privacy is important to us
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                This Privacy Policy describes how Rentina ({`"`}we{`"`}, {`"`}
                our{`"`}, or {`"`}us{`"`}) collects, uses, and shares your
                personal information when you use our website and services.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8">
                Information We Collect
              </h2>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
                Personal Information
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                When you register for an account or use our services, we may
                collect:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Name and contact information</li>
                <li>Email address and phone number</li>
                <li>Address and billing information</li>
                <li>Driver{`'`}s license information</li>
                <li>Payment information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
                Usage Information
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                We automatically collect information about your interaction with
                our services, including:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website and search terms</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8">
                How We Use Your Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Provide and improve our services</li>
                <li>Process your reservations and payments</li>
                <li>Communicate with you about your account and bookings</li>
                <li>Send you promotional offers and updates</li>
                <li>Personalize your experience</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8">
                Information Sharing
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                We do not sell or rent your personal information to third
                parties. We may share your information with:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  Service providers who assist us in operating our business
                </li>
                <li>
                  Law enforcement or regulatory authorities when required by law
                </li>
                <li>Third parties in connection with a business transaction</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8">
                Data Security
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8">
                Your Rights
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                You have the right to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Withdraw consent for data processing</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8">
                Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                If you have any questions about this Privacy Policy, please
                contact us at sinacodes@gmail.com.
              </p>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Last Updated:</strong> November 3, 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
