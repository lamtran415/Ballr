import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getPhotoDetailsThunk } from "../../../store/photoReducer";
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
                    buttonText="Edit Photo"
                    modalComponent={<EditPhoto individualPhoto={individualPhoto}/>}
                    />
                    : null
                }
                {sessionUser?.id === individualPhoto?.user_id ?
                    <OpenModalButton
                    buttonText="Delete Photo"
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

    return (
        <>
        {isLoaded && (
            <div className="photo-details-container">
                <div className="explore-button" onClick={() => history.push('/photos')}><i className="fas fa-arrow-left fa-inverse"></i> Back to explore</div>
                <div className="upper-photo-details-page">
                    <img className="photo-detail-image" src={individualPhoto?.url}/>
                </div>
                {session}
                <div className="photo-description-container">
                    <i className="fas fa-user fa-2x" />
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
            </div>
        )}
        </>
    )
}

export default IndividualPhoto;