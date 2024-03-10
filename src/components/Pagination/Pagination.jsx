import { queryClient } from "../../Utils/Query/Query";

const Pagination = ({ pagination, pagesArray, setSkipData, skipData }) => {
  const onPaginationClick = (index) => {
    setSkipData(index * 12);
    queryClient.invalidateQueries("products", skipData);
  };
  return (
    <div className="flex gap-[1rem] mt-[1.5rem]">
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

export default Pagination;
