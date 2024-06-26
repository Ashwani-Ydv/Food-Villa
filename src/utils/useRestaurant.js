import { useState, useEffect } from "react";
import { FETCH_MENU_URL } from "../config";
import { restaurantData } from '../mock/data '

const useRestaurant = (resId) => {
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    // const data = await fetch(
    //   `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.65420&lng=77.23730&restaurantId=${resId}`

    //   // `https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=${resId}&submitAction=ENTER`
    // );
    // const json = await data.json();
    // console.log("res menu", json);
    console.log("restaurantData", restaurantData);
    setRestaurant(restaurantData);
  }

  return restaurant;
};

export default useRestaurant;
