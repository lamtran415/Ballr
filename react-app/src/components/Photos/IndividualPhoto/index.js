import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getPhotoDetailsThunk } from "../../../store/photoReducer";
import './IndividualPhoto.css';

const IndividualPhoto = () => {
    const { photoId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const individualPhoto = useSelector(state => state.photos[photoId]);
    console.log(individualPhoto, "WHAT AM I ????????????????????????????")

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
