import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getPhotoDetailsThunk } from "../../../store/photoReducer";
import AllComments from "../../Comments/AllComments";
import CreateComment from "../../Comments/CreateComment";
import OpenModalButton from "../../OpenModalButton";
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
                    modalComponent={<DeletePhoto individualPhoto={individualPhoto}/>}
                    />
                    : null
                }
            </div>
        )
    }

    useEffect(() => {
        dispatch(getPhotoDetailsThunk(photoId))
            .then(() => (setIsLoaded(true)))

        }, [dispatch, photoId])

    if (!individualPhoto) {
        return (
            <div className="whole-error-page-container">
            {sessionUser ? <Link className="error-home-link" to='/photos'>Go Home</Link> : <Link className="error-home-link" to="/">Go Home</Link>}
        </div>
        )
    };

        return (
            <>
        {isLoaded && (
            <div className="photo-details-container">
                <div className="explore-button" onClick={() => history.push('/photos')}><i className="fas fa-arrow-left fa-inverse fa-s"></i> <span className="back-explore-button">Back to explore</span></div>
                <div className="upper-photo-details-page">
                    <img className="photo-detail-image"
                        src={individualPhoto?.url}
                        alt=""
                        onError={e => { e.currentTarget.src = "http://wallpaperset.com/w/full/5/8/c/119900.jpg"; }}
                    />
                </div>
                {session}
                <div className="photo-description-container">
                    <i className="fas fa-user fa-2x" style={{"color": "orange"}}/>
                    <div className="photo-description-user">
                        <div className="photo-user-name">
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
        )}
        </>
    )
}

export default IndividualPhoto;
