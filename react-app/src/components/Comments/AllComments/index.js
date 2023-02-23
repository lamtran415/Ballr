import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllCommentsThunk } from "../../../store/commentReducer";
import OpenModalButton from "../../OpenModalButton";
import DeleteComment from "../DeleteComment";
import EditComment from "../EditComment";

const AllComments = ({individualPhoto}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCommentsThunk(individualPhoto.id))
    }, [dispatch, individualPhoto.id])

    const sessionUser = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments)
    const commentsArr = Object.values(comments)
    const [editingCommentId, setEditingCommentId] = useState(null);
    if (!commentsArr) return null;

    return (
        <div className="whole-comments-container">
            <h3>Comments</h3>
            <div className="comment-information">
                {commentsArr.map((comment) => (
                    <div key={comment.id}>
                        <div className="comment-image">
                            <i className="fas fa-user-circle fa-2x" />
                        </div>
                        <div className="comment-name-info">
                            {comment.user.first_name} {comment.user.last_name}
                        </div>
                        {editingCommentId === comment.id ?
                            <EditComment
                                individualPhoto={individualPhoto}
                                sessionUser={sessionUser}
                                commentInfo={comment}
                                setEditingCommentId={setEditingCommentId}
                            />
                            :
                            <div className="actual-comment">
                                {comment.comment}
                            </div>
                        }
                        {sessionUser !== null && sessionUser.id === comment.user_id && editingCommentId !== comment.id ?
                            <>
                                <i className="fas fa-edit" onClick={() => setEditingCommentId(comment.id)}></i>
                                <OpenModalButton
                                    buttonText={<i className="fas fa-trash-alt"></i>}
                                    modalComponent={<DeleteComment individualPhoto={individualPhoto} commentInfo={comment}/>}
                                />
                            </>

                            : null
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllComments
