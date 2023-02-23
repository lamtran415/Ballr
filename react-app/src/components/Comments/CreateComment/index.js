import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPhotoCommentThunk } from "../../../store/commentReducer";

const CreateComment = ({ individualPhoto, sessionUser }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);

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
      setErrors(data);
    } else {
      history.push(`/photos/${individualPhoto.id}`);
    }

    setComment("")
  };

  return (
    <>
      <h4>Add a Comment</h4>
      <form className="create-comment-container" onSubmit={handleSubmit}>
        <ul className="errors-map">
          {errors?.length > 0 ? errors.map((error) => <li key={error}>{error}</li>) : null}
        </ul>
        <div className="comment-input-container">
          <textarea
            type="text"
            name="comment"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
            <button className="comment-button" type="submit" onClick={handleSubmit}>Comment</button>
        </div>
      </form>
    </>
  );
};

export default CreateComment;
