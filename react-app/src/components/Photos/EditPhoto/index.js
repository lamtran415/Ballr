import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { useModal } from "../../../context/Modal";
import { editPhotoThunk } from "../../../store/photoReducer";
import './EditPhoto.css'

const EditPhoto = ({individualPhoto}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState(individualPhoto.title);
    const [description, setDescription] = useState(individualPhoto.description);
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [photoUrl, setPhotoUrl] = useState(individualPhoto.url);
    const [errors, setErrors] = useState([]);
	const sessionUser = useSelector(state => state.session.user);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        let url;

        if (image) {
            const formData = new FormData();
            formData.append("image", image);
            setImageLoading(true);


            const res = await fetch('/api/photos/upload', {
              method: "POST",
              body: formData,
            });

            if (res.ok) {
                url = await res.json();
                url = url["url"]
                setImageLoading(false);
            }
            else {
              setImageLoading(false);
              const errors = await res.json().errors
              setErrors([errors])
            }
        }

        let updateUrl = photoUrl

        console.log("====================>", url)

        if (url !== undefined) {
            updateUrl = url
        }

        const editPhoto = {
            id: individualPhoto.id,
            user_id: sessionUser.id,
            title,
            description,
            url: updateUrl
        }

        const photo = await dispatch(editPhotoThunk(editPhoto, individualPhoto.id))
        if (Array.isArray(photo)) {
            const errorMessages = Object.values(photo);
            const formattedErrorMessages = errorMessages.map(error => error.split(": ")[1]);
            setErrors(formattedErrorMessages);
        } else {
            history.push(`/photos/${individualPhoto.id}`);
            closeModal()
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <div className="edit-modal-container">
            <div className="edit-header-close-button">
                <div className="edit-photo-header">Edit Photo</div>
                <span className="close-edit-button" onClick={() => closeModal()}><i className="fas fa-times"></i></span>
            </div>
                <form className="edit-form-container" onSubmit={handleSubmit}>
                <div className="errors-map">
                        {errors?.length > 0 ? errors.map((error) => <div key={error}>{error}</div>) : null}
                </div>
                <div className="edit-label-container">
                    <label >
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
                    <label className="edit-upload-image-container">
                        Upload image (Not required)
                        <input
                            // type="url"
                            // name="url"
                            // value={url}
                            // onChange={(e) => setUrl(e.target.value)}
                            // placeholder="Enter an image URL (http://www.example.com/)"
                            // required
                            className="edit-image-upload-input"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={updateImage}
                        />
                    </label>
                    <div className="loading-div">{(imageLoading) && <p>Loading...</p>}</div>
                    <button className="edit-photo-button" type="submit">Edit</button>
                </div>
            </form>
        </div>
    )
}

export default EditPhoto
