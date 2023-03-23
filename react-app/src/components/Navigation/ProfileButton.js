import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const sessionUser = useSelector(state => state.session.user)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  // const closeMenu = () => setShowMenu(false);

  return (
    <div className="whole-profile-button-container">
      <button onClick={openMenu} className="profile-button">
      </button>
      <div className={`${ulClassName} user-list`} ref={ulRef}>
        {user ? (
          <div>
            <div className="greeting-div" onClick={() => history.push(`/photos/users/${sessionUser.id}`)}>{`Hello ${user.first_name}!`}</div>
            <div className="email-div" onClick={() => history.push(`/photos/users/${sessionUser.id}`)}>{user.email}</div>
            <div>
              <div className="log-out-button" onClick={handleLogout}>Log Out</div>
            </div>
          </div>
        ) : (
          // <>
          //   <OpenModalButton
          //     buttonText="Log In"
          //     onItemClick={closeMenu}
          //     modalComponent={<LoginFormModal />}
          //   />

          //   <OpenModalButton
          //     buttonText="Sign Up"
          //     onItemClick={closeMenu}
          //     modalComponent={<SignupFormModal />}
          //   />
          // </>
          null
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
