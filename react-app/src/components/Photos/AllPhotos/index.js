// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { getAllPhotosThunk } from "../../../store/photoReducer";
// import Masonry from "react-masonry-css";
// import './AllPhotos.css'

// const AllPhotos = () => {
//     // Initialize the Redux dispatch function
//     const dispatch = useDispatch();

//     // Use the useEffect hook to dispatch an action to fetch all photos when the component mounts
//     useEffect(() => {
//         dispatch(getAllPhotosThunk());
//     }, [dispatch]);

//     // Retrieve the list of all photos from the Redux store, turn to an array and show in reverse
//     const allPhotos = Object.values(useSelector((state) => state.photos.allPhotos)).reverse()

//     // If there are no photos, return nothing (null)
//     if (!allPhotos) {
//         return null;
//     }

//     // Render the list of photos as links
//     return (
//         <div className="all-photos-container">
//           <div className="wrapper-all-photos">
//             {allPhotos.map((photo) => (
//               // Create a link for each photo
//               <NavLink
//                 style={{ textDecoration: "none" }}
//                 className="photo-card-wrapper"
//                 key={photo?.id}
//                 to={`/photos/${photo?.id}`}
//               >
//                 <div
//                   className="photo-card"
//                 >
//                   <div className="photo-image">
//                       <img
//                         className="each-photo"
//                         src={photo.url}
//                         alt=""
//                         onError={(e) => {
//                           e.currentTarget.src = "http://wallpaperset.com/w/full/5/8/c/119900.jpg";
//                         }}
//                       />
//                   </div>
//                   <div className="photo-information">
//                     <div className="photo-title">{photo?.title}</div>
//                     <div className="user-comment-section">
//                       <div className="user-name-div">
//                         by {photo.user?.first_name} {photo.user?.last_name}
//                       </div>
//                       <div className="number-of-comments">
//                         <i className="far fa-comment fa-2x"></i>
//                         <span className="comment-length">{photo.comment?.length}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </NavLink>
//             ))}
//           </div>
//         </div>
//       );
// }

// export default AllPhotos;

// Import necessary libraries and components
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Masonry from "react-masonry-css"; // Import Masonry component
import { getAllPhotosThunk } from "../../../store/photoReducer";
import './AllPhotos.css';

const breakpointColumnsObj = {
  default: 3, // Default number of columns for screens under 1200px
  1500: 4,    // 4 columns for screens 1500px and above
};

const AllPhotos = () => {
  // Initialize the Redux dispatch function
  const dispatch = useDispatch();

  // Use the useEffect hook to dispatch an action to fetch all photos when the component mounts
  useEffect(() => {
    dispatch(getAllPhotosThunk());
  }, [dispatch]);

  // Retrieve the list of all photos from the Redux store, turn to an array and show in reverse
  const allPhotos = Object.values(useSelector((state) => state.photos.allPhotos)).reverse()

  // If there are no photos, return nothing (null)
  if (!allPhotos) {
    return null;
  }

  // Render the list of photos as links in a Masonry grid layout
  return (
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
            <div
              className="photo-card"
            >
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
  );
}

export default AllPhotos;
