import Header from "../../components/header/Header";
import { Posts } from "../../components/posts/Posts";
import { Sidebar } from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { useLocation } from "react-router-dom";
import {Context} from "../../context/Context";

const Home = () => {
  const [posts, setPosts] = useState([]);
    const {user}=useContext(Context);

  const { search } = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        {user && <Sidebar />}
      </div>
    </>
  );
};

export default Home;
