import { createContext } from "react";

const UserContext = createContext({
  user: {
    name: "Ashwani Yadav",
    email: "yashwani1021@gmail.com",
  },
});

export default UserContext;
