import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FoodItem from "./FoodItem";
import { IMG_CDN_URL } from "../config";
import { addItem, clearCart, removeItem } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  console.log("cartitem", cartItems);

  // Compute the total price
  let totalPrice = cartItems.reduce((acc, item) => {
    let price = item.price / 100 || item.defaultPrice / 100;
    return acc + price;
  }, 0);

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const addFoodItem = (item) => {
    dispatch(addItem(item)); // Ensure the entire item info is passed
  };
  const removeFoodItem = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <div className="container mt-20 px-4 py-8">
      {cartItems.length ? (
        <>
          <button
            className="bg-red-500 text-white p-2 mb-4 font-semibold text-lg rounded-md shadow-md hover:bg-red-600 transition-all"
            onClick={() => handleClearCart()}
          >
            Clear Cart
          </button>

          <div className="bg-white shadow-md p-4 rounded-md">
            <div className="flex justify-between my-2">
              <p className="font-semibold">Total</p>
              <p>₹{totalPrice}</p>
            </div>
            <div className="flex justify-between my-2">
              <p className="font-semibold">Delivery Charges</p>
              <p>₹40</p>
            </div>
            <div className="flex justify-between my-2">
              <p className="font-bold">Total Charges</p>
              <p>₹{totalPrice + 40}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm border border-gray-200"
              >
                <div className="flex items-center space-x-4">
                  <img
                    className="w-16 h-16 rounded-md"
                    src={IMG_CDN_URL + item.imageId}
                    alt={item.name}
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p>₹ {item.price / 100 || item.defaultPrice / 100}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => removeFoodItem(item)}
                    className="bg-green-200 text-green-600 px-2 py-1 rounded-md"
                  >
                    -
                  </button>
                  <span>{item.count}</span>
                  <button
                    onClick={() => addFoodItem(item)}
                    className="bg-green-200 text-green-600 px-2 py-1 rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="bg-green-500 text-white w-full mt-4 p-2 font-bold text-lg rounded-md shadow-md hover:bg-green-600 transition-all">
            Place Order
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center mt-10 space-y-2">
          <div className=" flex flex-col items-center h-2/3 w-2/3">
            <img
              src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
              alt="empty cart"
              className="w-1/3"
            />
          </div>

          <h3 className="font-semibold text-md">Your cart is empty</h3>
          <p className="text-sm">
            You can go to{" "}
            <Link className="text-blue-600" to="/">
              home
            </Link>{" "}
            to view more restaurants.
          </p>
        </div>
      )}
    </div>

    // <div>
    //   {cartItems.length ? (
    //     <>
    //       <button
    //         className="bg-red-300 p-1 mt-24 mb-2 font-bold border border-black-100 text-lg rounded-lg"
    //         onClick={() => handleClearCart()}
    //       >
    //         Clear Cart
    //       </button>

    //       <div className="flex-col">
    //         <div className="flex">
    //           <p>Total</p>-<p>{totalPrice}</p>
    //         </div>
    //         <div className="flex">
    //           <p>Delivery Charges</p>-<p>40</p>
    //         </div>
    //         <div className="flex">
    //           <p>Total Charges</p>-<p>{totalPrice + 40}</p>
    //         </div>
    //       </div>

    //       <div className="grid justify-center items-center p-3">
    //         {cartItems.map((item) => (
    //           <div key={item.id} className="border-b-2">
    //             <h2 className="text-base font-bold">
    //               {/* {item?.card?.info?.name} */}
    //               {item.name}
    //             </h2>
    //             <p>₹ {item.price / 100 || item.defaultPrice / 100}</p>
    //             <div className="flex flex-col items-center w-40 h-15">
    //               <img src={IMG_CDN_URL + item.imageId} />
    //             </div>
    //             <div>
    //               <button onClick={() => removeFoodItem(item)}>-</button>
    //               {item.count}
    //               <button onClick={() => addFoodItem(item)}>+</button>
    //             </div>
    //           </div>
    //         ))}
    //         <button className="bg-green-300 p-1 mt-2 mb-2 font-bold border border-black-100 text-lg rounded-lg">
    //           Place Order
    //         </button>
    //       </div>
    //     </>
    //   ) : (
    //     <div className="grid justify-center mt-20">
    //       <img
    //         src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
    //         alt="empty cart"
    //       />
    //       <h3 className="text-center">Your cart is empty</h3>
    //       <p className="text-center">
    //         You can go to &nbsp;
    //         <Link className="text-blue-700" to="/">
    //           home
    //         </Link>{" "}
    //         to view more restaurants
    //       </p>
    //     </div>
    //   )}
    // </div>
  );
};

export default Cart;

// const Cart = () => {
//   const cartItems = useSelector((store) => store.cart.items);
//   let totalPrice = 0;
//   cartItems.map((item) => {
//     //console.log(item);
//     let price =
//       item?.card?.info?.price / 100 || item?.card?.info?.defaultPrice / 100;
//     totalPrice += price;
//     return totalPrice;
//   });

//   const dispatch = useDispatch();

//   const handleClearCart = () => {
//     dispatch(clearCart());

//     console.log("cart", cartItems);
//     console.log("cart");
//   };

//   return (
//     <div>
//       {cartItems.length ? (
//         <button
//           className="bg-red-300 p-1 mt-24 mb-2 font-bold border border-black-100 text-lg rounded-lg"
//           onClick={() => handleClearCart()}
//         >
//           Clear Cart
//         </button>
//       ) : (
//         <></>
//       )}

//       {cartItems.length ? (
//         <div className="flex-col">
//           <div className="flex">
//             <p>Total</p>-<p>{totalPrice}</p>
//           </div>
//           <div className="flex">
//             <p>Delivery Charges</p>-<p>40</p>
//           </div>
//           <div className="flex">
//             <p>Total Charges</p>-<p>{totalPrice + 40}</p>
//           </div>
//         </div>
//       ) : (
//         <></>
//       )}

//       {cartItems.length ? (
//         <div className="grid justify-center items-center p-3">
//           {cartItems.map((item) => (
//             <div key={item.id} className="border-b-2">
//               <h2 className="text-base font-bold">{item.card.info.name}</h2>
//               <p>
//                 ₹{" "}
//                 {item.card.info.price / 100 ||
//                   item.card.info.defaultPrice / 100}
//               </p>
//               <div className="flex flex-col items-center w-40 h-15">
//                 {item?.card?.info?.imageId && (
//                   <img src={IMG_CDN_URL + item?.card?.info?.imageId} />
//                 )}
//               </div>
//             </div>
//           ))}
//           <button className="bg-green-300 p-1 mt-2 mb-2 font-bold border border-black-100 text-lg rounded-lg">
//             Place Order
//           </button>
//         </div>
//       ) : (
//         <div className="grid justify-center mt-20">
//           <img
//             src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
//             alt="empty cart"
//           />
//           <h3 className="text-center">Your cart is empty</h3>
//           <p className="text-center">
//             You can go to &nbsp;
//             <Link className="text-blue-700" to="/">
//               home
//             </Link>{" "}
//             to view more restaurants
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };
// export default Cart;
