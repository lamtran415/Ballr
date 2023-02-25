import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import './LoginForm.css';
import BallrIcon from '../Navigation/LogoIcon/ballr-logo.png'


function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/photos" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      const errorMessages = Object.values(data);
      const formattedErrorMessages = errorMessages.map(error => error.split(": ")[1]);
      setErrors(formattedErrorMessages);
    }
  };

  return (
    <div className="whole-login-page-container">
      <form className="login-form-container" onSubmit={handleSubmit}>
      <img className="logo-image-form" src={BallrIcon} alt=""/>
      <div className="log-in-ballr">Log in to Ballr</div>
        <div className="login-errors-map">
          {errors.map((error, idx) => (
            <div className="login-error-div" key={idx}>{error}</div>
          ))}
        </div>
        <label>
          {/* Email */}
          <input
            type="email"
            value={email}
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          {/* Password */}
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="log-in-button-div">
          <button type="submit">Sign In</button>
          <button
              className=""
              type="submit"
              onClick={() => {
                setEmail("demo@aa.io");
                setPassword("password");
              }}
            >
              <span>Demo User</span>
          </button>
        </div>
        <div className="not-a-member-div">Not a Flickr member? <NavLink exact to='/signup' style={{ textDecoration: "none", color: "#006DAC"}}>Sign up here</NavLink></div>
      </form>
    </div>
  );
}

export default LoginFormPage;
