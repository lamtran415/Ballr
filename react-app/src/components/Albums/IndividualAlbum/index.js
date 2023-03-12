import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getUserAlbumDetailsThunk, getUserAlbumsThunk } from "../../../store/albumsReducer";
import './IndividualAlbum.css'

const IndividualAlbum = () => {
    const history = useHistory()
    const { userId, albumId } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const individualAlbum = useSelector(state => state.albums[albumId])

    useEffect(() => {
        dispatch(getUserAlbumsThunk(userId))
        dispatch(getUserAlbumDetailsThunk(+userId, +albumId))
    }, [dispatch, userId, albumId])

    return (
        <>
        <div className="albums-back-button" onClick={() => history.push(`/photos/users/${userId}/albums`)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="black" d="M14.707,18.707C14.52,18.894,14.266,19,14,19s-0.52-0.106-0.707-0.293L8.414,13H20c0.553,0,1-0.447,1-1s-0.447-1-1-1H8.414l5.293-5.293C13.488,6.902,13.512,6.754,13.512,6.598c0-0.156-0.024-0.304-0.07-0.445c-0.095-0.246-0.267-0.449-0.483-0.617C12.678,5.271,12.427,5.177,12.165,5.177c-0.262,0-0.513,0.094-0.707,0.293l-7,7c-0.391,0.391-0.391,1.023,0,1.414l7,7C11.902,18.902,12.049,19,12.165,19c0.116,0,0.232-0.035,0.336-0.105C14.232,18.354,14.612,18.112,14.707,18.707z"/>
            </svg><span className="back-albums-list">Back to albums list</span>
        </div>
        <div className="whole-album-details-container">
            <div className="album-header-container" style={{ backgroundImage: `url(https://wallpaper.dog/large/20539383.jpg)` }}>
                <div className="user-header-width-div">
                    <div className="album-header-information-container">
                        <div className="user-header-name-div">
                            {individualAlbum?.name}
                        </div>
                        <div className="album-description">
                            {individualAlbum?.description}
                        </div>
                        <div className="album-photo-length">
                            {individualAlbum?.photos?.length} Photo(s)
                        </div>
                        <div className="album-user-names">
                            By: {individualAlbum?.user?.first_name} {individualAlbum?.user?.last_name}
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div className="individual-album-container">
                <div className="all-album-photo-container">
                    {individualAlbum?.photos.map((image) => (
                        <NavLink style={{textDecoration: 'none'}} className="photo-card-wrapper" key={image.id} to={`/photos/${image?.id}`}>
                            <div
                                className='photo-card'
                                >
                                <img
                                    className="album-each-photo"
                                    src={image?.url}
                                    alt=""
                                    onError={e => { e.currentTarget.src = "http://wallpaperset.com/w/full/5/8/c/119900.jpg"; }}
                                    />
                                <div className="photo-information">
                                        <div className="photo-title">{image?.title}</div>
                                        <div className="album-user-comment-section">
                                            <div className="user-name-div">by {image?.user.first_name} {image?.user.last_name}</div>
                                            <div className="number-of-comments"><i className="far fa-comment fa-2x"></i><span className="comment-length">{image?.comment.length}</span></div>
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

export default IndividualAlbum;
