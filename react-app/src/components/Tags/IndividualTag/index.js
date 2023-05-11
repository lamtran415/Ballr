import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { loadAllPhotosForTagThunk } from "../../../store/tagsReducer";
import "./IndividualTag.css"
import ErrorPage from "../../ErrorPage";

const IndividualTag = () => {
    const { tagId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllPhotosForTagThunk(tagId))
    }, [dispatch, tagId])

    const tag = useSelector(state => state.tags)[tagId]

    console.log(tag)

    if (!tag || tag?.photos.length === 0) {
        return <ErrorPage />
    }

    return (
        <>
        <div className="all-tag-photos-container">
            <div className="wrapper-all-photos">
                {tag?.photos.map((photo) => (
                    <NavLink style={{textDecoration: 'none'}} className="photo-card-wrapper" key={photo?.id} to={`/photos/${photo?.id}`}>
                        <div
                            className='photo-card'
                            >
                            <img
                                className="each-photo"
                                src={photo.url}
                                alt=""
                                onError={e => { e.currentTarget.src = "http://wallpaperset.com/w/full/5/8/c/119900.jpg"; }}
                                />
                            <div className="photo-information">
                                    <div className="photo-title">{photo?.title}</div>
                                    <div className="user-comment-section">
                                        <div className="user-name-div">by {photo.user?.first_name} {photo.user?.last_name}</div>
                                        <div className="number-of-comments"><i className="far fa-comment fa-2x"></i><span className="comment-length">{photo.comment?.length}</span></div>
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

export default IndividualTag;
