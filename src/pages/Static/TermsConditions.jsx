import { Link } from "react-router";
import ArrowLeft from "src/assets/Icons/ArrowLeft";

const TermsConditions = () => {
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
              Terms & Conditions
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Please read these terms carefully before using our services
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                These Terms and Conditions govern your use of Rentina&apos;s
                website and services. By accessing or using our services, you
                agree to be bound by these terms.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8">
                1. Services
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Rentina provides online car rental services, allowing users to
                browse, select, and reserve vehicles through our platform.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8">
                2. User Responsibilities
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                As a user, you agree to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  Provide accurate and complete information when creating an
                  account
                </li>
                <li>
                  Maintain the confidentiality of your account credentials
                </li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Use our services only for lawful purposes</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8">
                3. Booking and Payment
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                All bookings are subject to availability. You agree to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  Pay all fees and charges associated with your reservation
                </li>
                <li>Provide valid payment information</li>
                <li>Review and accept rental terms at the time of pickup</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8">
                4. Cancellation Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Cancellations are subject to the following terms:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  Full refund for cancellations made more than 48 hours before
                  pickup
                </li>
                <li>
                  50% refund for cancellations made between 24-48 hours before
                  pickup
                </li>
                <li>
                  No refund for cancellations made less than 24 hours before
                  pickup
                </li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8">
                5. Vehicle Use
              </h2>
              <p className="text-gray-700 dark:text-gray-300">You agree to:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  Use the vehicle only for the agreed purpose and duration
                </li>
                <li>Comply with all traffic laws and regulations</li>
                <li>Return the vehicle in the same condition as received</li>
                <li>Not sublet or transfer the vehicle to another party</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8">
                6. Liability
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Rentina is not liable for:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Any indirect, incidental, or consequential damages</li>
                <li>Loss of use, data, or profits</li>
                <li>Third-party claims or disputes</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8">
                7. Modifications
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                We reserve the right to modify these terms at any time.
                Continued use of our services after such modifications
                constitutes acceptance of the new terms.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8">
                8. Governing Law
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                These terms are governed by the laws of [Your Jurisdiction],
                without regard to its conflict of law provisions.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8">
                9. Contact Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                If you have any questions about these Terms and Conditions,
                please contact us at:
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                Email: sinacodes@gmail.com
                <br />
              </p>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Effective Date:</strong> November 3, 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
