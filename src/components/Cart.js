import { useDispatch, useSelector } from "react-redux";
import FoodItem from "./FoodItem";
import { IMG_CDN_URL } from "../config";
import { addItem, clearCart, removeItem } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  let totalPrice = 0;
  cartItems.map((item) => {
    //console.log(item);
    let price =
      item?.card?.info?.price / 100 || item?.card?.info?.defaultPrice / 100;
    totalPrice += price;
    return totalPrice;
  });

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());

    console.log("cart", cartItems);
    console.log("cart");
  };

  return (
    <div>
      {cartItems.length ? (
        <button
          className="bg-red-300 p-1 mt-2 mb-2 font-bold border border-black-100 text-lg rounded-lg"
          onClick={() => handleClearCart()}
        >
          Clear Cart
        </button>
      ) : (
        <></>
      )}

      {cartItems.length ? (
        <div className="flex-col">
          <div className="flex">
            <p>Total</p>-<p>{totalPrice}.00</p>
          </div>
          <div className="flex">
            <p>Delivery Charges</p>-<p>40.00</p>
          </div>
          <div className="flex">
            <p>Total Charges</p>-<p>{totalPrice + 40.0}.00</p>
          </div>
        </div>
      ) : (
        <></>
      )}

      {cartItems.length ? (
        <div className="grid justify-center items-center p-3">
          {cartItems.map((item) => (
            <div key={item.id} className="border-b-2">
              <h2 className="text-base font-bold">{item.card.info.name}</h2>
              <p>
                ₹{" "}
                {item.card.info.price / 100 ||
                  item.card.info.defaultPrice / 100}
              </p>
              <div className="flex flex-col items-center w-40 h-15">
                {item?.card?.info?.imageId && (
                  <img src={IMG_CDN_URL + item?.card?.info?.imageId} />
                )}
              </div>
            </div>
          ))}
          <button className="bg-green-300 p-1 mt-2 mb-2 font-bold border border-black-100 text-lg rounded-lg">
            Place Order
          </button>
        </div>
      ) : (
        <div className="grid justify-center m-5">
          <img
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
            alt="empty cart"
          />
          <h3 className="text-center">Your cart is empty</h3>
          <p className="text-center">
            You can go to home to view more restaurants
          </p>
        </div>
      )}
    </div>
  );
};
export default Cart;
