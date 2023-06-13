import { useContext } from "react";
import UserContext from "../utils/UserContext";

const Footer = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="flex justify-center">
      <h5 className="p-10 m-10">This site is developed by {user.name}</h5>
    </div>
  );
};

export default Footer;
