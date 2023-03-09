import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import MainLogo from './LogoIcon/main-ballr-logo.png'

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='whole-navigation-container'>
			{/* <div className='inner-navigation-container'> */}
			<div className='navlink-container'>
				{
					sessionUser ?
					<>
						<NavLink exact to="/photos" className="icon-navlink" style={{ textDecoration: "none" }}><img className='ballr-logo-icon' alt='' src={MainLogo}/></NavLink>
						<span className='you-explore-buttons'>
							<NavLink exact to={`/photos/users/${sessionUser.id}`} className="button-navlink" style={{ textDecoration: "none" }}>You</NavLink>
							<NavLink exact to="/photos" className="button-navlink" style={{ textDecoration: "none" }}>Explore</NavLink>

						</span>
					</>
					:
					<NavLink exact to="/" className="icon-navlink" style={{ textDecoration: "none" }}><img className='ballr-logo-icon' alt='' src={MainLogo}/></NavLink>
				}
			</div>
			{isLoaded && (
				<>
					{!sessionUser ?
						<>
							<div className='login-signup-container'>
								<NavLink exact to="/login">
									<button className='log-in-button'>Log In</button>
								</NavLink>
								<NavLink exact to="/signup">
									<button className='sign-up-button'>Sign Up</button>
								</NavLink>
							</div>
						</> : null
					}
					{sessionUser ?
						<div className='navlink-profile-button'>
							<NavLink exact to="/photos/upload" className="upload-icon"><i className="fas fa-cloud-upload-alt"></i></NavLink>
							<ProfileButton user={sessionUser} />
						</div>
						: null
					}
				</>
			)}
			{/* </div> */}
		</div>
	);
}

export default Navigation;
