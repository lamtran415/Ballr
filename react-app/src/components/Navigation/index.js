import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import MainLogo from './LogoIcon/main-ballr-logo.png'
import SearchBar from './SearchBar';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const location = useLocation()

	const isRootPage = location.pathname === '/';
	const isSignUpPage = location.pathname === '/signup';
	const isLogInPage = location.pathname === '/login';
	const isUploadPage = location.pathname === '/photos/upload'

	return (
		<div className='whole-navigation-container'>
			{/* <div className='inner-navigation-container'> */}
			<div className='navlink-container'>
				{
					sessionUser ?
					<>
						<NavLink exact to="/photos" className="icon-navlink" style={{ textDecoration: "none" }}><img className='ballr-logo-icon' alt='' src={MainLogo}/>
							<div className="dropdown-content">
								<NavLink exact to={`/photos/users/${sessionUser.id}`} className="photostream-album-click photostream" style={{ textDecoration: "none" }}>Photostream</NavLink>
								<NavLink exact to={`/photos/users/${sessionUser.id}/albums`} className="photostream-album-click photostream-album" style={{ textDecoration: "none" }}>Albums</NavLink>
							</div>
						</NavLink>

						<span className='you-explore-buttons'>
							<NavLink exact to={`/photos/users/${sessionUser.id}`} className="button-navlink hover-you-dropdown" style={{ textDecoration: "none" }}>You</NavLink>
							<div>
							</div>
							<NavLink exact to="/photos" className="button-navlink" style={{ textDecoration: "none" }}>Explore</NavLink>
						</span>
					</>
					:
					<>
						<NavLink exact to="/" className="icon-navlink" style={{ textDecoration: "none" }}><img className='ballr-logo-icon' alt='' src={MainLogo}/></NavLink>
						{!isRootPage && !isSignUpPage && !isLogInPage ? <NavLink exact to="/photos" className="button-navlink" style={{ textDecoration: "none" }}>Explore</NavLink> : null}
					</>
				}
			</div>

			{isLoaded && (
				<>
					{!sessionUser ?
						<>
							<div className='login-signup-container'>
								{!isRootPage && !isSignUpPage && !isLogInPage ? <SearchBar /> : null}
								<NavLink exact to="/login">
									<button className='log-in-button'>Log In</button>
								</NavLink>
								<NavLink exact to="/signup">
									{!isRootPage && !isSignUpPage && !isLogInPage ? <button className='sign-up-button blue-sign-up'>Sign Up</button> : <button className='sign-up-button'>Sign Up</button>}
								</NavLink>
							</div>
						</> : null
					}
					{sessionUser ?
						<div className='navlink-profile-button'>
							{!isRootPage && !isSignUpPage && !isLogInPage && !isUploadPage ? <SearchBar /> : null}
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
