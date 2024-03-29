import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPhotoCommentThunk, getAllCommentsThunk } from "../../../store/commentReducer";
import { getPhotoDetailsThunk } from "../../../store/photoReducer";
import "./CreateComment.css"

const CreateComment = ({ individualPhoto, sessionUser }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [comment, setComment] = useState("");
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
      createPhotoCommentThunk(commentDetails, individualPhoto.id)
    );
    if (Array.isArray(data)) {
      const errorMessages = Object.values(data);
      const formattedErrorMessages = errorMessages.map(error => error.split(": ")[1]);
      setErrors(formattedErrorMessages);
    } else {
      // history.push(`/photos/${individualPhoto.id}`);
      setIsLoaded(true)
    }

    setComment("")
  };

  useEffect(() => {
      return () => {
        dispatch(getAllCommentsThunk(individualPhoto.id));
        dispatch(getPhotoDetailsThunk(individualPhoto.id));
        setIsLoaded(false);
      }
  }, [dispatch, individualPhoto.id, isLoaded])

  return (
    <>
      <form className="create-comment-container" onSubmit={handleSubmit}>
          <div className="errors-map comment-errors">
            {errors?.length > 0 ? errors.map((error) => <div key={error}>{error}</div>) : null}
        </div>
        <div className="comment-input-container">
          <div className="profile-text-area">
            <button className="profile-button-comment" onClick={() => history.push(`/photos/users/${sessionUser.id}`)}>
            </button>
            <textarea
              type="text"
              name="comment"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
            <button className="create-comment-button" type="submit" onClick={handleSubmit}>Comment</button>
        </div>
      </form>
    </>
  );
};

export default CreateComment;
