const SkeletonBlogCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden animate-pulse">
      <div className="bg-gray-200 dark:bg-gray-700 h-52 w-full"></div>
      <div className="p-6">
        <div className="bg-gray-200 dark:bg-gray-700 h-5 w-1/5 rounded-full mb-3"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default SkeletonBlogCard;
