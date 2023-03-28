import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getUserAlbumDetailsThunk, getUserAlbumsThunk } from "../../../store/albumsReducer";
import { loadUserPhotoThunk } from "../../../store/photoReducer";
import ErrorPage from "../../ErrorPage";
import OpenModalButton from "../../OpenModalButton";
import DeleteAlbum from "../DeleteAlbum";
import EditAlbum from "../EditAlbum";
import './IndividualAlbum.css'

const IndividualAlbum = () => {
    const history = useHistory()
    const { userId, albumId } = useParams();
    const dispatch = useDispatch();
    const individualAlbum = useSelector(state => state.albums[albumId])
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getUserAlbumsThunk(userId))
        dispatch(getUserAlbumDetailsThunk(+userId, +albumId))
        dispatch(loadUserPhotoThunk(userId))
    }, [dispatch, userId, albumId])

    if (!individualAlbum) {
        return <ErrorPage />
    }

    return (
        <>
        <div className="albums-back-button">
            <span className="back-albums-list" onClick={() => history.push(`/photos/users/${userId}/albums`)}><i className="fas fa-arrow-left fa-inverse fa-s album-arrow"></i>{" "}Back to albums list</span>
        </div>
        <div className="whole-album-details-container">
            <div className="album-header-container" style={{ backgroundImage: `url(https://wallpaper.dog/large/20539383.jpg)` }}>
                <div className="album-header-width-div">
                    <div className="album-header-information-container">
                        <div className="user-header-name-div">
                            {individualAlbum?.name}
                        </div>
                        <div className="album-description">
                            {individualAlbum?.description}
                        </div>
                        <div className="album-photo-length">
                            {individualAlbum?.photos?.length} {individualAlbum?.photos?.length ? "Photos" : "Photo"}
                        </div>
                        <div className="delete-edit-album-button-container">
                            {sessionUser.id !== null && sessionUser.id === individualAlbum?.user_id ?
                            <>
                                <OpenModalButton
                                    className="delete-comment-modal edit-album-modal"
                                    buttonText={<i className="fas fa-edit"></i>}
                                    modalComponent={<EditAlbum individualAlbum={individualAlbum} sessionUser={sessionUser}/>}
                                />
                                <OpenModalButton
                                    className="delete-comment-modal delete-album-modal"
                                    buttonText={<i className="fas fa-trash-alt"></i>}
                                    modalComponent={<DeleteAlbum individualAlbum={individualAlbum} sessionUser={sessionUser}/>}
                                />
                            </>
                            : null
                            }
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
