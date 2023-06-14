import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../config";
import useRestaurant from "../utils/useRestaurant";
import MenuShimmer from "./MenuShimmer";
import { addItem, clearCart, removeItem } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const RestaurantMenu = () => {
  // const [addbtn, setAddBtn] = useState(false);
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
    <MenuShimmer />
  ) : (
    <div className="max-w-screen-md min-h-[90%] mt-0 mx-auto my-auto mb-0">
      <div className="flex justify-between px-4 py-4 pt-9 pb-9 border-solid border-b-2">
        <div className="flex justify-between items-center">
          <img
            className="h-40"
            src={
              IMG_CDN_URL + restaurant.cards[0].card.card.info.cloudinaryImageId
            }
          />
          <div className="m-5">
            <h1 className="font-bold text-2xl">
              {restaurant.cards[0].card.card.info.name}
            </h1>
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
        {/* <div className="restaurantmenu-offer">
          <div>
            <h3>OFFER</h3>
            {restaurant?.cards[0].card.card.info.aggregatedDiscountInfo?.descriptionList.map(
              (discount, index) => (
                <p key={index}>
                  <UilTagAlt height="16px" /> &nbsp;
                  {discount?.meta}
                </p>
              )
            )}
          </div>
        </div> */}
      </div>
      <div className="">
        {restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards?.map(
          (item) => (
            <div
              key={item.card.info.id}
              className="flex align-center justify-between border-b-2 mt-2"
            >
              <div className=" m-3">
                <h1 className="text-lg font-bold">{item.card.info.name}</h1>
                <p>
                  ₹
                  {item.card.info.price / 100 ||
                    item.card.info.defaultPrice / 100}
                </p>
                <div className="text-slate-600 text-sm">
                  {/* {item.card.info.description} */}
                </div>
              </div>
              <div className="grid align-center justify-center">
                <img
                  className="w-29 h-28 rounded-lg"
                  src={IMG_CDN_URL + item.card.info.imageId}
                />
                <div className="flex justify-center m-1">
                  <button
                    data-testId="addbtn"
                    onClick={() => addFoodItem(item)}
                    className="w-20 h-8 border border-slate-400 rounded text-green-600 "
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
