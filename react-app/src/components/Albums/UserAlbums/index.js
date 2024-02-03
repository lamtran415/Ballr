import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getUserAlbumsThunk } from "../../../store/albumsReducer";
import { loadUserPhotoThunk } from "../../../store/photoReducer";
import OpenModalButton from "../../OpenModalButton";
import CreateAlbum from "../CreateAlbum";
import './UserAlbums.css'
import LoadingPage from "../../LoadingPage/LoadingPage";

const UserAlbums = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(loadUserPhotoThunk(userId))
        dispatch(getUserAlbumsThunk(userId))
            .then(() => setIsLoaded(true))
    }, [dispatch, userId])

    const userPhotos = Object.values(useSelector(state => state.photos.userPhotos));
    const userAlbums = Object.values(useSelector(state => state.albums));

    return (
        <>
            {!isLoaded && (
                <LoadingPage />
            )}

            {isLoaded && userPhotos && userAlbums && (
                <>
                    <div className="user-header-container">
                        <div className="user-header-width-div">
                            <img src ="https://combo.staticflickr.com/pw/images/buddyicon03.png#197638499@N08" className="user-header-picture" alt=""/>
                            <div className="user-header-information-container">
                                <div className="user-header-name-div">
                                    {userPhotos.length !== 0 ? userPhotos[0]?.user?.first_name : sessionUser.first_name} {userPhotos.length !== 0 ? userPhotos[0]?.user?.last_name : sessionUser.last_name}
                                </div>
                                <div className="user-email-photo-length">
                                    <div>
                                        {userPhotos.length !== 0 ? userPhotos[0]?.user?.email : sessionUser.email}
                                    </div>
                                    <div className="user-header-photo-header">
                                        {userPhotos?.length} {userPhotos?.length ? "Photos" : "Photo"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="photo-album-navlink-container">
                        <div className="margin-div">
                            <NavLink to={`/photos/users/${userId}`} className="photo-album-navlink">Photostream</NavLink>
                            <NavLink to={`/photos/users/${userId}/albums`} className="photo-album-navlink">Albums</NavLink>
                        </div>
                    </div>
                    <div className="new-album-button-container">
                        {sessionUser?.id === +userId ?
                            <OpenModalButton
                                className="new-album-button"
                                buttonText={<><i className="fas fa-plus-square" style={{color: 'gray', fontSize: "22px", marginRight: "5px"}}></i> <span className="new-album-text">New album</span></>}
                                modalComponent={<CreateAlbum userPhotos={userPhotos} userId={userId}/>}
                            />
                            : null
                        }
                    </div>
                    <div className="all-albums-container">
                        <div className="album-wrapper-all-albums">
                                {userAlbums.map((album) => (
                                    <NavLink style={{textDecoration: 'none'}} className="photo-card-wrapper" key={album.id} to={`/photos/users/${userId}/albums/${album.id}`}>
                                        <div
                                            className='photo-card'
                                            >
                                            <img
                                                className="album-each-photo"
                                                // src={album.photos[0]?.url}
                                                src={album.photos[Math.floor(Math.random() * album.photos.length)].url}
                                                alt=""
                                                onError={e => { e.currentTarget.src = "http://wallpaperset.com/w/full/5/8/c/119900.jpg"; }}
                                                />
                                            <div className="album-information">
                                                    <div className="photo-title">{album?.name}</div>
                                                    <div className="album-user-comment-section">
                                                        {/* <div className="user-name-div">by {album?.user.first_name} {album?.user.last_name}</div> */}
                                                        <div className="number-of-comments"><span className="album-photo-number">{album.photos?.length} {album.photos?.length > 1 ? 'Photos' : 'Photo'}</span></div>
                                                    </div>
                                            </div>
                                        </div>
                                    </NavLink>
                                ))}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default UserAlbums;
