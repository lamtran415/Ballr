import { useState } from "react";
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
    const [url, setUrl] = useState("")
    const [errors, setErrors] = useState([]);
	const sessionUser = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newPhoto = {
            user_id: sessionUser.id,
            title,
            description,
            url
        }

    const photo = await dispatch(createPhotoThunk(newPhoto))
    if (Array.isArray(photo)) {
        const errorMessages = Object.values(photo);
        const formattedErrorMessages = errorMessages.map(error => error.split(": ")[1]);
        setErrors(formattedErrorMessages);
        } else {
            history.push(`/photos/${photo.id}`)
        }
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
                    <label>
                        Image URL
                        <input
                            type="url"
                            name="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter an image URL (http://www.example.com/)"
                            required
                        />
                    </label>
                </div>
                <button className="create-photo-btn" type="submit">Upload</button>
            </form>
        </div>
    )
}

export default CreatePhoto;
