import React, { useContext, useEffect, useState } from "react";
import Post from "../../components/Posts/Post";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./IndexPage.css";
import Singlepost from "../../components/Singlepost/Singlepost";
import getPostApi from "../../api/getAllpost";
import Loader from "../../components/loader/Loader";
import { DataContext } from "../../context/DataContext";
function IndexPage() {
  const {toggle,setToggle } = useContext(DataContext);

  const [loading, setLoading] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setLoading(true);
    try {
      getPostApi().then((response) => {
        setPosts(response.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  return (
    <div className="main-home">
      
    {/* <div className={`my-element ${toggle ? 'active' : ''}`}> */}
    <div className="side-menu">
    <Sidebar />

    </div>
    {/* </div > */}
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div className="main-posts">
          {posts.length > 0 &&
            posts.map((post) => <Singlepost {...post} key={post._id} />)}
        </div>
      )}
    </div>
  );
}

export default IndexPage;
