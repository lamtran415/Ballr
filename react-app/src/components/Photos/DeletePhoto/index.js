import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { deletePhotoThunk } from "../../../store/photoReducer";

const DeletePhoto = ({individualPhoto}) => {
    const dispatch = useDispatch();
    const history =  useHistory();
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault();
        return await dispatch(deletePhotoThunk(individualPhoto.id))
            .then(() => history.push('/photos'))
            .then(() => closeModal())
    }
    return (
        <div className="delete-modal-container">
            <div className="delete-pop-up">
                <div className="delete-header-close-button">
                    <div className="delete-header">Delete Photo</div>
                    <span className="close-edit-button" onClick={() => closeModal()}><i className="fas fa-times"></i></span>
                </div>
                <p className="delete-text-p-tag">Are you sure you want to delete this photo?</p>
                <form className="delete-form-container" onSubmit={handleSubmit}>
                    <button className="cancel-button" onClick={() => closeModal()}>Cancel</button>
                    <button className="delete-button" type="submit">Delete</button>
                </form>
            </div>
        </div>
    )
}

export default DeletePhoto
