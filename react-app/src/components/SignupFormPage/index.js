import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';
import BallrIcon from '../Navigation/LogoIcon/ballr-logo.png'


function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/photos" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(firstName, lastName, email, password));
        if (data) {
          const errorMessages = Object.values(data);
          const formattedErrorMessages = errorMessages.map(error => error.split(": ")[1]);
          setErrors(formattedErrorMessages);
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <div className="whole-signup-page-container">
      <form className="signup-form-container" onSubmit={handleSubmit}>
      <img className="logo-image-form" src={BallrIcon} alt=""/>
        <div className="sign-up-div">Sign Up for Ballr</div>
        <div className="sign-up-errors-map">
          {errors.map((error, idx) => <div className="sign-up-errors-div" key={idx}>{error}</div>)}
        </div>
        <label>
          {/* First name */}
          <input
            type="text"
            value={firstName}
            placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          {/* Last name */}
          <input
            type="text"
            value={lastName}
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
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
            minLength={4}
            required
          />
        </label>
        <label>
          {/* Confirm Password */}
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
        <div className="policy-div">By signing up, you agree with Ballr's <a className="tos-privacy" href="https://www.flickr.com/help/terms">Terms of Services</a> and <a className="tos-privacy" href="https://www.flickr.com/help/privacy">Privacy Policy.</a> </div>
        <div className="not-a-member-div">Already a Flickr member? <NavLink exact to='/login' style={{ textDecoration: "none", color: "#006DAC"}}>Log in here</NavLink></div>
      </form>
    </div>
  );
}

export default SignupFormPage;
