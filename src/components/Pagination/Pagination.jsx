import { usePagination, DOTS } from "./usePagination";
import ArrowRight from "../Icons/ArrowRight";
import ArrowLeft from "../Icons/ArrowLeft";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const styles = {
    pageItem:
      "flex justify-center items-center text-center w-7 h-7 lg:w-10 lg:h-10 md:text-base text-black text-sm font-semibold cursor-pointer",
    disabled: "cursor-default opacity-40 pointer-events-none",
  };

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={className}>
      <li
        className={`${currentPage === 1 ? styles.disabled : ""} ${
          styles.pageItem
        }`}
        onClick={onPrevious}
      >
        <ArrowLeft />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className={styles.pageItem}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={index}
            className={`${
              pageNumber === currentPage
                ? "bg-primary-500 text-white"
                : "border border-secondary-300"
            }  rounded-md ${styles.pageItem}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <div
        className={`${currentPage === lastPage ? styles.disabled : ""} ${
          styles.pageItem
        }`}
        onClick={onNext}
      >
        <ArrowRight />
      </div>
    </ul>
  );
};

export default Pagination;
