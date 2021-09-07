import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { Context } from "../../context/Context";

export const Sidebar = () => {
  const PF = "http://localhost:5000/images/";
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  const { user } = useContext(Context);

  return (
    <div className="sidebar">
      <div className="sidebaritem">
        <span className="sidebartitle">About me</span>
        <img src={PF + user.profilePic} alt="" />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id ipsam
          molestiae odit consectetur laboriosam nulla,
        </p>
      </div>
      <div className="sidebaritem">
        <span className="sidebartitle">Categories</span>
        <ul className="sidebarlist">
          {cats.map((c) => (
            <Link key={cats._id} to={`/?cat=${c.name}`} className="link">
              <li className="sidebarlistitem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebaritem">
        <span className="sidebartitle">Follow Us</span>
        <div className="sidebarsocial">
          <i className="sidebaricon fab fa-facebook-square"></i>
          <i className="sidebaricon fab fa-instagram-square"></i>
          <i className="sidebaricon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
};
