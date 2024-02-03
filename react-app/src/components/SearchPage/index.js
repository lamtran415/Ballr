import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Masonry from "react-masonry-css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import './SearchPage.css';
import LoadingPage from "../LoadingPage/LoadingPage";

const breakpointColumnsObj = {
  default: 4, // Default number of columns for screens over 1500px
  1500: 3,    // 3 columns for screens 1500px and under
  1000: 2,    // 2 columns for screens 1000px and under
  500: 1      // 1 column for screens 500px and under
};

const SearchPage = () => {
  const [searchedPhotosArr, setSearchedPhotosArr] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const reduxSearch = useSelector((state) => state.search);

  useEffect(() => {
    const searchData = localStorage.getItem('searchData');
    if (searchData) {
      setSearchedPhotosArr(JSON.parse(searchData))
      setIsLoaded(true)
    }
  }, [reduxSearch]);

  return (
    <>
      {!isLoaded && (
        <LoadingPage />
      )}

      {isLoaded && (
        <div>
          {searchedPhotosArr.length ?
            <div className="all-search-photos-container">
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="wrapper-all-photos"
                columnClassName="masonry-column"
              >
                {searchedPhotosArr.map((photo) => (
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
                            e.currentTarget.src = "http://wallpaperset.com/w/full/5/8/c/119900.jpg";
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
                            <i className="far fa-comment fa-2x"></i>
                            <span className="comment-length">{photo.comment?.length}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                ))}
              </Masonry>
            </div>
            :
            <div className='not-found-page'>
              <h1>We couldn't find any results for your search</h1>
              <div>Try searching for something else instead?</div>
            </div>
          }
        </div>
      )}
    </>
  );
};

export default SearchPage;
