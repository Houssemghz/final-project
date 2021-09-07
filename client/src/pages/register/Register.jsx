import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registertitle">Register</span>
      <form className="registerform" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerinput"
          placeholder="Choose your Username..."
          onChange={(e) => setUsername(e.target.value)}
          autoFocus={true}

        />
        <label>Email</label>
        <input
          type="text"
          className="registerinput"
          placeholder="Choose your Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerinput"
          placeholder="Choose your Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerbutton" type="submit">
          Register
        </button>
      </form>
      <button className="registerloginbutton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error ? (
        <span
          style={{
            color: "red",
            marginTop: "15px",
            width: "200px",
            height: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Something went wrong!
        </span>
      ) : (
        <span
          style={{
            marginTop: "15px",
            width: "200px",
            height: "20px",
          }}
        ></span>
      )}
    </div>
  );
};
