import React, { useContext, useEffect, useState } from "react";
import "./CreateBlog.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import uploadPostApi from "../../api/createpost";
import getPostApi from "../../api/getAllpost";
import { DataContext } from "../../context/DataContext";
import { baseUrl } from "../../config/BaseUrl";
import Loader from "../../components/loader/Loader";

function Editpost() {
  const { userId } = useContext(DataContext);
  const [loading, setLoading] = useState([]);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { token } = useContext(DataContext);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");

  const fetchApi = async () => {
    setLoading(true);

    const datas = await axios.get(`${baseUrl}/post/${id}`).then((response) => {
      setTitle(response.data.title);
      setSummary(response.data.summary);
      setContent(response.data.content);
      setTitle(response.data.title);
    setLoading(false);

    });
  };
  useEffect(() => {
    
    fetchApi();
  }, []);
  const data = new FormData();
  data.append("title", title);
  data.append("summary", summary);
  data.append("content", content);
  data.append("file", file[0]);

  const handleEdit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const result = await axios.put(`${baseUrl}/editpost/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      if (result.status === 200) {
        navigate(-1);
        enqueueSnackbar("updated successfully", { variant: "success" });
        setLoading(false)
      } else {
        enqueueSnackbar("Please fill out all required fields", {
          variant: "error",
        });
        setLoading(false)
        console.log("error");
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something Went Wrong", { variant: "error" });
      setLoading(false)
    }
  };

  return (
    <div className="create-blog-container">
      {
        loading?(<Loader loading={loading}/>):(
          <>
          <h1>Edit post</h1>
      <form onSubmit={handleEdit} enctype="multipart/form-data">
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

        <button type="submit">Update post</button>
      </form>
          </>
        )
      }
    </div>
  );
}

export default Editpost;
