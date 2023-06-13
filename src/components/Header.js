import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import foodvilla from "../assets/img/foodvilla.png";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Title = () => (
  <a href="/">
    <img className="h-28 p-2" alt="food villa" src={foodvilla} />
  </a>
);
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { user } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between bg-pink-50 shadow-lg sm:bg-blue-50 md:bg-yellow-50">
      <Title />
      <div className="nav-items">
        <ul className="flex py-10">
          <Link to="/cart">
            <li className="px-2">Cart {cartItems.length} items</li>
          </Link>
        </ul>
      </div>
      {isLoggedIn ? (
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Login</button>
      )}
    </div>
  );
};
export default Header;
