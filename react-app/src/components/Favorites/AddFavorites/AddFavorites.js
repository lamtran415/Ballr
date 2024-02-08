import { useDispatch, useSelector } from "react-redux";
import { createUserFavoritesThunk } from "../../../store/favoritesReducer";

const AddFavorites = ( { photoId } ) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);


    const handleSubmit = async(e) => {
        e.preventDefault();
        const newFavorite = await dispatch(createUserFavoritesThunk(sessionUser.id, photoId))

    }

    return (
        <>
            <i className="far fa-star fa-2x" onClick={handleSubmit}></i>
        </>
    )


}

export default AddFavorites;
