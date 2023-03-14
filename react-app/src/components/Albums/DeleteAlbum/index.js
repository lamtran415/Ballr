import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { deleteUserAlbumThunk, getUserAlbumsThunk } from "../../../store/albumsReducer";
import './DeleteAlbum.css'

const DeleteAlbum = ({individualAlbum, sessionUser}) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { closeModal } = useModal()
    const [isLoaded, setIsLoaded] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        return await dispatch(deleteUserAlbumThunk(individualAlbum.id))
        .then(() => history.push(`/photos/users/${sessionUser.id}/albums`))
        .then(() => setIsLoaded(true))
        .then(() => closeModal())
    }

    useEffect(() => {
        return () => {
            dispatch(getUserAlbumsThunk(sessionUser.id))
            setIsLoaded(false)
        }
    }, [dispatch])

    return (
        <div className="delete-modal-container">
            <div className="delete-pop-up">
                <div className="delete-header-close-button">
                    <div className="delete-header">Confirmation</div>
                    <span className="close-edit-button" onClick={() => closeModal()}><i className="fas fa-times"></i></span>
                </div>
                <p className="delete-text-p-tag">Do you really want to delete this album? (Don’t worry, none of the contents will be deleted.)</p>
                <form className="delete-form-container" onSubmit={handleSubmit}>
                    <button className="cancel-button album-cancel-button" onClick={() => closeModal()}>Cancel</button>
                    <button className=" album-delete-button" type="submit">OK</button>
                </form>
            </div>
        </div>
    )
}

export default DeleteAlbum;
