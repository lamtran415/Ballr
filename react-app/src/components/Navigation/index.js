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
					<NavLink exact to="/photos" className="icon-navlink" style={{ textDecoration: "none" }}><img className='ballr-logo-icon' alt='' src={MainLogo}/></NavLink>
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
