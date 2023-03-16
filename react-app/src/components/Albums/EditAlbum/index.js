import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { editUserAlbumThunk } from "../../../store/albumsReducer";


const EditAlbum = ({individualAlbum, sessionUser}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [ name, setName ] = useState(individualAlbum.name);
    const [ description, setDescription ] = useState(individualAlbum.description);
    const [ selectedPhotos, setSelectedPhotos ] = useState(individualAlbum.photos);
    const [ errors, setErrors ] = useState([]);
    const { closeModal } = useModal();

    const userPhotos = Object.values(useSelector(state => state.photos));


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const albumDetails = {
            user_id: sessionUser.id,
            name,
            description,
            photo_ids: selectedPhotos.map(photo => photo.id)
        }

        const album = await dispatch(editUserAlbumThunk(individualAlbum.id, albumDetails))
        if (Array.isArray(album)) {
            const errorMessages = Object.values(album);
            const formattedErrorMessages = errorMessages.map(error => error.split(": ")[1]);
            setErrors(formattedErrorMessages);
            } else {
                history.push(`/photos/users/${sessionUser.id}/albums/${album.id}`)
                closeModal()
            }
    }

    const handlePhotoSelect = (photo) => {
        if (selectedPhotos.some(p => p.id === photo.id)) {
            setSelectedPhotos(selectedPhotos.filter(p => p.id !== photo.id));
        } else {
            setSelectedPhotos([...selectedPhotos, photo]);
        }
    }

    const isSelected = (photo) => {
        return selectedPhotos.some((p) => p.id === photo.id);
      };

    const atLeastOnePhotoSelected = selectedPhotos.length > 0;

    return (
        <div className="album-modal-container">
            <div className="edit-header-close-button">
                <div className="edit-photo-header">Edit Album</div>
                <span className="close-edit-button" onClick={() => closeModal()}><i className="fas fa-times"></i></span>
            </div>
                <form className="album-form-container" onSubmit={handleSubmit}>
                <div className="errors-map">
                        {errors?.length > 0 ? errors.map((error) => <div key={error}>{error}</div>) : null}
                </div>
                <div className="edit-label-container">
                    <label >
                        Name
                        <input
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Add name"
                            onChange={(e) => setName(e.target.value)}
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
                            {selectedPhotos.length === 0 && (
                                <div className="errors-map">Please select at least one photo.</div>
                            )}
                    <label>
                        Photos
                        <div className="photo-select-container">
                            {userPhotos.map((photo) => (
                            <div
                                key={photo.id}
                                className={`photo-select-label ${isSelected(photo) ? "selected" : ""}`}
                                onClick={() => handlePhotoSelect(photo)}
                            >
                                <img
                                src={photo.url}
                                alt=""
                                className="select-photo-img"
                                onError={e => { e.currentTarget.src = "http://wallpaperset.com/w/full/5/8/c/119900.jpg"; }}
                                />
                            </div>
                            ))}
                        </div>
                        </label>
                        <button className={`create-album-submit ${selectedPhotos.length > 0 ? "" : "grayed-out"}`} type="submit" disabled={selectedPhotos.length === 0}>Edit Album</button>
                </div>
            </form>
        </div>
    )
}

export default EditAlbum;
