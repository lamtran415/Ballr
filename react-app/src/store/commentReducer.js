const GET_COMMENTS_PHOTO = 'comments/getPhotoComments';
const CREATE_COMMENT_PHOTO = 'comments/createPhotoComment';
const EDIT_COMMENT_PHOTO = 'comments/editPhotoComment';
const DELETE_COMMENT_PHOTO = 'comments/deletePhotoComment'

// Action Creators
const loadCommentsForPhoto = (comments) => ({
    type: GET_COMMENTS_PHOTO,
    comments
})

const createCommentForPhoto = (comment) => ({
    type: CREATE_COMMENT_PHOTO,
    comment
})

const editCommentForPhoto = (comment) => ({
    type: EDIT_COMMENT_PHOTO,
    comment
})

const deleteCommentForPhoto = (commentId) => ({
    type: DELETE_COMMENT_PHOTO,
    commentId
})

// Thunks
export const getAllCommentsThunk = (photoId) => async (dispatch) => {
    const res = await fetch(`/api/photos/${photoId}/comments`);

    if (res.ok) {
        const photoComments = await res.json();
        dispatch(loadCommentsForPhoto(photoComments));
        return photoComments
    }

    return res;
}

export const createPhotoCommentThunk = (commentDetails, photoId) => async (dispatch) => {
    const res = await fetch(`/api/photos/${photoId}/comments`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(commentDetails)
    })

    if (res.ok) {
        const newComment = await res.json();
        dispatch(createCommentForPhoto(newComment));
        return newComment;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }

    return res;
}

export const editPhotoCommentThunk = (commentDetails, commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(commentDetails)
    })

    if (res.ok) {
        const editComment = await res.json();
        dispatch(editCommentForPhoto(editComment));
        return editComment;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
		return ["An error occurred. Please try again."];
	}

    return res;
}

export const deletePhotoCommentThunk = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        await dispatch(deleteCommentForPhoto(commentId))
    }

    return res;
}

const initialState = {};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS_PHOTO: {
            const getAllCommentState = {};
            action.comments.comments.forEach(comment => {
                getAllCommentState[comment.id] = comment
            })
            return getAllCommentState
        }
        case CREATE_COMMENT_PHOTO: {
            const createCommentState = {...state};
            createCommentState[action.comment.id] = action.comment
            return createCommentState
        }
        case EDIT_COMMENT_PHOTO: {
            const editCommentState = {...state};
            editCommentState[action.comment.id] = action.comment
            return editCommentState
        }
        case DELETE_COMMENT_PHOTO: {
            const removeCommentState = {...state};
            delete removeCommentState[action.commentId]
            return removeCommentState
        }
        default: {
            return state;
        }
    }
}

export default commentsReducer;
