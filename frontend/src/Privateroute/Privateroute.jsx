import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Navigate, Outlet } from "react-router-dom";

const Privateroute = () => {
  const { isLoggedIn } = useContext(DataContext);
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default Privateroute;
