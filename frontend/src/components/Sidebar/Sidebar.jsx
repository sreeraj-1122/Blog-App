import React, { useContext } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { AiOutlineTags } from "react-icons/ai";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { LuFilePlus } from "react-icons/lu";
import { FaBookmark } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { DataContext } from "../../context/DataContext";
function Sidebar() {
  const { isLoggedIn } = useContext(DataContext);

  return (
    <div className="sidebar-container">
      <div className="login-components">
        <div className="sidebar-heading">Welcome to My Blog App!</div>
        <div className="sidebar-para">
          Share your thoughts,ideas, and experiences with the world.
        </div>
        {isLoggedIn ? (
          <div></div>
        ) : (
          <Link to="/login" className="sidebar-login">
            Login
          </Link>
        )}
      </div>
      <div className="sidebar-nav">
        <Link to="/">
          <div className="nav-items">
            <MdHome className="nav-icon" />
            <div className="nav-name">Home</div>
          </div>
        </Link>
        {isLoggedIn ? (
         <>
          <Link to="/create">
            <div className="nav-items">
              <LuFilePlus className="nav-icon" />
              <div className="nav-name">Create blog</div>
            </div>
          </Link>
           <Link to="/save">
           <div className="nav-items">
             <FaBookmark className="nav-icon" />
             <div className="nav-name">Saved</div>
           </div>
         </Link>
         </>
        ) : (
          ""
        )}
        <Link to="/privacy">
          <div className="nav-items">
            <MdOutlinePrivacyTip className="nav-icon" />
            <div className="nav-name">Privacy Policy</div>
          </div>
        </Link>
      </div>
      <div className="sidebar-socials mt-4">
        <a href="">
          {" "}
          <MdEmail className="text-black fs-4 me-4 ms-2 sidebar-icon  " />
        </a>
        <a href="https://www.instagram.com/" target="_blank">
          <RiInstagramFill className="text-black fs-4 me-4 sidebar-icon" />
        </a>
        <a href="https://www.linkedin.com/in/sree-raj-b02070272" target="_blank">
          <FaLinkedin className="text-black fs-4 me-4 sidebar-icon" />
        </a>
        <a href="https://github.com/sreeraj-1122" target="_blank">
          <FaGithubSquare className="text-black fs-4 sidebar-icon" />
        </a>
      </div>
      <div className="sidebar-footer">
        <p>
          <span> MyBlog</span> - A platform for sharing thoughts and ideas.
          Built with love using Node.js and React.
        </p>
        <p>MyBlog © 2024</p>
      </div>
    </div>
  );
}

export default Sidebar;
