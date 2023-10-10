import { useContext } from "react";
import UserContext from "../utils/UserContext";

const Footer = () => {
  const { user } = useContext(UserContext);
  return (
    <footer className="h-16 bg-gray-900 text-white flex items-center justify-center border-t border-gray-700">
      <div>
        <h5 className="text-lg font-semibold">
          This site is developed by{" "}
          <span className="text-purple-400"> {user.name}</span>
        </h5>
      </div>
    </footer>
  );
};

export default Footer;
