import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPhotoThunk, getPhotoDetailsThunk } from "../../../store/photoReducer";
import './CreatePhoto.css'

const CreatePhoto = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("")
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false);
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
            setErrors(photo)
        } else {
            history.push(`/photos/${photo.id}`)
        }
    }

    return (
        <div className="upload-page-container">
            <form className="upload-form-container" onSubmit={handleSubmit}>
                <ul className="errors-map">
                        {errors?.length > 0 ? errors.map((error) => <li key={error}>{error}</li>) : null}
                </ul>
                <div className="label-tag-container">
                    <label >
                        Title
                        <input
                            type="text"
                            name="title"
                            value={title}
                            placeholder="Enter a title"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Description
                        <input
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
