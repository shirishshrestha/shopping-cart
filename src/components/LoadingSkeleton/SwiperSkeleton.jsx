import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SwiperSkeleton = () => {
  return (
    <div className="mx-auto">
      <Skeleton height={476} width={470} />
    </div>
  );
};

export default SwiperSkeleton;
