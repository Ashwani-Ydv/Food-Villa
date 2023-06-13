/** *

---Parcel---
*HMR-hot module replacement
*File Watcher algorithm-C++
*Builing
*manify
*cleaning our code
*dev abd production build 
*super fast build algorithm
*image optimization
*caching while development
*compression
*compatble with older version of brower
*HTTPS on dev
*manages port number
*consistent hashing algorithm
*zero config
*transitive dependencies
*browerslist
*Tree Shaking-removing un-wanted code
*
*
*
*
*
*/
import React, { useState, useContext } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import RestrauntCard from "./components/RestraurantCard";
import About from "./components/About";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";
import Instamart from "./components/Instamart";
import Profile from "./components/Profile";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import store from "./utils/store";

const AppLayout = () => {
  const [user, setUser] = useState({
    name: "Ashwani Yadav",
    email: "yashwani1021@gmail.com",
  });

  return (
    <>
      <Provider store={store}>
        <UserContext.Provider
          value={{
            user: user,
            setUser: setUser,
          }}
        >
          <Header />
          {/* <Body /> */}
          <Outlet />
          <Footer />
        </UserContext.Provider>
      </Provider>
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/instamart",
        element: <Instamart />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
