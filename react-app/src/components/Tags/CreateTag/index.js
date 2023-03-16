import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewTagThunk, loadTagsforPhotoThunk } from "../../../store/tagsReducer";
import './CreateTag.css'

const CreateTag = ({individualPhoto}) => {
    const dispatch = useDispatch();
    const [ tagName, setTagName ] = useState("");
    const [ errors, setErrors ] = useState([]);
    const individualPhotoTag = Object.values(useSelector(state => state.tags))
    const tagNameArr = individualPhotoTag.map(tag => tag.tag_name)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const tagDetails = {
            tag_name: tagName
        }

        if (tagNameArr.includes(tagName.toLowerCase())) {
            setErrors(["Tag already exists for photo"])
            return
        }

        if (tagName.length < 2 || tagName.length > 25) {
            setErrors(["Tag must be 2 - 25 characters long"])
            return
        }

        if (tagName.includes(" ")) {
            setErrors(["Tag must have no spaces"])
            return
        }

        const tag = await dispatch(createNewTagThunk(individualPhoto.id, tagDetails))
        if (Array.isArray(tag)) {
            const errorMessages = Object.values(tag);
            const formattedErrorMessages = errorMessages.map(error => error.split(": ")[1]);
            setErrors(formattedErrorMessages);
        } else {
                dispatch(loadTagsforPhotoThunk(individualPhoto.id))
                setTagName("")
                setErrors([])
        }
    }
    return (
        <div className="whole-tag-container">
                <span className="errors-map">
                    {errors?.length > 0 ? errors.map((error) => <div key={error}>{error}</div>) : null}
                </span>
            <form className="tag-form-container" onSubmit={handleSubmit}>
                <input
                className="tag-input-field"
                placeholder="Add a tag"
                type="text"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                required
                />
                <button className="add-tag-btn" type="submit">Add Tag</button>
            </form>
        </div>
    )
}

export default CreateTag;
