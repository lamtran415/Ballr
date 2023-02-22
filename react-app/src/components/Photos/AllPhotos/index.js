import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllPhotosThunk } from "../../../store/photoReducer";
import './AllPhotos.css'

const AllPhotos = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPhotosThunk());
    }, [dispatch]);

    const allPhotos = Object.values(useSelector((state) => state.photos))

    if (!allPhotos) {
        return null;
    }

    return (
        <>
            <div className="explore-div"><span className="explore-word">Explore</span></div>
            <div className="all-photos-container">
                <div className="wrapper-all-photos">
                    {allPhotos.map((photo) => (
                        <NavLink style={{textDecoration: 'none'}} className="photo-card-wrapper" key={photo.id} to={`/photos/${photo.id}`}>
                            <div
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
                        </NavLink>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AllPhotos
