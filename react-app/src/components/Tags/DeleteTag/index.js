import { useDispatch } from 'react-redux';
import { deletePhotoTagThunk, loadTagsforPhotoThunk } from '../../../store/tagsReducer';
import "./DeleteTag.css"

const DeleteTag = ({individualPhoto, tag}) => {
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        e.preventDefault();

        await dispatch(deletePhotoTagThunk(individualPhoto.id, tag.id))
        .then(() => dispatch(loadTagsforPhotoThunk(individualPhoto.id)))
    }
    return (
        <div className='delete-tag-btn' onClick={handleDelete}><i className="fas fa-times"></i></div>
    )
}

export default DeleteTag;
