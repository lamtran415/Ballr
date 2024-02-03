import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Masonry from "react-masonry-css";
import { loadAllPhotosForTagThunk } from "../../../store/tagsReducer";
import "./IndividualTag.css";
import ErrorPage from "../../ErrorPage";
import LoadingPage from "../../LoadingPage/LoadingPage";

const breakpointColumnsObj = {
  default: 4, // Default number of columns for screens over 1500px
  1500: 3,    // 3 columns for screens 1500px and under
  1000: 2,    // 2 columns for screens 1000px and under
  500: 1      // 1 column for screens 500px and under
};

const IndividualTag = () => {
  const { tagId } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadAllPhotosForTagThunk(tagId))
      .then(() => setIsLoaded(true))
  }, [dispatch, tagId]);

  const tag = useSelector((state) => state.tags)[tagId];

  if (!tag || tag?.photos.length === 0) {
    return <ErrorPage />;
  }

  return (
    <>
      {!isLoaded && (
        <LoadingPage />
      )}

      {isLoaded && tag && (
        <div className="all-tag-photos-container">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="wrapper-all-photos"
            columnClassName="masonry-column"
          >
            {tag?.photos.map((photo) => (
              <NavLink
                style={{ textDecoration: "none" }}
                className="photo-card-wrapper"
                key={photo?.id}
                to={`/photos/${photo?.id}`}
              >
                <div className="photo-card">
                  <img
                    className="each-photo"
                    src={photo.url}
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
                        by {photo.user?.first_name} {photo.user?.last_name}
                      </div>
                      <div className="number-of-comments">
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

export default IndividualTag;
