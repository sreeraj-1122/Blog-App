import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import signApi from "../../api/register";
import { useSnackbar } from "notistack";
import { DataContext } from "../../context/DataContext";
function Register() {
  const { storeTokenInLs } = useContext(DataContext);

  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
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
  useEffect(()=>{
    handleSubmit();
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
        const result = await signApi(user);
        console.log(result);
        if (result.data === "User already exist") {
          enqueueSnackbar("Email already exist", { variant: "error" });
        }else if(result.data==='password must between 6 and 12'){
          enqueueSnackbar("password must between 6 and 12 characters", { variant: "error" });

        } else {
          enqueueSnackbar("User was registered successfully!", {
            variant: "success",
          });
          navigate('/login')
        }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something wrong", { variant: "error" });
    }
  };
  
  return (
    <div className="login-container">
      <h1>Register</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="inputs">
          <label htmlFor="">Name</label>
          <input
            type="text"
            required
            placeholder="Enter your name"
            name="name"
            onChange={handleChange}
            value={user.name}
          />
        </div>
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
            value={user.password}
            onChange={handleChange}
          />
          {/* <span className="text-danger fw-bold ms-3">{error}</span> */}
        </div>
        <button className="btn-login" type="submit">
          register
        </button>
      </form>
    </div>
  );
}

export default Register;
