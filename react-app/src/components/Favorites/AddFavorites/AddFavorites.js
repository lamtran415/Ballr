import { useDispatch, useSelector } from "react-redux";
import { createUserFavoritesThunk } from "../../../store/favoritesReducer";
import "./AddFavorites.css"

const AddFavorites = ( { photoId, setFavoritesChanged } ) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);


    const handleSubmit = async(e) => {
        e.preventDefault();
        await dispatch(createUserFavoritesThunk(sessionUser.id, photoId))
        setFavoritesChanged(true); // Set favoritesChanged to true after adding a new favorite
    }

    return (
        <>
            <i className="far fa-star fa-2x star-icon" onClick={handleSubmit}></i>
        </>
    )


}

export default AddFavorites;
