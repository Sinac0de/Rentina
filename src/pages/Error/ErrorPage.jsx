import { Link, useRouteError } from "react-router";
import ArrowLeft from "src/assets/Icons/ArrowLeft";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-extrabold text-red-600 dark:text-red-500">
            Oops!
          </h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Something went wrong
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            We are sorry, an unexpected error occurred.
          </p>

          {/* Development error details */}
          {import.meta.env.DEV && error && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
              <p className="text-red-800 dark:text-red-200 font-mono text-sm">
                {error.statusText || error.message}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900"
          >
            Reload Page
          </button>

          <Link
            to="/"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white dark:border-slate-600 dark:hover:bg-slate-700 dark:focus:ring-offset-slate-900"
          >
            <span className="flex items-center">
              <ArrowLeft />
              <span className="ml-2">Back to Home</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
