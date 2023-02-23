import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { deletePhotoCommentThunk, getAllCommentsThunk } from "../../../store/commentReducer";

const DeleteComment = ({individualPhoto, commentInfo}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [isLoaded, setIsLoaded] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        return await dispatch(deletePhotoCommentThunk(commentInfo.id))
            .then(() => history.push(`/photos/${individualPhoto.id}`))
            .then(() => setIsLoaded(true))
            .then(() => closeModal())
    }

    useEffect(() => {
        return () => {
            dispatch(getAllCommentsThunk(individualPhoto.id))
            setIsLoaded(false)
        }
    }, [dispatch, individualPhoto.id, isLoaded])

    return (
        <div className="delete-modal-container">
        <div className="delete-pop-up">
            <h2>Delete this photo</h2>
            <p>Are you sure you want to delete this comment?</p>
            <form onSubmit={handleSubmit}>
                <button className="delete-button" type="submit">Delete</button>
            </form>
        </div>
    </div>
    )
}

export default DeleteComment
