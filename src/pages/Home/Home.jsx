import { useEffect, useState } from "react";
import { Link } from "react-router";
import AllCarsList from "src/components/AllCarsList/AllCarsList";
import PickDrop from "src/components/PickDrop/PickDrop";
import Slider from "src/components/Slider/Slider";
import TestimonialsSection from "src/components/TestimonialsSection/TestimonialsSection";
import TrustIndicatorsSection from "src/components/TrustIndicatorsSection/TrustIndicatorsSection";
import ValuePropositionsSection from "src/components/ValuePropositionsSection/ValuePropositionsSection";
import { getFeaturedBlogs } from "src/services/api";
import Hero from "./Parts/Hero";

const Home = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const data = await getFeaturedBlogs();
        setFeaturedBlogs(data || []);
      } catch (error) {
        console.error("Error fetching featured blogs:", error);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchFeaturedBlogs();
  }, []);

  return (
    <div className="px-5 md:px-14 md:pt-8">
      <Hero />
      <PickDrop />

      {/* Recommended cars*/}
      <AllCarsList isCompact={true} hasHeader header="Recommended Cars" />
      <ValuePropositionsSection />
      <TrustIndicatorsSection />
      {/* Content */}
      <div className="my-10">
        {/* Popular cars slider */}
        <div>
          <Slider title={"Popular cars"} />
        </div>

        <TestimonialsSection />

        {/* Featured Blogs */}
        <div className="my-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Featured Blog Posts
            </h2>
            <Link
              to="/blogs"
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              View All Posts
            </Link>
          </div>

          {loadingBlogs ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden animate-pulse"
                >
                  <div className="bg-gray-200 dark:bg-gray-700 h-48 w-full"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBlogs.map((blog) => (
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
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                No featured blog posts yet
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Check back later for updates
              </p>
              <Link
                to="/blogs"
                className="mt-4 inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                Browse All Blog Posts
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
