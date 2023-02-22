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
                <h2>Delete this photo?</h2>
                <p>(Are you sure you want to delete this photo?)</p>
                <form onSubmit={handleSubmit}>
                <button className="delete-button" type="submit">Confirm Delete</button>
                </form>
            </div>
        </div>
    )
}

export default DeletePhoto
