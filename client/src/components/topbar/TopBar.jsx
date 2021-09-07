import { Link } from "react-router-dom";
import "./topbar.css";
import {Context} from "../../context/Context";
import {useContext} from "react";

const TopBar = () => {
  const PF="http://localhost:5000/images/";
  const {user,dispatch}=useContext(Context);
  const handleLogout=()=>{
    dispatch({type:"LOGOUT"});
  };
  return (
    <div className="top">
      <div className="topleft">
        <i className="topicon fab fa-facebook-square"></i>
        <i className="topicon fab fa-instagram-square"></i>
        <i className="topicon fab fa-twitter-square"></i>
      </div>
      <div className="topcenter">
        <ul className="toplist">
          <li className="toplistitem">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="toplistitem">
            <Link className="link" to="/about">
              About
            </Link>
          </li>
          <li className="toplistitem">
            <Link className="link" to="/contact">
              Contact
            </Link>
          </li>
          <li className="toplistitem">
            <Link className="link" to="/write">
              Write
            </Link>
          </li>
          <li className="toplistitem" onClick={handleLogout}>{user && "Log out"}</li>
        </ul>
      </div>
      <div className="topright">
        {user ? (
          <Link  to="/setting">
          <img
            className="topimg"
            src={PF+user.profilePic}
            alt=""
          /> </Link>
        ) : (
          <ul className="toplist">
            <li className="toplistitem">
              <Link className="link" to="/login">
                Log in
              </Link>
            </li>
            <li className="toplistitem">
              <Link className="link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        )}

        <i className="topsearchicon fas fa-search"></i>
      </div>
    </div>
  );
};

export default TopBar;
