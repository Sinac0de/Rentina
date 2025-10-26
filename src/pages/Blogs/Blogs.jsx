import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { getBlogs, getBlogCategories } from "../../services/api";
import SkeletonCard from "../../components/CarCard/SkeletonCard";
import Pagination from "../../components/Pagination/Pagination";

const Blogs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const selectedCategory = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getBlogCategories();
        setCategories(data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          page: currentPage,
          pageSize: 12,
        };

        if (selectedCategory) {
          params.category = selectedCategory;
        }

        if (searchQuery) {
          params.search = searchQuery;
        }

        const data = await getBlogs(params);
        setBlogs(data.blogs || []);
        setTotalBlogs(data.total || 0);
        setTotalPages(data.pages || 0);
      } catch (err) {
        setError(err.message || "Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, selectedCategory, searchQuery]);

  const handlePageChange = (page) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (page === 1) {
        newParams.delete("page");
      } else {
        newParams.set("page", page);
      }
      return newParams;
    });
  };

  const handleCategoryChange = (category) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (category) {
        newParams.set("category", category);
      } else {
        newParams.delete("category");
      }
      newParams.delete("page"); // Reset to first page
      return newParams;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("search");

    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (query) {
        newParams.set("search", query);
      } else {
        newParams.delete("search");
      }
      newParams.delete("page"); // Reset to first page
      return newParams;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Car Rental Blog
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Tips, guides, and news about car rentals
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1">
              <input
                type="text"
                name="search"
                placeholder="Search blogs..."
                defaultValue={searchQuery}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              Search
            </button>
          </form>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1 rounded-full text-sm ${
                  !selectedCategory
                    ? "bg-primary-500 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                }`}
                onClick={() => handleCategoryChange("")}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategory === category._id
                      ? "bg-primary-500 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  }`}
                  onClick={() => handleCategoryChange(category._id)}
                >
                  {category._id} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
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
        ) : blogs.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No blogs found
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Try changing your search or filter criteria
            </p>
            <button
              className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              onClick={() => setSearchParams({})}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {blog.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {blog.excerpt || blog.content.substring(0, 150) + "..."}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {blog.author?.avatar ? (
                          <img
                            src={blog.author.avatar}
                            alt={blog.author.name}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                        )}
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                          {blog.author?.name}
                        </span>
                      </div>
                      <Link
                        to={`/blogs/${blog._id}`}
                        className="text-primary-500 hover:text-primary-600 font-medium"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalCount={totalBlogs}
                  pageSize={12}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blogs;
