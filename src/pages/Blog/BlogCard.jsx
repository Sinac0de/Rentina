import { Link } from "react-router";

const BlogCard = ({ blog }) => {
  const { _id, image, title, content, category, excerpt } = blog;
  return (
    <div
      key={_id}
      className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
    >
      {image ? (
        <Link
          to={`/blog/${_id}`}
          className="text-primary-500 hover:text-primary-600 font-medium"
        >
          <img src={image} alt={title} className="w-full h-48 object-cover" />
        </Link>
      ) : (
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
      )}
      <div className="p-6">
        <div></div>
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            {category}
          </span>
        </div>
        <Link to={`/blog/${_id}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
        </Link>

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {excerpt || content.substring(0, 150) + "..."}
        </p>
        <div className="flex items-end justify-between">
          <Link
            to={`/blog/${_id}`}
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
