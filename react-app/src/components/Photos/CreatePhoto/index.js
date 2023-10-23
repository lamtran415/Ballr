import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPhotoThunk } from "../../../store/photoReducer";
import BallrIcon from '../../Navigation/LogoIcon/ballr-logo.png'
import './CreatePhoto.css'

const CreatePhoto = () => {
    // Initialize React hooks and Redux functionality
    const dispatch = useDispatch();  // Access the dispatch function from Redux
    const history = useHistory();    // Access the React Router history object
    const [title, setTitle] = useState("");          // State for title input
    const [description, setDescription] = useState("");  // State for description input
    const [image, setImage] = useState(null);          // State for the selected image file
    const [imageLoading, setImageLoading] = useState(false);  // State for image upload status
    const [errors, setErrors] = useState([]);  // State for error messages
    const sessionUser = useSelector(state => state.session.user);  // Select user data from the Redux store

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setErrors([]);      // Clear any previous error messages

        const formData = new FormData();
        formData.append("image", image); // Append the selected image to the form data
        setImageLoading(true);  // Set loading state while uploading

        let url;

        // Send a POST request to upload the image
        const res = await fetch('/api/photos/upload', {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
            url = await res.json();
            url = url["url"];
            setImageLoading(false);  // Clear the loading state
        }
        else {
          setImageLoading(false);  // Clear the loading state
          const errors = await res.json().errors;
          setErrors([errors]);  // Set errors in case of upload failure
        }

        const newPhoto = {
            user_id: sessionUser.id,
            title,
            description,
        }

        // Dispatch the createPhotoThunk action with newPhoto data and the image URL
        const photo = await dispatch(createPhotoThunk(newPhoto, url));

        if (Array.isArray(photo)) {
            // Handle validation errors
            const errorMessages = Object.values(photo);
            const formattedErrorMessages = errorMessages.map(error => error.split(": ")[1]);
            setErrors(formattedErrorMessages);
        } else {
            history.push(`/photos/${photo.id}`); // Redirect to the newly created photo's page
        }
    }

    // Update the selected image file
    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        // This section defines the main container for the upload page.
        <div className="upload-page-container">
            <form className="upload-form-container" onSubmit={handleSubmit}>
                // The BallrIcon logo, which is clickable and navigates to the '/photos' page
                <img className="logo-image-form" src={BallrIcon} alt="" onClick={() => history.push('/photos')} />

                <div className="errors-map upload-error-map">
                    {errors?.length > 0 ?
                        // If there are errors, display them in this section
                        errors.map((error) => <div className="upload-errors-div" key={error}>{error}</div>)
                        : null
                    }
                </div>

                <div className="label-tag-container">
                    // Input field for the photo title
                    <label>
                        Title
                        <input
                            className="title-input-field"
                            type="text"
                            name="title"
                            value={title}
                            placeholder="Add title"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>

                    // Text area for photo description (optional)
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

                    // Input field for uploading an image
                    <label className="image-upload-container">
                        <div>Image Upload</div>
                        <input
                            className="image-upload-input"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={updateImage}
                            required
                        />
                        {imageLoading && <p>Loading...</p>}
                    </label>
                </div>

                // Submit button to upload the photo
                <button className="create-photo-btn" type="submit">Upload</button>
            </form>
        </div>
    )
}

export default CreatePhoto;
