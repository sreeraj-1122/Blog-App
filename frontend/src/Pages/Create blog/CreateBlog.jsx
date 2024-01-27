import React, { useContext, useState } from "react";
import "./CreateBlog.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import uploadPostApi from "../../api/createpost";
import getPostApi from "../../api/getAllpost";
import { DataContext } from "../../context/DataContext";
import { baseUrl } from "../../config/BaseUrl";
import Loader from "../../components/loader/Loader";

function CreateBlog() {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false  );

  const navigate = useNavigate();
  const { token } = useContext(DataContext);
   

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  
  const data = new FormData();
  data.append("title", title);
  data.append("summary", summary);
  data.append("content", content);
  data.append("file", file[0]);
  const handleSubmit = async (e) => {
    try {
    e.preventDefault();
      
      const result = await axios.post(baseUrl + "/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      console.log(result);
      if (result.status === 200) {
        navigate("/");
        getPostApi();
        enqueueSnackbar("Created successfully", { variant: "success" });
      } else {
        enqueueSnackbar("Please fill out all required fields", {
          variant: "error",
        });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something Went Wrong", { variant: "error" });
    }
  };

  return (
    <div className="create-blog-container">
     {
      loading?(<Loader loading={loading}/>):(
<>
<h1>Create a post</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="blog-inputs">
          <label htmlFor="">Title</label>
          <input
            type="text"
            placeholder="Title "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="blog-inputs">
          <label htmlFor="">Summary</label>
          <input
            type="text"
            placeholder="Summary "
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />
        </div>
        <div className="blog-inputs">
          <label htmlFor="">Thumbnail</label>
          <input
            required
            type="file"
            onChange={(e) => setFile(e.target.files)}
            name="file"
          />
        </div>
        <div className="blog-inputs">
          <label htmlFor="">Tell your story...</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={(value) => setContent(value)}
            className="react-quill"
            required
          />
        </div>

        <button type="submit">Create post</button>
      </form>
</>
      )
     }
       
    
    </div>
  );
}

export default CreateBlog;
