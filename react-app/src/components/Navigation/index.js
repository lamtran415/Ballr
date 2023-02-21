import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div>
			<div>
				<NavLink exact to="/">Home</NavLink>
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
						<div>
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
