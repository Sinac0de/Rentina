const Checkbox = ({ id, type, count }) => {
  return (
    <div key={id} className="flex items-center">
      <input
        id={type}
        type="checkbox"
        value=""
        className="w-4 h-4 rounded-lg text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={type}
        className="ml-2 text-sm text-secondary-400 font-semibold"
      >
        {type} <span className="text-secondary-300">({count})</span>
      </label>
    </div>
  );
};

export default Checkbox;
