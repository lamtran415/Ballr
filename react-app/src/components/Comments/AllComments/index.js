import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllCommentsThunk } from "../../../store/commentReducer";
import OpenModalButton from "../../OpenModalButton";
import DeleteComment from "../DeleteComment";
import EditComment from "../EditComment";
import './AllComments.css'

const AllComments = ({individualPhoto}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCommentsThunk(individualPhoto?.id))
    }, [dispatch, individualPhoto.id])

    const sessionUser = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments)
    const commentsArr = Object.values(comments)
    const [editingCommentId, setEditingCommentId] = useState(null);
    if (!commentsArr) return null;

    return (
        <div className="whole-comments-container">
            <div className="comment-information">
                {commentsArr.map((comment) => (
                    <div className="flex-comment-div" key={comment.id}>
                        <div className="left-comment-side">
                            <div className="comment-image">
                                <i className="fas fa-user-circle fa-2x" style={{"color": "#128FDC"}}/>
                            </div>
                        </div>
                        <div className="right-comment-side">
                            <div className="name-buttons-container">
                                <div className="comment-name-info">
                                    {comment.user.first_name} {comment.user.last_name}

                                </div>
                                <div className="edit-delete-comment-button">
                                    {sessionUser !== null && sessionUser.id === comment.user_id && editingCommentId !== comment.id ?
                                    <>
                                        <i className="fas fa-edit edit-comment-button" onClick={() => setEditingCommentId(comment.id)}></i>
                                        <OpenModalButton
                                            className="delete-comment-modal"
                                            buttonText={<i className="fas fa-trash-alt"></i>}
                                            modalComponent={<DeleteComment individualPhoto={individualPhoto} commentInfo={comment}/>}
                                        />
                                    </>

                                        : null
                                    }
                                </div>
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllComments
