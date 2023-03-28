import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPhotoThunk } from "../../../store/photoReducer";
import BallrIcon from '../../Navigation/LogoIcon/ballr-logo.png'
import './CreatePhoto.css'

const CreatePhoto = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState([]);
	const sessionUser = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const formData = new FormData();
        formData.append("image", image);
        setImageLoading(true);

        let url;

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

        const newPhoto = {
            user_id: sessionUser.id,
            title,
            description,
        }

    const photo = await dispatch(createPhotoThunk(newPhoto, url))
    if (Array.isArray(photo)) {
        const errorMessages = Object.values(photo);
        const formattedErrorMessages = errorMessages.map(error => error.split(": ")[1]);
        setErrors(formattedErrorMessages);
        } else {
            history.push(`/photos/${photo.id}`)
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <div className="upload-page-container">
            <form className="upload-form-container" onSubmit={handleSubmit}>
                <img className="logo-image-form" src={BallrIcon} alt="" onClick={() => history.push('/photos')}/>
                <div className="errors-map upload-error-map">
                        {errors?.length > 0 ? errors.map((error) => <div className="upload-errors-div" key={error}>{error}</div>) : null}
                </div>
                <div className="label-tag-container">
                    <label >
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
                    <label className="image-upload-container">
                        <div>Image Upload</div>
                        {/* <i class="fa fa-2x fa-camera"></i> */}
                        <input
                            className="image-upload-input"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={updateImage}
                            required
                        />
                        {(imageLoading) && <p>Loading...</p>}
                    </label>
                </div>
                <button className="create-photo-btn" type="submit">Upload</button>
            </form>
        </div>
    )
}

export default CreatePhoto;
