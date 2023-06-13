import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../config";
import useRestaurant from "../utils/useRestaurant";
import Shimmer from "./Shimmer";
import { addItem, clearCart, removeItem } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const RestaurantMenu = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const { resId } = useParams();

  const restaurant = useRestaurant(resId);

  console.log("menu", restaurant);

  const dispatch = useDispatch();
  const addFoodItem = (item) => {
    dispatch(addItem(item));
  };

  const removeItem = (item) => {
    dispatch(removeItem(item));
  };

  return !restaurant ? (
    <Shimmer />
  ) : (
    <div className="">
      <div className="flex align-center justify-around bg-slate-50 m-2">
        <div className="flex">
          <img
            className="h-40"
            src={
              IMG_CDN_URL + restaurant.cards[0].card.card.info.cloudinaryImageId
            }
          />
          <div className="align-center justify-around">
            <h1>{restaurant.cards[0].card.card.info.name}</h1>
            <p>{restaurant.cards[0].card.card.info.cuisines.join(", ")}</p>
            <div className="flex">
              <div>
                {restaurant.cards[0].card.card.info.avgRating >= 4 ? (
                  <div className="bg-green-400 text-xs p-1.5">
                    {`☆  ${restaurant.cards[0].card.card.info.avgRating}`}
                  </div>
                ) : (
                  <div className="bg-orange-600 text-xs p-1.5">
                    {`☆ ${restaurant.cards[0].card.card.info.avgRating}`}
                  </div>
                )}
              </div>
              <div>
                <h3>{restaurant.cards[0].card.card.info.sla.slaString}</h3>
              </div>
              <div>
                <h3>{restaurant.cards[0].card.card.info.costForTwoMessage}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="restaurantmenu-offer">
          <div>
            <h3>OFFER</h3>
            {restaurant?.cards[0].card.card.info.aggregatedDiscountInfo?.descriptionList.map(
              (discount, index) => (
                <p key={index}>
                  {/* <UilTagAlt height="16px" /> &nbsp; */}
                  {discount?.meta}
                </p>
              )
            )}
          </div>
        </div>
      </div>
      <div className="grid justify-center">
        {restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards?.map(
          (item) => (
            <div className="flex">
              <div key={item.card.info.id}>{item.card.info.name}</div>
              <div className="">
                <img
                  className="w-29 h-28 rounded-lg"
                  src={IMG_CDN_URL + item.card.info.imageId}
                />
                <button className="">
                  <div
                    onClick={() =>
                      cartItems[item.card.info?.id]?.length &&
                      removeItem(item.card.info)
                    }
                  >
                    <span>-</span>
                  </div>
                  <div>
                    <span>{cartItems[item.card.info]?.length || 0}</span>
                  </div>
                  <div onClick={() => addFoodItem(item.card.info)}>
                    <span>+</span>
                  </div>
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
