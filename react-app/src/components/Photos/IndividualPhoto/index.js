import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getUserAlbumsThunk } from "../../../store/albumsReducer";
import { getPhotoDetailsThunk } from "../../../store/photoReducer";
import { loadTagsforPhotoThunk } from "../../../store/tagsReducer";
import AllComments from "../../Comments/AllComments";
import CreateComment from "../../Comments/CreateComment";
import ErrorPage from "../../ErrorPage";
import OpenModalButton from "../../OpenModalButton";
import CreateTag from "../../Tags/CreateTag";
import DeleteTag from "../../Tags/DeleteTag";
import DeletePhoto from "../DeletePhoto";
import EditPhoto from "../EditPhoto";
import './IndividualPhoto.css';
import LoadingPage from "../../LoadingPage/LoadingPage";
import { getUserFavoritesThunk } from "../../../store/favoritesReducer";
import AddFavorites from "../../Favorites/AddFavorites/AddFavorites";
import DeleteFavorites from "../../Favorites/DeleteFavorites/DeleteFavorites";

const IndividualPhoto = () => {
    const { photoId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const individualPhoto = useSelector(state => state.photos.allPhotos[photoId]);
	const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        const fetchPhotoDetailsAndUserAlbums = async () => {
            const photo = await dispatch(getPhotoDetailsThunk(+photoId))
            await dispatch(getUserAlbumsThunk(+photo.user_id))
            await dispatch(loadTagsforPhotoThunk(+photoId))
            setIsLoaded(true)
        };
        fetchPhotoDetailsAndUserAlbums();

        if (sessionUser) {
            dispatch(getUserFavoritesThunk(sessionUser.id))
        }
    }, [dispatch, photoId, individualPhoto?.user_id, sessionUser]);

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

    const userFavorites = useSelector(
        (state) => state.favorites[sessionUser?.id]?.photos);

    const photoIds = new Set(userFavorites?.map((photo) => photo.id));

    console.log(photoIds)

    let session;
    if (sessionUser !== null) {
        session = (
            <div className="edit-delete-button">
                {
                    sessionUser ?
                        (!photoIds.has(individualPhoto?.id) ?
                        <AddFavorites
                            photoId={individualPhoto?.id}
                            setFavoritesChanged={setFavoritesChanged}
                            className="custom-add-favorites-button"
                        />
                        :
                        <DeleteFavorites
                            photoId={individualPhoto?.id}
                            setFavoritesChanged={setFavoritesChanged}
                            className="custom-delete-favorites-button"
                        />
                        )
                        : null
                }
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
                        <NavLink style={{textDecoration: 'none'}} className="album-card-wrapper" key={album?.id} to={`/photos/users/${album?.user_id}/albums/${album?.id}`}>
                            <div className="album-pic-name-container">
                                <img className="album-cover-pic" src={album.photos[Math.floor(Math.random() * album.photos.length)].url} alt=""/>
                                <div className="album-info-right-of-pic">
                                    <span className="album-name-color">{album?.name}</span>
                                    <div className="album-photo-length-div">{`${album?.photos?.length} ${album?.photos?.length > 1 ? 'items' : 'item'}`}</div>
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
    if (photoTag?.length) {
        {showPhotoTag = (
            <div className="whole-tags-container">
                {photoTag.map((tag) => (
                    <div className="each-tag-div" key={tag.id} onClick={() => history.push(`/tags/${tag.id}`)}>
                        <button className={sessionUser !== null && sessionUser?.id === individualPhoto?.user_id ? "user-tag-names" : "tag-names"}>
                                <div className="tag-name-text">{tag?.tag_name}</div>{sessionUser !== null && sessionUser?.id === individualPhoto?.user_id ? <DeleteTag individualPhoto={individualPhoto} tag={tag} /> : null}
                        </button>
                    </div>
                ))}
            </div>
        )}
    } else showPhotoTag = null

    if (!individualPhoto) {
        return <ErrorPage />
    }

    return (
    <>
        {(!individualPhoto || !isLoaded) && (
            <LoadingPage />
        )}

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
                                <i className="fas fa-user fa-2x" style={{"color": "orange", "cursor": "pointer"}} onClick={() => history.push(`/photos/users/${individualPhoto?.user_id}`)}/>
                                <div className="photo-description-user">
                                    <div className="photo-user-name" onClick={() => history.push(`/photos/users/${individualPhoto?.user_id}`)}>
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
                            <span className="right-side-comment-number">{individualPhoto?.comment?.length}</span>
                            <div className="comments-text">{individualPhoto?.comment?.length > 1 ? `comments` : `comment`}</div>
                            <div className="photo-in-album-text">This photo is in {newAlbumArr?.length > 1 ? `${newAlbumArr?.length} albums` : `${newAlbumArr?.length} album`}</div>
                            {showAlbums}
                            <div className="tags-word-title">{photoTag?.length || sessionUser?.id === individualPhoto?.user_id ? "Tags" : null}</div>
                            {sessionUser !== null && sessionUser?.id === individualPhoto.user_id ? <CreateTag individualPhoto={individualPhoto} sessionUser={sessionUser}/> : null}
                            {showPhotoTag}
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
    )
}

export default IndividualPhoto;
