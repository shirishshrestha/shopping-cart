import { queryClient } from "../../Utils/Query/Query";

/**
 * Pagination component for navigating through product pages.
 *
 * @param {Object} props - Component properties.
 * @param {number} props.pagination - Total number of pages.
 * @param {number[]} props.pagesArray - Array representing the available page numbers.
 * @param {function} props.setSkipData - Function to update the skip data for fetching products.
 * @param {number} props.skipData - Current skip data for fetching products.
 * @returns {JSX.Element} - The JSX element representing the pagination component.
 */
const Pagination = ({ pagination, pagesArray, setSkipData, skipData }) => {
  
  /**
   * Handles the click event for a pagination button, updating the skip data and invalidating the "products" query.
   *
   * @param {number} index - The index of the clicked pagination button.
   */
  const onPaginationClick = (index) => {
    setSkipData(index * 12);
    queryClient.invalidateQueries("products", skipData);
  };
  return (
    <div className="flex gap-[1rem] mt-[1.5rem] mb:flex-wrap mb:justify-center">
      {pagination > 2 &&
        pagesArray.map((page, index) => (
          <div
            className="cursor-pointer bg-gray-800 p-[1rem] rounded-lg text-white-A700"
            key={index}
            onClick={() => onPaginationClick(index)}
          >
            {page}
          </div>
        ))}
    </div>
  );
};

export { Pagination };
