import { useDispatch, useSelector } from "react-redux";
import { deleteUserFavoritesThunk } from "../../../store/favoritesReducer";

const DeleteFavorites = ( { photoId, setFavoritesChanged, className } ) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);


    const handleSubmit = async(e) => {
        e.preventDefault();
        await dispatch(deleteUserFavoritesThunk(sessionUser.id, photoId))
        setFavoritesChanged(true); // Set favoritesChanged to true after adding a new favorite

    }

    return (
        <>
            <i className={`fas fa-star fa-2x star-icon ${className}`}onClick={handleSubmit}></i>
        </>
    )


}

export default DeleteFavorites;
