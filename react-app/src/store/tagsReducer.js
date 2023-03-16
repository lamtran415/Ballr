const GET_PHOTO_TAGS = 'tags/GET_PHOTO_TAGS';
const CREATE_PHOTO_TAGS = 'tags/CREATE_PHOTO_TAGS';
const DELETE_PHOTO_TAGS = 'tags/DELETE_PHOTO_TAGS';

// Action Creators
const loadTagsforPhoto = (tags) => ({
    type: GET_PHOTO_TAGS,
    tags
})

const createNewTag = (tag) => ({
    type: CREATE_PHOTO_TAGS,
    tag
})

const deletePhotoTag = (tagId) => ({
    type: DELETE_PHOTO_TAGS,
    tagId
})

export const loadTagsforPhotoThunk = (photoId) => async (dispatch) => {
    const res = await fetch(`/api/photos/${photoId}/tags`)

    if (res.ok) {
      const tags = await res.json();
      dispatch(loadTagsforPhoto(tags));
      return tags;
    }

    return res;
}

export const createNewTagThunk = (photoId, tagDetails) => async (dispatch) => {
    const res = await fetch(`/api/photos/${photoId}/tags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(tagDetails)
    })

    if (res.ok) {
        const newTag = await res.json()
        dispatch(createNewTag(newTag))
        // return newTag
    }

    return res;
}

export const deletePhotoTagThunk = (photoId, tagId) => async (dispatch) => {
    const res = await fetch(`/api/photos/${photoId}/tags/${tagId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(deletePhotoTag(tagId))
    }

    return res;
}

const initialState = {};

const tagsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PHOTO_TAGS: {
            const getAllTagsState = {};
            action.tags.tags.forEach(tag => {
                getAllTagsState[tag.id] = tag
            })
            return getAllTagsState;
        }
        case CREATE_PHOTO_TAGS: {
            const createNewTag = {...state};
            createNewTag[action.tag.id] = action.tag
            return createNewTag
        }
        case DELETE_PHOTO_TAGS: {
            const removePhotoTag = {...state};
            delete removePhotoTag[action.tagId]
            return removePhotoTag;
        }
        default: {
            return state;
        }
    }
}

export default tagsReducer;
