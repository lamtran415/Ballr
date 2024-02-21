// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Masonry from "react-masonry-css"; // Import Masonry component
import {
  getAllPhotosThunk,
  loadUserPhotoThunk,
} from "../../../store/photoReducer";
import LoadingPage from "../../LoadingPage/LoadingPage";
import "./AllPhotos.css";
import AddFavorites from "../../Favorites/AddFavorites/AddFavorites";
import { getUserFavoritesThunk } from "../../../store/favoritesReducer";
import DeleteFavorites from "../../Favorites/DeleteFavorites/DeleteFavorites";

const breakpointColumnsObj = {
  default: 4, // Default number of columns for screens over 1500px
  1500: 3, // 3 columns for screens 1500px and under
  1000: 2, // 2 columns for screens 1000px and under
  500: 1, // 1 column for screens 500px and under
};

const AllPhotos = () => {
  // Initialize the Redux dispatch function
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  // Use the useEffect hook to dispatch an action to fetch all photos when the component mounts
  useEffect(() => {
    dispatch(getAllPhotosThunk()).then(() => setIsLoaded(true));

    if (sessionUser) {
      dispatch(loadUserPhotoThunk(sessionUser.id));
      dispatch(getUserFavoritesThunk(sessionUser.id));
    }
  }, [dispatch, sessionUser]);

    // State variable to trigger rerender when userFavorites change
  const [favoritesChanged, setFavoritesChanged] = useState(false);

  useEffect(() => {
    if (favoritesChanged) {
      // Refetch userFavorites or any other necessary data
      dispatch(getUserFavoritesThunk(sessionUser.id))
      // Reset the state variable
      setFavoritesChanged(false);
    }
  }, [favoritesChanged, dispatch, sessionUser]);

  // Retrieve the list of all photos from the Redux store, turn to an array and show in reverse
  const allPhotos = Object.values(
    useSelector((state) => state.photos.allPhotos)
  ).reverse();

  const userFavorites = useSelector(
    (state) => state.favorites[sessionUser?.id]?.photos);

  const photoIds = new Set(userFavorites?.map((photo) => photo.id));

  // If there are no photos, return nothing (null)
  if (!allPhotos) {
    return null;
  }

  // Render the list of photos as links in a Masonry grid layout
  return (
    <>
      {!isLoaded && <LoadingPage />}

      {isLoaded && allPhotos && (
        <div className="all-photos-container">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="wrapper-all-photos"
            columnClassName="masonry-column"
          >
            {allPhotos.map((photo) => (
              // Create a link for each photo
              <NavLink
                style={{ textDecoration: "none" }}
                className="photo-card-wrapper"
                key={photo?.id}
                to={`/photos/${photo?.id}`}
              >
                <div className="photo-card">
                  <div className="photo-image">
                    <img
                      className="each-photo"
                      src={photo.url}
                      alt=""
                      onError={(e) => {
                        e.currentTarget.src =
                          "http://wallpaperset.com/w/full/5/8/c/119900.jpg";
                      }}
                    />
                  </div>
                  <div className="photo-information">
                    <div className="photo-title">{photo?.title}</div>
                    <div className="user-comment-section">
                      <div className="user-name-div">
                        by {photo.user?.first_name} {photo.user?.last_name}
                      </div>
                      <div className="number-of-comments">
                          {!photoIds.has(photo.id) ?
                            <AddFavorites
                              photoId={photo.id}
                              setFavoritesChanged={setFavoritesChanged}
                            />
                            :
                            <DeleteFavorites
                              photoId={photo.id}
                              setFavoritesChanged={setFavoritesChanged}
                            />
                        }
                        <i className="far fa-comment fa-2x"></i>
                        <span className="comment-length">
                          {photo.comment?.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </Masonry>
        </div>
      )}
    </>
  );
};

export default AllPhotos;
