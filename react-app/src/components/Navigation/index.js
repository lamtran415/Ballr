import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='whole-navigation-container'>
			<div>
				<NavLink exact to="/photos" className="icon-navlink" style={{ textDecoration: "none" }}>ballr</NavLink>
			</div>
			{isLoaded && (
				<>
					{!sessionUser ?
						<>
							<div>
								<NavLink exact to="/login">
									<button>Log In</button>
								</NavLink>
							</div>
							<div>
								<NavLink exact to="/signup">
									<button>Sign In</button>
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
		</div>
	);
}

export default Navigation;
