import React, { useContext, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import "./Profile.css";
import { format, formatISO9075 } from "date-fns";

import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config/BaseUrl";
import { useSnackbar } from "notistack";
import { FaYoutube } from "react-icons/fa6";

import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { DataContext } from "../../context/DataContext";
import Loader from "../../components/loader/Loader";
function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}
function Profile() {
  const { enqueueSnackbar } = useSnackbar();
  const [img, setImg] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtmST7lbuieRgVQMkB35mMjIOQw5_d2V84WeZMax6O63VpPB4ZpQNfVZecOIxkCAvzUYM&usqp=CAU"
  );
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState([]);

  const [userPost, setUserPost] = useState([]);
  const nav = useNavigate();
  const { id } = useParams();
  const { token, userId } = useContext(DataContext);

  useEffect(() => {
    setLoading(true);
    getUser();
    getUserpost();
  }, []);
  const getUser = async () => {
    axios
      .get(baseUrl + "/user/" + id, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
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
  const handleDelete = async (id) => {
    setLoading(true);

    try {
      const deleteData = await axios
        .delete(`${baseUrl}/deletepost/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          enqueueSnackbar("Deleted successfully", { variant: "success" });
          getUserpost();
          setLoading(false);
        });
    } catch (error) {
      enqueueSnackbar("Something wrong", { variant: "error" });
      setLoading(false);
    }
  };
  return (
    <div className="profile-container">
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <div className="main-profile">
            <img
              src={user.profile ? "http://localhost:5000/" + user.profile : img}
              alt=""
            />
            {userId === id ? (
              <button onClick={() => nav(`/editprofile/${id}`)}>
                Edit profile
              </button>
            ) : (
              <div></div>
            )}
          </div>
          <h1 className="profile-name"> {user.name}</h1>
          <p className="bio ">{user.bio === "undefined" ? "" : user.bio}</p>
          <div className="social">
            {user.git === "" ? (
              ""
            ) : (
              <a href={user.git} target="_blank" rel="noopener noreferrer">
                <FaGithubSquare />
              </a>
            )}
            {user.linkdin === "" ? (
              ""
            ) : (
              <a href={user.linkdin}>
                <FaLinkedin />
              </a>
            )}
            {user.insta === "" ? (
              ""
            ) : (
              <a href={user.insta}>
                <RiInstagramFill />
              </a>
            )}
            {user.yt === "" ? (
              ""
            ) : (
              <a href={user.yt}>
                <FaYoutube />
              </a>
            )}
          </div>
          <div className="my-posts">
            <h4>Posts</h4>
            <h4>{userPost.length}</h4>
          </div>
          <hr className="profile-line" />
          {userPost.length === 0 ? (
            <h4 className="text-center fs-2 fw-bolder text-success ">
              No posts
            </h4>
          ) : (
            userPost.map((post) => (
              <div key={post._id} className="profile-posts shadow">
                <div className="left-post">
                  <div className="post-name">{post.title}</div>
                  <div className="post-date">{isValidDate(post.createdAt)
    ? formatISO9075(new Date(post.createdAt))
    : "Invalid Date"}</div>
                  {/* Add other post details like date if available */}
                </div>
                <div className="right-post">
                  {userId === id ? (
                    <div className="post-icon">
                      <RiDeleteBin6Line
                        className="delete-icon"
                        onClick={() => handleDelete(post._id)}
                      />
                      <Link to={`/editpost/${post._id}`} className="text-black">
                        {" "}
                        <BiSolidEdit className="edit-icon" />
                      </Link>
                    </div>
                  ) : (
                    <div className="post-icon"></div>
                  )}

                  <img src={`http://localhost:5000/${post.cover}`} alt="" />
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

export default Profile;
