import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./singlepost.css";
import { Context } from "../../context/Context";

const Singlepost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);
  const handledelete = async () => {
    try {
      await axios.delete("/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };
  const handleUpdate = async () => {
    try {
      await axios.put(
        "/posts/" + path,
        { username: user.username, title, desc },
        {
          headers: { authorization: "Bearer " + user.token },
        }
      );
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlepost">
      <div className="singlepostwrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlepostimg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singleposttitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singleposttitle">
            {title}
            {post.username === user?.username && (
              <div className="singlepostedit">
                <i
                  class="singleposticon fas fa-user-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  class="singleposticon fas fa-trash"
                  onClick={handledelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlepostinfo">
          <span className="singlepostauthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlepostdata">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlepostdescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlepostdesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default Singlepost;
