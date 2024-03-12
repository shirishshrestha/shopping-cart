import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

/**
 * Component that represents a skeleton loading effect for a grid of items.
 *
 * @returns {JSX.Element} - The JSX element representing the item skeleton.
 */
const ItemSkeleton = () => {
  return (
    <div className="grid grid-cols-4 mx-auto justify-center items-center gap-[3.7rem] ds:grid-cols-3 ds:gap-[3rem] lp:grid-cols-2  lp:gap-x-[8.8rem] mb:grid-cols-1">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-start gap-3.5"
        >
          <Skeleton width={300} height={288} />

          <div className="flex flex-col items-center justify-start  gap-[9px]">
            <Skeleton width={150} height={10} style={{ margin: "auto" }} />
            <Skeleton width={150} height={10} style={{ margin: "auto" }} />

            <div className="grid grid-cols-2  gap-[2rem]">
              <Skeleton width={100} height={10} style={{ margin: "auto" }} />

              <div className="flex gap-[0.5rem]">
                <Skeleton width={100} height={10} style={{ margin: "auto" }} />
              </div>
            </div>
          </div>

          <Skeleton width={200} height={60} style={{ margin: "auto" }} />
        </div>
      ))}
    </div>
  );
};

export { ItemSkeleton };
