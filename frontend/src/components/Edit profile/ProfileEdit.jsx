import React, { useContext, useEffect, useState } from "react";
import "./ProfileEdit.css";
import { FaYoutube } from "react-icons/fa6";

import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config/BaseUrl";
import { useSnackbar } from "notistack";
import { DataContext } from "../../context/DataContext";
import Loader from "../loader/Loader";

function ProfileEdit() {
  const [loading, setLoading] = useState([]);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profile, setProfile] = useState("");
  const [linkdin, setLinkdin] = useState("");
  const [git, setGit] = useState("");
  const [yt, setYt] = useState("");
  const [insta, setInsta] = useState("");
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { token } = useContext(DataContext);

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `${baseUrl}/user/${id}`,

        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        setEmail(response.data.email);
        setName(response.data.name);
        setBio(response.data.bio);
        setGit(response.data.git);
        setInsta(response.data.insta);
        setYt(response.data.yt);
        setLinkdin(response.data.linkdin);
        setLoading(false);
      });
  }, []);
  const data = new FormData();
  data.append("name", name);
  data.append("bio", bio);
  data.append("linkdin", linkdin);
  data.append("git", git);
  data.append("insta", insta);
  data.append("yt", yt);
  data.append("profile", profile[0]);
  const handleEdit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      axios
        .put(`${baseUrl}/edituser/${id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data) {
            enqueueSnackbar("User updated successfully", {
              variant: "success",
            });
            navigate('/');
            setLoading(false);
            window.location.reload();
 

          }
        });
    } catch (error) {
      enqueueSnackbar("Something wrong", { variant: "error" });
    setLoading(false);

    }
  };
  return (
    <div className="profile-edit-container">
      {
        loading?(<Loader loading={loading}/>):(
          <>
          <h1>Edit Profile</h1>
      <form action="" onSubmit={handleEdit}>
        <div className="profile-edit-inputs">
          <label htmlFor="">Email</label>
          <input type="email" value={email} readOnly />
        </div>
        <div className="profile-edit-inputs">
          <label htmlFor="">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="profile-edit-inputs">
          <label htmlFor="">Profile Picture </label>
          <input type="file" onChange={(e) => setProfile(e.target.files)} />
        </div>
        <div className="profile-edit-inputs">
          <label htmlFor="">Bio</label>
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="profile-social-media-container">
          <div className="profile-social-inputs">
            <div className="profile-social-icon">
              <FaYoutube className="fs-3" />
            </div>
            <input
              type="text"
              value={yt}
              onChange={(e) => setYt(e.target.value)}
              placeholder="fill complete URL"
            />
          </div>
          <div className="profile-social-inputs">
            <div className="profile-social-icon">
              <RiInstagramFill className="fs-3" />
            </div>
            <input
              type="text"
              value={insta}
              onChange={(e) => setInsta(e.target.value)}
              placeholder="fill complete URL"
            />
          </div>
          <div className="profile-social-inputs">
            <div className="profile-social-icon">
              <FaLinkedin className="fs-3" />
            </div>
            <input
              type="text"
              value={linkdin}
              onChange={(e) => setLinkdin(e.target.value)}
              placeholder="fill complete URL"
            />
          </div>
          <div className="profile-social-inputs">
            <div className="profile-social-icon">
              <FaGithubSquare className="fs-3" />
            </div>
            <input
              type="text"
              value={git}
              onChange={(e) => setGit(e.target.value)}
              placeholder="fill complete URL"
            />
          </div>
          <button type="submit">Save changes</button>
        </div>
      </form>
          </>
        )
      }
    </div>
  );
}

export default ProfileEdit;
