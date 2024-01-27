import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import loginApi from "../../api/Auth";
import { DataContext } from "../../context/DataContext";
import { useSnackbar } from "notistack";
import Loader from "../../components/loader/Loader";

function Login() {
  const { enqueueSnackbar } = useSnackbar();
  // const [loading, setLoading] = useState([]);

  const { storeTokenInLs, storeIdInLs } = useContext(DataContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
  // useEffect(()=>{
  //   handleSubmit();
  // },[])
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginApi(user);

      const userToken = result.data.Token;
      if (result.status === 200 && userToken) {
        const res_data = await result;
        storeTokenInLs(res_data.data.Token);
        storeIdInLs(res_data.data.userExist._id);
        // setLoading(false);

        navigate("/");
        enqueueSnackbar("Login successful", { variant: "success" });
        window.location.reload();
      } else {
        // setLoading(false);

        enqueueSnackbar("email and password does not match", {
          variant: "error",
        });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something Went Wrong", { variant: "error" });
      // setLoading(false);
    }
  };
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="inputs">
          <label htmlFor="">Email</label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
            value={user.email}
          />
        </div>
        <div className="inputs">
          <label htmlFor="">Password</label>
          <input
            type="password"
            required
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
            value={user.password}
          />
        </div>
        <button className="btn-login" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
