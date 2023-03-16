import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import { getUserAlbumsThunk } from "../../../store/albumsReducer";
import { getPhotoDetailsThunk } from "../../../store/photoReducer";
import { loadTagsforPhotoThunk } from "../../../store/tagsReducer";
import AllComments from "../../Comments/AllComments";
import CreateComment from "../../Comments/CreateComment";
import OpenModalButton from "../../OpenModalButton";
import CreateTag from "../../Tags/CreateTag";
import DeleteTag from "../../Tags/DeleteTag";
import DeletePhoto from "../DeletePhoto";
import EditPhoto from "../EditPhoto";
import './IndividualPhoto.css';

const IndividualPhoto = () => {
    const { photoId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const individualPhoto = useSelector(state => state.photos[photoId]);
	const sessionUser = useSelector(state => state.session.user);

    let session;
    if (sessionUser !== null) {
        session = (
            <div className="edit-delete-button">
                {sessionUser?.id === individualPhoto?.user_id ?
                    <OpenModalButton
                    className="edit-photo-modal-button"
                    buttonText={<i className="fas fa-edit"></i>}
                    modalComponent={<EditPhoto individualPhoto={individualPhoto}/>}
                    />
                    : null
                }
                {sessionUser?.id === individualPhoto?.user_id ?
                    <OpenModalButton
                    className="delete-photo-modal-button"
                    buttonText={<i className="fas fa-trash-alt"></i>}
                    modalComponent={<DeletePhoto individualPhoto={individualPhoto} sessionUser={sessionUser}/>}
                    />
                    : null
                }
            </div>
        )
    }
    useEffect(() => {
        const fetchPhotoDetailsAndUserAlbums = async () => {
            await dispatch(getPhotoDetailsThunk(photoId))
            .then(() => setIsLoaded(true))
            .then(() => dispatch(getUserAlbumsThunk(individualPhoto?.user_id)))
            .then(() => dispatch(loadTagsforPhotoThunk(photoId)))
        };
        fetchPhotoDetailsAndUserAlbums();
    }, [dispatch, photoId, individualPhoto?.user_id]);

    const photoAlbum = Object.values(useSelector(state => state.albums))
    const newAlbumArr = [];
    photoAlbum.forEach(album => {
        album.photos.forEach(photo => {
            if (photo.id === +photoId) {
                newAlbumArr.push(album)
            }
        })
    });

    let showAlbums;
    if (newAlbumArr.length) {
        {showAlbums = (
            <div className="album-navlink-container">
                {newAlbumArr.map((album) => (
                        <NavLink style={{textDecoration: 'none'}} className="album-card-wrapper" key={album?.id} to={`/photos/users/${album.user_id}/albums/${album.id}`}>
                            <div className="album-pic-name-container">
                                <img className="album-cover-pic" src={album.photos[0].url} alt=""/>
                                <div className="album-info-right-of-pic">
                                    <span className="album-name-color">{album.name}</span>
                                    <div className="album-photo-length-div">{`${album.photos.length} ${album.photos.length > 1 ? 'items' : 'item'}`}</div>
                                </div>
                            </div>
                        </NavLink>
                ))}
            </div>
        )

    }
    } else {
        showAlbums = null;
    }

    const photoTag = Object.values(useSelector(state => state.tags))
    let showPhotoTag;
    if (photoTag.length) {
        {showPhotoTag = (
            <div className="whole-tags-container">
                {photoTag.map((tag) => (
                    <div className="each-tag-div" key={tag.id}>
                        <button className="tag-names">
                                <div className="tag-name-text">{tag.tag_name}</div>{sessionUser !== null && sessionUser.id === individualPhoto.user_id ? <DeleteTag individualPhoto={individualPhoto} tag={tag} /> : null}
                        </button>
                    </div>
                ))}
            </div>
        )}
    } else showPhotoTag = null

    if (!individualPhoto && isLoaded) {
        return (
            <div className="whole-error-page-container">
            {sessionUser ? <Link className="error-home-link" to='/photos'>Go Home</Link> : <Link className="error-home-link" to="/">Go Home</Link>}
        </div>
        )
    };

        return (
        <div className="whole-individual-photo-container">
        {isLoaded && (
                <div className="photo-details-container">
                    <div className="explore-button" onClick={() => history.goBack()}><i className="fas fa-arrow-left fa-inverse fa-s"></i> <span className="back-explore-button">Back to previous</span></div>
                    <div className="upper-photo-details-page">
                        <img className="photo-detail-image"
                            src={individualPhoto?.url}
                            alt=""
                            onError={e => { e.currentTarget.src = "http://wallpaperset.com/w/full/5/8/c/119900.jpg"; }}
                        />
                    </div>
                    {session}
                    <div className="flex-user-info-albums">
                        <div className="user-info-and-comment-section">
                            <div className="photo-description-container">
                                <i className="fas fa-user fa-2x" style={{"color": "orange", "cursor": "pointer"}} onClick={() => history.push(`/photos/users/${individualPhoto.user_id}`)}/>
                                <div className="photo-description-user">
                                    <div className="photo-user-name" onClick={() => history.push(`/photos/users/${individualPhoto.user_id}`)}>
                                        {`${individualPhoto?.user.first_name} ${individualPhoto?.user.last_name}`}
                                    </div>
                                    <div className="photo-title-div">
                                        {individualPhoto?.title}
                                    </div>
                                    <div className="actual-description-div">
                                        {individualPhoto?.description}
                                    </div>
                                </div>
                            </div>
                            <div className="comment-section-container">
                                <AllComments individualPhoto={individualPhoto} />
                                {sessionUser ? <CreateComment individualPhoto={individualPhoto} sessionUser={sessionUser} /> : null}
                            </div>
                        </div>
                        <div className="whole-tags-albums-right-side">
                            <span className="right-side-comment-number">{individualPhoto.comment.length}</span>
                            <div className="comments-text">{individualPhoto.comment.length > 1 ? `comments` : `comment`}</div>
                            <div className="photo-in-album-text">This photo is in {newAlbumArr.length > 1 ? `${newAlbumArr.length} albums` : `${newAlbumArr.length} album`}</div>
                            {showAlbums}
                            <div className="tags-word-title">Tags</div>
                            {sessionUser !== null && sessionUser.id === individualPhoto.user_id ? <CreateTag individualPhoto={individualPhoto}/> : null}
                            {showPhotoTag}
                        </div>
                    </div>
                </div>
        )}
        </div>
    )
}

export default IndividualPhoto;
