import { useEffect, useState } from "react";
import { Link } from "react-router";
import AllCarsList from "src/components/AllCarsList/AllCarsList";
import FAQ from "src/components/FAQ";
import PickDrop from "src/components/PickDrop/PickDrop";
import Slider from "src/components/Slider/Slider";
import TestimonialsSection from "src/pages/Home/Parts/TestimonialsSection/TestimonialsSection";
import TrustIndicatorsSection from "src/pages/Home/Parts/TrustIndicatorsSection/TrustIndicatorsSection";
import ValuePropositionsSection from "src/pages/Home/Parts/ValuePropositionsSection/ValuePropositionsSection";
import { getFeaturedBlogs } from "src/services/api";
import BlogCard from "../../Blogs/BlogCard";
import SkeletonBlogCard from "../../Blogs/SkeletonBlogCard";
import Hero from "./Hero";

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
    <div className="px-5 lg:px-14 lg:pt-8">
      <Hero />
      {/* <PickDrop /> */}

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
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonBlogCard key={index} />
              ))}
            </div>
          ) : featuredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBlogs.slice(0, 3).map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white dark:bg-gray-800  shadow p-8 text-center">
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

        {/* FAQ Section */}
        <FAQ />
      </div>
    </div>
  );
};

export default Home;
