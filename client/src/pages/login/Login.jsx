import { Link } from "react-router-dom";
import "./login.css";
import {useRef,useContext} from "react"
import axios from "axios"
import {Context} from "../../context/Context.js"

export const Login = () => {
  const userRef = useRef();
  const passwordref = useRef();
  const {dispatch,isFetching} =useContext(Context)
  const handleSubmit= async (e)=>{
    e.preventDefault()
dispatch ({type:"LOGIN_START"})
try {
  const res= await axios.post("/auth/login",{
    username: userRef.current.value,
    password: passwordref.current.value,
  })
  dispatch ({type:"LOGIN_SUCCESS",payload:res.data})

} catch (err) {
  dispatch ({type:"LOGIN_FAILURE"})

}
  }
  return (
    <div className="login">
      <span className="logintitle">Login</span>
      <form className="loginform" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="logininput"
          placeholder="Enter your Username..."
          ref={userRef}
          autoFocus={true}

        />
        <label>Password</label>
        <input
          type="password"
          className="logininput"
          placeholder="Enter your Password..."
          ref={passwordref}

        />
        <button className="loginbutton" type="submit" disabled={isFetching}>Login</button>
      </form>
      <button className="loginregisterbutton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
};
