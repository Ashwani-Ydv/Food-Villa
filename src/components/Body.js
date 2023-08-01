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

  console.log(searchText);
  console.log(filteredRestaurants);

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const data = await fetch(
      // "https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING"
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.591945&lng=73.73897649999999&page_type=DESKTOP_WEB_LISTING"
      // "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
      // "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&offset=${offset}&sortBy=${sortBy}&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING"
    );
    const json = await data.json();
    setAllRestaurants(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurants(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    // setListOfRestraunt(
    //   json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    // );
    // setFilteredRestaurant(
    //   json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    // );
  }
  if (!allRestaurants) return null;
  return allRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="mt-20 flex justify-center">
        <div className=" mt-3 flex justify-center">
          <input
            type="text"
            className="m-1 bg-slate-100 p-2 rounded-md focus-within:purple border-slate-500 border"
            placeholder="Search"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value); //e.target.value=>whatever you write in input
            }}
          />
          <button
            className="bg-slate-500 text-white rounded-md m-1 w-20"
            onClick={() => {
              //need to filter the data
              const data = filterData(searchText, allRestaurants);
              // update the state - restaurants
              setFilteredRestaurants(data);
            }}
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex w-full flex-wrap justify-center">
        {filteredRestaurants.map((restaurant) => {
          return (
            <Link
              to={"/restaurant/" + restaurant?.info.id}
              key={restaurant?.info.id}
            >
              <RestrauntCard {...restaurant?.info} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Body;
