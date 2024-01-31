import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { editPhotoThunk } from "../../../store/photoReducer";
import './EditPhoto.css'

const EditPhoto = ({ individualPhoto }) => {
    // Initialize React hooks and Redux functionality
    const dispatch = useDispatch();  // Access the dispatch function from Redux
    const history = useHistory();    // Access the React Router history object

    // State variables to store form input values and errors
    const [title, setTitle] = useState(individualPhoto.title);
    const [description, setDescription] = useState(individualPhoto.description);
    const [image, setImage] = useState(null);  // Stores the selected image file
    const [imageLoading, setImageLoading] = useState(false);  // Loading state for image upload
    const [photoUrl, setPhotoUrl] = useState(individualPhoto.url);
    const [errors, setErrors] = useState([]);  // Stores error messages
    const sessionUser = useSelector(state => state.session.user);  // Select user data from the Redux store
    const { closeModal } = useModal();  // Access the modal context for closing the modal

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the default form submission behavior
        setErrors([]);  // Clear any previous error messages

        let url;

        if (image) {
            // Create a new FormData object, which is used to construct form data to be sent in an HTTP request
            const formData = new FormData();
            // Append the selected image to the form data with the field name "image"
            formData.append("image", image);
            setImageLoading(true);  // Set loading state while uploading

            // Send a POST request to upload the image
            const res = await fetch('/api/photos/upload', {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                // reassign url if successful response from fetch
                url = await res.json();
                url = url["url"];
                setImageLoading(false);  // Clear the loading state
            } else {
                setImageLoading(false);  // Clear the loading state
                const errors = await res.json().errors;
                setErrors([errors]);  // Set errors in case of upload failure
            }
        }

        // Create a variable 'updateUrl' and initialize it with the current 'photoUrl'
        let updateUrl = photoUrl;

        // Check if 'url' (the URL of the uploaded image) is defined and not 'undefined'
        if (url !== undefined) {
            // If 'url' is defined, update 'updateUrl' with its value
            updateUrl = url;
        }

        // Create an object 'editPhoto' to represent the edited photo data
        const editPhoto = {
            // Include the 'id' of the individual photo being edited
            id: individualPhoto.id,
            // Include the 'user_id' from the session user who is editing the photo
            user_id: sessionUser.id,
            // Include the updated 'title' entered by the user
            title,
            // Include the updated 'description' entered by the user
            description,
            // Include the 'url' for the photo, which is either the original 'photoUrl' or the newly uploaded 'url'
            url: updateUrl
        }

        // Dispatch the editPhotoThunk action with editPhoto data and the image URL
        const photo = await dispatch(editPhotoThunk(editPhoto, individualPhoto.id));

        if (Array.isArray(photo)) {
            // Handle validation errors
            const errorMessages = Object.values(photo);
            const formattedErrorMessages = errorMessages.map(error => error.split(": ")[1]);
            setErrors(formattedErrorMessages);
        } else {
            // Redirect to the edited photo's page and close the modal
            history.push(`/photos/${individualPhoto.id}`);
            closeModal();
        }
    }

    // Handle image input change
    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        // This section defines the main container for editing a photo
        <div className="edit-modal-container">
            <div className="edit-header-close-button">
                <div className="edit-photo-header">Edit Photo</div>
                <span className="close-edit-button" onClick={() => closeModal()}>
                    <i className="fas fa-times"></i>
                </span>
            </div>
            <form className="edit-form-container" onSubmit={handleSubmit}>
                <div className="errors-map">
                    {errors?.length > 0 ?
                        // If there are errors, display them in this section
                        errors.map((error) => <div key={error}>{error}</div>)
                        : null
                    }
                </div>
                <div className="edit-label-container">
                    {/* Input field for the photo title */}
                    <label>
                        Title
                        <input
                            className="edit-title-input"
                            type="text"
                            name="title"
                            value={title}
                            placeholder="Add title"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    {/* Text area for photo description (optional) */}
                    <label>
                        Description
                        <textarea
                            type="text"
                            name="description"
                            value={description}
                            placeholder="Optional"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    {/* Input field for uploading an image (not required) */}
                    <label className="edit-upload-image-container">
                        Upload image (Not required)
                        <input
                            className="edit-image-upload-input"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={updateImage}
                        />
                    </label>
                    <div className="loading-div">{imageLoading && <p>Loading...</p>}</div>
                    {/* Submit button for editing the photo */}
                    <button className="edit-photo-button" type="submit">Edit</button>
                </div>
            </form>
        </div>
    )
}

export default EditPhoto;
