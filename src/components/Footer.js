import { useContext } from "react";
import UserContext from "../utils/UserContext";

const Footer = () => {
  const { user } = useContext(UserContext);
  return (
    <footer className="h-16 bg-gray-800 text-white flex items-center justify-center">
      <div
      // className=" w-full bottom--1 bg-slate-600 flex justify-center text-white"
      >
        <h5 className="h-15 flex justify-center items-center">
          This site is developed by {user.name}
        </h5>
      </div>
    </footer>
  );
};

export default Footer;
