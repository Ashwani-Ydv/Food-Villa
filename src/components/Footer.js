import { useContext } from "react";
import UserContext from "../utils/UserContext";

const Footer = () => {
  const { user } = useContext(UserContext);
  return (
    <div className=" w-screen bottom-0 mb-0 bg-slate-600 flex justify-center text-white ">
      <h5 className="h-20 flex justify-center items-center">
        This site is developed by {user.name}
      </h5>
    </div>
  );
};

export default Footer;
