import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { loadUserPhotoThunk } from "../../../store/photoReducer";
import './UserPhotos.css'

const UserPhotos = () => {
    const history = useHistory();
    const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(loadUserPhotoThunk(sessionUser.id))
    }, [dispatch, sessionUser.id])

    const userPhotos = Object.values(useSelector(state => state.photos));

    if (!userPhotos) {
        return null
    }

    return (
        <>
            <div className="user-header-container">
                <div className="user-header-width-div">
                    <img src ="https://combo.staticflickr.com/pw/images/buddyicon03.png#197638499@N08" className="user-header-picture"/>
                    <div className="user-header-information-container">
                        <div className="user-header-name-div">
                            {sessionUser?.first_name} {sessionUser?.last_name}
                        </div>
                        <div className="user-email-photo-length">
                            <div>
                                {sessionUser?.email}
                            </div>
                            <div className="user-header-photo-header">
                                {userPhotos?.length} Photo(s)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="all-user-photos-container">
                <div className="user-wrapper-all-photos">
                    {userPhotos.map((photo) => (
                        <NavLink style={{textDecoration: 'none'}} className="photo-card-wrapper" key={photo.id} to={`/photos/${photo?.id}`}>
                            <div
                                className='photo-card'
                                >
                                <img
                                    className="each-photo"
                                    src={photo?.url}
                                    alt=""
                                    onError={e => { e.currentTarget.src = "http://wallpaperset.com/w/full/5/8/c/119900.jpg"; }}
                                    />
                                <div className="photo-information">
                                        <div className="photo-title">{photo?.title}</div>
                                        <div className="user-comment-section">
                                            <div className="user-name-div">by {photo?.user.first_name} {photo?.user.last_name}</div>
                                            <div className="number-of-comments"><i className="far fa-comment fa-2x"></i><span className="comment-length">{photo?.comment.length}</span></div>
                                        </div>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </>
    )
}

export default UserPhotos;
