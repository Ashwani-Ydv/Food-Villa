import { useDispatch, useSelector } from "react-redux";
import FoodItem from "./FoodItem";
import { IMG_CDN_URL } from "../config";
import { addItem, clearCart, removeItem } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());

    console.log("cart", cartItems);
    console.log("cart");
  };

  return (
    <div>
      {cartItems.length ? (
        <div className="flex">
          {cartItems.map((item) => (
            <div key={item.id}>
              <div>
                {item?.card?.info?.imageId && (
                  <img src={IMG_CDN_URL + item?.card?.info?.imageId} />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid justify-center">
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
