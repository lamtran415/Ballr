import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllPhotosThunk } from "../../../store/photoReducer";
import './AllPhotos.css'

const AllPhotos = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAllPhotosThunk());
    }, [dispatch]);

    const allPhotos = Object.values(useSelector((state) => state.photos))
    console.log("NEED THIS TO SEE WHAT TO KEY INTO.............. ======>", allPhotos)

    if (!allPhotos) {
        return null;
    }

    return (
        <>
            <nav>Explore</nav>
            <div>Explore</div>
            <div className="all-photos-container">
                <div className="wrapper-all-photos">
                    {allPhotos.map((photo) => (
                        <div className="photo-card-wrapper">
                            <div
                                key={photo.id}
                                className='photo-card'
                            >
                                <img
                                    className="each-photo"
                                    src={photo.url}
                                    alt=""
                                />
                            </div>
                            <div className="photo-information">
                                    <div className="photo-title">{photo.title}</div>
                                    <div className="user-comment-section">
                                        <div>By: {photo.user.first_name} {photo.user.last_name}</div>
                                        <div>{photo.comment.length}</div>
                                    </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AllPhotos
