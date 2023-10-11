import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FoodItem from "./FoodItem";
import { IMG_CDN_URL } from "../config";
import { addItem, clearCart, removeItem } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  console.log("cartitem", cartItems);

  // total price calculation
  let totalPrice = cartItems.reduce((acc, item) => {
    let price =
      item.count * Math.floor(item.price / 100 || item.defaultPrice / 100);
    return acc + price;
  }, 0);

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const addFoodItem = (item) => {
    dispatch(addItem(item));
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
  );
};

export default Cart;
