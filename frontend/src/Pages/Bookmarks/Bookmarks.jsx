import React, { useEffect, useState } from 'react'
import Singlepost from '../../components/Singlepost/Singlepost'
import './Bookmarks.css'
import getPostApi from '../../api/getAllpost'
import Loader from '../../components/loader/Loader';

function Bookmarks() {
  const [loading, setLoading] = useState([]);

  const [posts,setPosts]=useState([])
  useEffect(()=>{
    setLoading(true);

    getPostApi().then((response)=>{
    setPosts(response.data)
    setLoading(false);

    })

  },[])
  const bookmarkedPosts = posts.filter((res) => res.bookmark === true);
  return (
    <div className='bookmarks-container'>
        {
          loading?(<Loader loading={loading}/>):(
            <>
            <h1>Your Library</h1>
        <hr />
        <div className="bookmarks-posts">
        {bookmarkedPosts.map((post) => (
          <Singlepost
            key={post._id}
            _id={post._id}
            author={post.author}
            bookmark={post.bookmark}
            summary={post.summary}
            title={post.title}
            createdAt={post.createdAt}
            cover={post.cover} // Assuming cover is a property in your post object
          />
        ))}
      </div>
            </>
          )
        }

    </div>
  )
}

export default Bookmarks