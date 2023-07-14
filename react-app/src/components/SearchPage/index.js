import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './SearchPage.css'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const SearchPage = () => {
  const [searchedPhotosArr, setSearchedPhotosArr] = useState([]);
  const reduxSearch = useSelector((state) => state.search)

  useEffect(() => {
    const searchData = localStorage.getItem('searchData')
    if (searchData) {
      setSearchedPhotosArr(JSON.parse(searchData));
    }
  }, [reduxSearch])

  return (
    <div>
      {searchedPhotosArr.length ?
        <div className="all-search-photos-container">
        <div className="wrapper-all-photos">
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
        </div>
      </div>
        :
        <div className='not-found-page'>
          <h1>We couldn't find any results for your search</h1>
          <div>Try searching for something else instead?</div>
        </div>
        }
    </div>
  )
  };


export default SearchPage;
