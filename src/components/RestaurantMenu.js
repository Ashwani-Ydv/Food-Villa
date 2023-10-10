import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../config";
import useRestaurant from "../utils/useRestaurant";
import MenuShimmer from "./MenuShimmer";
import { addItem, clearCart, removeItem } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const RestaurantMenu = () => {
  const cartItems = useSelector((store) => store.cart.items);

  console.log("cartitem", cartItems);

  const { resId } = useParams();

  const restaurant = useRestaurant(resId);

  console.log("menu", restaurant);

  const dispatch = useDispatch();
  // const addFoodItem = (item) => {
  //   dispatch(addItem(item));
  // };
  const addFoodItem = (item) => {
    dispatch(addItem(item.card.info)); // Ensure the entire item info is passed
  };
  const removeFoodItem = (item) => {
    dispatch(removeItem(item.card.info));
  };
  return !restaurant ? (
    <MenuShimmer />
  ) : (
    <div className="max-w-screen-md mx-auto my-10 p-4 shadow-md rounded-lg bg-white">
      {/* Restaurant Info */}
      <div className="flex justify-between py-6 border-b border-gray-200">
        <img
          className="h-40 rounded-lg shadow-md"
          src={
            IMG_CDN_URL + restaurant.cards[0].card.card.info.cloudinaryImageId
          }
        />
        <div className="ml-5 flex flex-col justify-between">
          <div>
            <h1 className="font-semibold text-2xl mb-2">
              {restaurant.cards[0].card.card.info.name}
            </h1>
            <p className="text-sm text-gray-600 mb-2">
              {restaurant.cards[0].card.card.info.cuisines.join(", ")}
            </p>
            <div className="flex items-center text-sm">
              <span
                className={`px-2 py-1 rounded-full text-white ${
                  restaurant.cards[0].card.card.info.avgRating >= 4
                    ? "bg-green-500"
                    : "bg-orange-500"
                }`}
              >
                ☆ {restaurant.cards[0].card.card.info.avgRating}
              </span>
              <h3 className="ml-4">
                {restaurant.cards[0].card.card.info.sla.slaString}
              </h3>
              <h3 className="ml-4">
                {restaurant.cards[0].card.card.info.costForTwoMessage}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      {restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards?.map(
        (item) => {
          const cartItem = cartItems.find(
            (cartItem) => cartItem.id === item.card.info.id
          );
          return (
            <div
              key={item.card.info.id}
              className="flex justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div>
                <h1 className="text-lg font-semibold mb-2">
                  {item.card.info.name}
                </h1>
                <p className="text-gray-600">
                  ₹{" "}
                  {item.card.info.price / 100 ||
                    item.card.info.defaultPrice / 100}
                </p>
              </div>
              <div className="items-center">
                <img
                  className="w-29 h-28 rounded-lg shadow-md mr-4"
                  src={IMG_CDN_URL + item.card.info.imageId}
                />
                <div className="flex justify-center mt-2">
                  {cartItem ? (
                    <div className="flex items-center">
                      <button
                        onClick={() => removeFoodItem(item)}
                        className="p-2 rounded bg-green-200 hover:bg-green-300 transition-colors shadow-md"
                      >
                        -
                      </button>
                      <span className="mx-3">{cartItem.count}</span>
                      <button
                        onClick={() => addFoodItem(item)}
                        className="p-2 rounded bg-green-200 hover:bg-green-300 transition-colors shadow-md"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addFoodItem(item)}
                      className="p-2 px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors shadow-md"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>

    // <div className="max-w-screen-md max-h-fit mt-20 mx-auto my-auto mb-0">
    //   <div className="flex justify-between px-4 py-4 pt-9 pb-9 border-solid border-b-2">
    //     <div className="flex justify-between items-center">
    //       <img
    //         className="h-40"
    //         src={
    //           IMG_CDN_URL + restaurant.cards[0].card.card.info.cloudinaryImageId
    //         }
    //       />
    //       <div className="m-5">
    //         <h1 className="font-bold text-2xl">
    //           {restaurant.cards[0].card.card.info.name}
    //         </h1>
    //         <p>{restaurant.cards[0].card.card.info.cuisines.join(", ")}</p>
    //         <div className="flex my-2">
    //           <div>
    //             {restaurant.cards[0].card.card.info.avgRating >= 4 ? (
    //               <div className="bg-green-400 text-xs p-1.5">
    //                 {`☆  ${restaurant.cards[0].card.card.info.avgRating}`}
    //               </div>
    //             ) : (
    //               <div className="bg-orange-600 text-xs p-1.5">
    //                 {`☆ ${restaurant.cards[0].card.card.info.avgRating}`}
    //               </div>
    //             )}
    //           </div>
    //           <div className="mx-1">
    //             <h3>{restaurant.cards[0].card.card.info.sla.slaString}</h3>
    //           </div>
    //           <div>
    //             <h3>{restaurant.cards[0].card.card.info.costForTwoMessage}</h3>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="">
    //     {restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards?.map(
    //       (item) => {
    //         const cartItem = cartItems.find(
    //           (cartItem) => cartItem.id === item.card.info.id
    //         );
    //         return (
    //           <div
    //             key={item.card.info.id}
    //             className="flex align-center justify-between border-b-2 mt-2"
    //           >
    //             <div className="m-3">
    //               <h1 className="text-lg font-bold">{item.card.info.name}</h1>
    //               <p>
    //                 ₹
    //                 {item.card.info.price / 100 ||
    //                   item.card.info.defaultPrice / 100}
    //               </p>
    //               <div className="text-slate-600 text-sm"></div>
    //             </div>
    //             <div className="grid align-center justify-center">
    //               <img
    //                 className="w-29 h-28 rounded-lg"
    //                 src={IMG_CDN_URL + item.card.info.imageId}
    //               />
    //               <div className="flex justify-center m-1">
    //                 {cartItem ? (
    //                   <div>
    //                     <button onClick={() => removeFoodItem(item)}>-</button>
    //                     {cartItem.count}
    //                     <button onClick={() => addFoodItem(item)}>+</button>
    //                   </div>
    //                 ) : (
    //                   <button
    //                     onClick={() => addFoodItem(item)}
    //                     className="w-20 h-8 border border-slate-400 rounded text-green-600"
    //                   >
    //                     Add
    //                   </button>
    //                 )}
    //               </div>
    //             </div>
    //           </div>
    //         );
    //       }
    //     )}
    //   </div>
    // </div>
  );
};

export default RestaurantMenu;
