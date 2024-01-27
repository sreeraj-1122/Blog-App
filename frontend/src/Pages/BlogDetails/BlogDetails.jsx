import React, { useContext, useEffect, useState } from "react";
import "./BlogDetails.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { format, formatISO9075 } from "date-fns";
function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}
import { baseUrl } from "../../config/BaseUrl";
import Loader from "../../components/loader/Loader";
import { DataContext } from "../../context/DataContext";
function BlogDetails() {
  const { isLoggedIn,token } = useContext(DataContext);

  const [loading, setLoading] = useState([]);
  const [img, setImg] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtmST7lbuieRgVQMkB35mMjIOQw5_d2V84WeZMax6O63VpPB4ZpQNfVZecOIxkCAvzUYM&usqp=CAU"
  );
  const [postInfo, setPostInfo] = useState([]);
  const [author, setAuthor] = useState([]);
  const { id } = useParams();
  const navigate=useNavigate()
  useEffect(() => {
    setLoading(true);
    try {
      axios.get(`${baseUrl}/post/${id}`).then((response) => {
        setPostInfo(response.data);
        setAuthor(response.data.author);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);
  const { title, content, cover, summary, updatedAt, createdAt } = postInfo;
  const { name, profile, _id } = author;
  const formattedUpdatedAt = isValidDate(updatedAt)
    ? formatISO9075(new Date(updatedAt))
    : "Invalid Date";
  const formattedCreatedAt = isValidDate(createdAt)
    ? formatISO9075(new Date(createdAt))
    : "Invalid Date";
  return (
    <div className="details-container">
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <div className="blog-container">
            <h1>{title}</h1>
            <div className="blog-time">{formattedCreatedAt}</div>
            <div className="blog-author">{name}</div>
            <img
              src={"http://localhost:5000/" + cover}
              className="blog-img"
              alt=""
            />
            <p
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
          <hr className="line" />
          <div className="blog-time">updated: {formattedUpdatedAt}</div>

          <Link to={
            isLoggedIn?
            `/profile/${_id}`:`/login`}>
            <div className="writer-profile">
              <img
                src={
                  profile && profile ? "http://localhost:5000/" + profile : img
                }
                alt=""
              />
              <h4>{name}</h4>
            </div>
          </Link>
        </>
      )}
    </div>
  );
}

export default BlogDetails;
