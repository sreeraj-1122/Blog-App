import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import '../../Pages/Index Page/IndexPage.css'
import { GiHamburgerMenu } from "react-icons/gi";
import { DataContext } from "../../context/DataContext";
import axios from "axios";
import { baseUrl } from "../../config/BaseUrl";
import Sidebar from "../Sidebar/Sidebar";
function Header() {
  const { userId, isLoggedIn, token, toggle, setToggle } =
    useContext(DataContext);
  const [user, setUser] = useState([]);
  const [userPost, setUserPost] = useState([]);

  const [img, setImg] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtmST7lbuieRgVQMkB35mMjIOQw5_d2V84WeZMax6O63VpPB4ZpQNfVZecOIxkCAvzUYM&usqp=CAU"
  );
  const getUser = async () => {
    await axios
      .get(baseUrl + "/user/" + userId, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      });
  };
  const getUserpost = async () => {
    axios
      .get(baseUrl + "/users/" + id, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setUserPost(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getUser();
    getUserpost();
  }, []);

  return (
    <header className="main-header">
      <div className="header-container">
        <span className="left-head">
          <GiHamburgerMenu
            onClick={() => setToggle(!toggle)}
            className="menu"
          />
          <Link to="/" className="logo">
            MyBlog
          </Link>
        </span>
        <div className={`my-element ${toggle ? "active" : ""}`}>
          <Sidebar />
        </div>

        <nav>
          {isLoggedIn ? (
            <>
              <Link to="/logout" className="logout-btn">
                Logout
              </Link>

              <Link to={`/profile/${userId}`}>
                <img
                  src={
                    user.profile ? "http://localhost:5000/" + user.profile : img
                  }
                  alt=""
                  className="profile-img"
                />
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>
              <Link to="/register" className="register-btn">
                Create Account
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
