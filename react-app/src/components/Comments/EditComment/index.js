import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editPhotoCommentThunk, getAllCommentsThunk } from "../../../store/commentReducer";
import "./EditComment.css"

const EditComment = ({ individualPhoto, sessionUser, commentInfo, setEditingCommentId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [comment, setComment] = useState(commentInfo.comment);
  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const commentDetails = {
      user_id: sessionUser.id,
      photo_id: individualPhoto.id,
      comment,
    };

    const data = await dispatch(
      editPhotoCommentThunk(commentDetails, commentInfo.id)
    );
    if (Array.isArray(data)) {
      const errorMessages = Object.values(data);
      const formattedErrorMessages = errorMessages.map(error => error.split(": ")[1]);
      setErrors(formattedErrorMessages);
    } else {
        history.push(`/photos/${individualPhoto.id}`);
        setEditingCommentId(null)
        setIsLoaded(true)
    }

    setComment("")
  };

    useEffect(() => {
        return () => {
            dispatch(getAllCommentsThunk(individualPhoto.id))
            setIsLoaded(false)
        }
    }, [dispatch, isLoaded, individualPhoto.id])

  return (
    <>
      <form className="edit-comment-container" onSubmit={handleSubmit}>
        <div className="errors-map">
          {errors?.length > 0 ? errors.map((error) => <div key={error}>{error}</div>) : null}
        </div>
        <div className="edit-comment-input-container">
          <textarea
            type="text"
            name="comment"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
            <button className="edit-form-comment-button" type="submit">Done</button>
        </div>
      </form>
    </>
  );
};

export default EditComment
