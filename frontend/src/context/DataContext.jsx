import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useSnackbar } from "notistack";
export const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const { enqueueSnackbar } = useSnackbar();
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    try {
      if (token) {
        const decodedToken = token ? jwtDecode(token) : null;
        console.log(decodedToken);
        const expirationTime = decodedToken.exp; // 'exp' is the key for expiration time
        const currentTime = Math.floor(Date.now() / 1000);
        if (expirationTime > currentTime) {
          console.log("Token is still valid");
        } else {
          console.log("Token has expired");
          logoutUser();
          enqueueSnackbar("Expired session", { variant: "error" });
        }
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, [token]);
  const storeTokenInLs = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(localStorage.getItem("token"));
  };
  const storeIdInLs = (UserId) => {
    localStorage.setItem("id", UserId);
    setUserId(localStorage.getItem("id"));
  };
  const logoutUser = () => {
    setToken("");
    setUserId("");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    window.location.reload();
    return;
  };
  let isLoggedIn = !!token;
  return (
    <DataContext.Provider
      value={{
        token,
        setToken,
        storeTokenInLs,
        logoutUser,
        isLoggedIn,
        storeIdInLs,
        userId,
        toggle,
        setToggle,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;
