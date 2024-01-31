import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { deletePhotoThunk } from "../../../store/photoReducer";

const DeletePhoto = ({ individualPhoto, sessionUser }) => {
    // Get access to the Redux 'dispatch' function
    const dispatch = useDispatch();

    // Access the 'history' object to navigate to other routes
    const history = useHistory();

    // Access the 'closeModal' function from a context
    const { closeModal } = useModal();

    // Handle form submission to delete a photo
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Display a confirmation dialog and proceed if confirmed
        const confirmed = window.confirm(
            `Hey ${sessionUser?.first_name}! This photo will be permanently removed, are you sure?`
        );

        if (confirmed) {
            // Dispatch the 'deletePhotoThunk' action with the photo ID
            await dispatch(deletePhotoThunk(individualPhoto?.id))
                .then(() => window.alert(`${individualPhoto?.title} Photo ID:${individualPhoto?.id} has been deleted.`))
                .then(() => history.push('/photos'))  // Redirect to the '/photos' route
                .then(() => closeModal());  // Close the modal
        }
    }

    return (
        <div className="delete-modal-container">
            {/* Container for the delete confirmation dialog */}
            <div className="delete-pop-up">
                <div className="delete-header-close-button">
                    {/* Header section with the title and a close button */}
                    <div className="delete-header">Delete Photo</div>
                    {/* Close button */}
                    <span className="close-edit-button" onClick={() => closeModal()}>
                        <i className="fas fa-times"></i>
                    </span>
                </div>
                {/* Confirmation message */}
                <p className="delete-text-p-tag">Are you sure you want to delete this photo?</p>
                <form className="delete-form-container" onSubmit={handleSubmit}>
                    {/*  "Cancel" button to cancel the delete operation */}
                    <button className="cancel-button" onClick={() => closeModal()}>Cancel</button>
                    {/*  "Delete" button to confirm and initiate the deletion */}
                    <button className="delete-button" type="submit">Delete</button>
                </form>
            </div>
        </div>
    );
}

export default DeletePhoto;
