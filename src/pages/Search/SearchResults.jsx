import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import CarCard from "../../components/CarCard/CarCard";
import SkeletonCard from "../../components/CarCard/SkeletonCard";
import { globalSearch } from "../../services/api";
import BlogCard from "../Blog/BlogCard";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState({ cars: [], blogs: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const performSearch = async () => {
      // Reset results when query changes
      setResults({ cars: [], blogs: [] });

      if (!query || query.trim().length === 0) {
        setLoading(false);
        return;
      }

      // Don't search for very short queries
      if (query.trim().length < 2) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Global search now uses getCars internally for car search
        const data = await globalSearch(query.trim(), 10);

        // Ensure we're only using cars and blogs from the response
        setResults({
          cars: Array.isArray(data.cars) ? data.cars : [],
          blogs: Array.isArray(data.blogs) ? data.blogs : [],
        });
      } catch (err) {
        console.error("Search error:", err);
        setError(err.message || "Failed to perform search");
        setResults({ cars: [], blogs: [] });
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Enter a search term to find cars and blog posts
            </h3>
          </div>
        </div>
      </div>
    );
  }

  if (query.trim().length < 2) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Please enter at least 2 characters to search
            </h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Search Results for &quot;{query}&quot;
          </h1>
          {!loading && !error && (
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Found {results.cars.length} cars and {results.blogs.length} blog
              posts
            </p>
          )}
        </div>

        {loading ? (
          <div className="space-y-12">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Cars
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Blog Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-red-800">Error</h3>
            <p className="mt-2 text-red-600">{error}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Cars Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Cars ({results.cars.length})
                </h2>
                {results.cars.length > 0 && (
                  <Link
                    to={`/cars?search=${encodeURIComponent(query)}`}
                    className="text-primary-500 hover:text-primary-600"
                  >
                    View all cars
                  </Link>
                )}
              </div>
              {results.cars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {results.cars.map((car) => (
                    <CarCard key={car._id} carData={car} />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    No cars found
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Try different search terms
                  </p>
                </div>
              )}
            </div>

            {/* Blogs Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Blog Posts ({results.blogs.length})
                </h2>
                {results.blogs.length > 0 && (
                  <Link
                    to={`/blog?search=${encodeURIComponent(query)}`}
                    className="text-primary-500 hover:text-primary-600"
                  >
                    View all blog posts
                  </Link>
                )}
              </div>
              {results.blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {results.blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    No blog posts found
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Try different search terms
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
