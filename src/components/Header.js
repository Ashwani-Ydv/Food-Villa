import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import foodvilla from "../assets/img/foodvilla.png";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
import { CiDiscount1 } from "react-icons/ci";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import { IconContext } from "react-icons";

const Title = () => (
  <a href="/">
    <img className="h-20 p-2" alt="food villa" src={foodvilla} />
  </a>
);
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { user } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between items-center bg-white fixed top-0 w-full h-16 shadow-md z-50">
      <Title className="text-2xl font-semibold text-gray-800" />

      <div className="flex items-center">
        <ul className="flex space-x-4 items-center">
          <li className="flex items-center space-x-2">
            <CiDiscount1 className="w-6 h-6 text-red-500" />
            <span className="text-sm font-medium text-gray-800">Offers</span>
          </li>

          <li className="relative group">
            <Link
              to={"/cart"}
              className="flex items-center space-x-2 group-hover:text-green-500"
            >
              {cartItems.length > 0 && (
                <span className="absolute -top-4 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-8">
                  {cartItems.length}
                </span>
              )}
              <FiShoppingCart className="w-6 h-6" />
              <span className="text-sm font-medium text-gray-800">Cart</span>
            </Link>
          </li>
          <li className="flex items-center space-x-2 mr-2">
            <FiUser className="w-6 h-6 text-blue-500" />
            <span className="text-sm font-medium text-gray-800">Ashwani</span>
          </li>
        </ul>
      </div>
    </div>

    // <div className="flex justify-between shadow-lg bg-white fixed top-0 w-full h-88; z-1">
    //   <Title />
    //   <div className="flex items-center">
    //     <ul className="flex justify-between">
    //       <li className="px-2 ml-4">
    //         <link
    //           type="image/png"
    //           sizes="16x16"
    //           rel="icon"
    //           href=".../icons8-discount-16.png"
    //         />
    //         <div className="flex">
    //           <IconContext.Provider value={{ size: "1.5em" }}>
    //             <div className="mr-2">
    //               <CiDiscount1 />
    //             </div>
    //           </IconContext.Provider>
    //           Offers
    //         </div>
    //       </li>

    //       <li className="px-2 ml-4">
    //         <Link to={"/cart"}>
    //           <div className="flex">
    //             <IconContext.Provider value={{ size: "1.5em" }}>
    //               <div className="mr-2">
    //                 <FiShoppingCart />
    //               </div>
    //             </IconContext.Provider>
    //             <p data-testid="cart">Cart -{cartItems.length}</p>
    //           </div>
    //         </Link>
    //       </li>
    //       <li className="px-2 ml-4">
    //         <div className="flex">
    //           <IconContext.Provider value={{ size: "1.5em" }}>
    //             <div className="mr-2">
    //               <FiUser />
    //             </div>
    //           </IconContext.Provider>
    //           Ashwani
    //         </div>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  );
};
export default Header;
