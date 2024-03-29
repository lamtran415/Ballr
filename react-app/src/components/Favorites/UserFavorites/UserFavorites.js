import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getUserFavoritesThunk } from "../../../store/favoritesReducer";
import { loadUserPhotoThunk } from "../../../store/photoReducer";
import LoadingPage from "../../LoadingPage/LoadingPage";
import './UserFavorites.css';

const UserFavorites = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadUserPhotoThunk(userId))
    dispatch(getUserFavoritesThunk(userId))
        .then(() => setIsLoaded(true));
  }, [dispatch, userId]);

  const userPhotos = Object.values(useSelector(state => state.photos.userPhotos));
  const userFavorites = Object.values(useSelector(state => state.favorites))

  return (
    <>
        {!isLoaded && (
                <LoadingPage />
        )}



        {isLoaded && userPhotos && userFavorites && (
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
                        <NavLink to={`/photos/users/${userId}/favorites`} className="photo-album-navlink">Faves</NavLink>
                    </div>
                </div>

                <div className="all-user-photos-container">
                    <div className="user-wrapper-all-photos">
                        {userFavorites[0].photos?.map((photo) => (
                            <NavLink
                            style={{ textDecoration: "none" }}
                            className="photo-card-wrapper"
                            key={photo.id}
                            to={`/photos/${photo?.id}`}
                            >
                            <div className="photo-card">
                                <img
                                className="user-each-photo-favorite"
                                src={photo?.url}
                                alt=""
                                onError={(e) => {
                                    e.currentTarget.src =
                                    "http://wallpaperset.com/w/full/5/8/c/119900.jpg";
                                }}
                                />
                                <div className="photo-information">
                                    <div className="photo-title">{photo?.title}</div>
                                    <div className="user-comment-section">
                                        <div className="user-name-div">
                                        by {photo?.user.first_name}{" "}
                                        {photo?.user.last_name}
                                        </div>
                                        <div className="number-of-comments">
                                        <i className="far fa-comment fa-2x"></i>
                                        <span className="comment-length">
                                            {photo?.comment.length}
                                        </span>
                                    </div>
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
};

export default UserFavorites;
