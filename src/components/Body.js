import { useState, useEffect, useContext } from "react";
import { RestrauntList } from "../config";
import RestrauntCard from "./RestraurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
// import UserContext from "../utils/UserContext";

function filterData(searchText, restaurants) {
  const filterData = restaurants.filter((restaurant) =>
    restaurant?.info?.name?.toLowerCase()?.includes(searchText.toLowerCase())
  );
  return filterData;
}

const Body = () => {
  const [searchText, setSearchText] = useState(""); //To create state variable
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  // const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.591945&lng=73.73897649999999&page_type=DESKTOP_WEB_LISTING"
      // "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.424405572480765&lng=77.03483765383623&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    // console.log("data", json);
    setAllRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  }
  if (!allRestaurants) return null;
  return allRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="mt-20 flex flex-col items-center space-y-6">
        <div className=" mt-3 flex justify-center">
          <input
            type="text"
            className="flex-grow bg-transparent outline-none p-2 mr-2 rounded-md border border-gray-300 focus:border-purple-500"
            placeholder="Search for restaurants..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              const data = filterData(searchText, allRestaurants);
              setFilteredRestaurants(data);
            }}
          />
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md transition duration-200"
            onClick={() => {
              const data = filterData(searchText, allRestaurants);
              setFilteredRestaurants(data);
            }}
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full px-4">
          {filteredRestaurants.map((restaurant) => {
            return (
              <Link
                to={"/restaurant/" + restaurant?.info.id}
                key={restaurant?.info.id}
              >
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <RestrauntCard {...restaurant?.info} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Body;
