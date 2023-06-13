import { IMG_CDN_URL } from "../config";
import { useContext } from "react";
// import UserContext from "../utils/UserContext";

const RestrauntCard = ({
  name,
  cuisines,
  cloudinaryImageId,
  avgRating,
  slaString,
  costForTwoString,
}) => {
  // const { user } = useContext(UserContext);
  return (
    <div className="w-64 h-auto m-8 p-2 hover:shadow-2xl align-between">
      <img src={IMG_CDN_URL + cloudinaryImageId} />
      <div className="mt-5">
        <h1 className="font-bold">{name}</h1>
        <h2>{cuisines.join(", ")}</h2>
      </div>
      <div className="flex justify-between mt-5">
        {avgRating >= 4 ? (
          <div className="bg-green-400 text-xs p-1.5">{`☆ ${avgRating}`}</div>
        ) : (
          <div className="bg-orange-600 text-xs p-1.5">{`☆ ${avgRating}`}</div>
        )}
        <h3 className="text-xs">{slaString}</h3>
        <h3 className="text-xs">{costForTwoString}</h3>
      </div>
    </div>
  );
};
export default RestrauntCard;
