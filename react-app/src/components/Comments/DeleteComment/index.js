import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { deletePhotoCommentThunk, getAllCommentsThunk } from "../../../store/commentReducer";
import { getPhotoDetailsThunk } from "../../../store/photoReducer";
import "./DeleteComment.css";

const DeleteComment = ({individualPhoto, commentInfo}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [isLoaded, setIsLoaded] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        return await dispatch(deletePhotoCommentThunk(commentInfo.id))
            // .then(() => history.push(`/photos/${individualPhoto.id}`))
            .then(() => setIsLoaded(true))
            .then(() => closeModal())
    }

    useEffect(() => {
        return () => {
            dispatch(getAllCommentsThunk(individualPhoto.id));
            dispatch(getPhotoDetailsThunk(individualPhoto.id));
            setIsLoaded(false)
        }
    }, [dispatch, individualPhoto.id, isLoaded])

    return (
        <div className="delete-modal-container">
            <div className="delete-pop-up">
                <div className="delete-header-close-button">
                    <div className="delete-header">Delete Comment</div>
                    <span className="close-edit-button" onClick={() => closeModal()}><i className="fas fa-times"></i></span>
                </div>
                <p className="delete-text-p-tag">Are you sure you want to delete this comment?</p>
                <form className="delete-form-container" onSubmit={handleSubmit}>
                    <button className="cancel-button" onClick={() => closeModal()}>Cancel</button>
                    <button className="delete-button" type="submit">Delete</button>
                </form>
            </div>
        </div>
    )
}

export default DeleteComment
