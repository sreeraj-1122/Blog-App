import React, { useContext, useEffect, useState } from "react";
import "./Singlepost.css";
import { Link, useNavigate } from "react-router-dom";
import { GoBookmarkFill } from "react-icons/go";
import { FaRegBookmark } from "react-icons/fa";

import { format } from "date-fns";
import axios from "axios";
import { baseUrl } from "../../config/BaseUrl";
import { DataContext } from "../../context/DataContext";
import getPostApi from "../../api/getAllpost";
function reduceSummaryLength(summary, maxLength) {
  if (summary.length <= maxLength) {
    return summary;
  } else {
    return summary.slice(0, maxLength - 3) + "...";
  }
}
function Singlepost({
  _id,
  title,
  summary,
  content,
  cover,
  createdAt,
  author,
  bookmark,
}) {
  const navigate = useNavigate();

  const [bookmarks, setBookmarks] = useState(bookmark);

  const { isLoggedIn,token } = useContext(DataContext);
  const handleSave = async () => {
   try {
      // console.log(bookmarks);
      await axios.patch(`${baseUrl}/post/${_id}`, {
        bookmark: !bookmarks,
      }
      ).then((res)=>{
        console.log(res.data);
      setBookmarks(res.data.bookmark);
        
      })
    //  
      // console.log(result.data.bookmark);
   } catch (error) {
    console.log(error);
   }
  }; 
//  useEffect(()=>{ 
//     handleSave()
//  },[])
  return (
    <div className="post-container shadow-sm">
      <div className="post-section">
        <Link to={`/details/${_id}`}>
          <div className="post-title">{title}</div>
          <div className="post-summary">
            {" "}
            {reduceSummaryLength(summary, 100)}
          </div>
        </Link>
        <div className="main-subcontent">
          <div className="post-subcontent">
            <div className="left-content">{author.name} .</div>
            <div className="right-content">
              {format(new Date(createdAt), "MMM d")}
            </div>
          </div>
          {isLoggedIn ? (
            <div>
              {bookmarks ? (
                <GoBookmarkFill
                  className="fs-4 fw-bolder save-icon"
                  onClick={() => {
                    handleSave(_id);
                  }}
                />
              ) : (
                <FaRegBookmark
                  className="fs-5 fw-bolder save-icon"
                  onClick={() => {
                    handleSave(_id);
                  }}
                />
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="img-section" onClick={() => navigate(`/details/${_id}`)}>
        <img src={"http://localhost:5000/" + cover} alt="" />
      </div>
    </div>
  );
}

export default Singlepost;
