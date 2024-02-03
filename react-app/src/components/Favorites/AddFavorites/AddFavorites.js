import { useSelector } from "react-redux";

const AddFavorites = () => {
    const sessionUser = useSelector((state) => state.session.user)
}

export default AddFavorites;
