const LOAD_ALL_PHOTOS = 'photos/LOAD_ALL_PHOTOS';
const LOAD_PHOTO = 'photos/LOAD_PHOTO';
const CREATE_PHOTO = 'photos/CREATE_PHOTO';
const EDIT_PHOTO = 'photos/EDIT_PHOTO';
const DELETE_PHOTO = 'photos/DELETE_PHOTO';
const LOAD_USER_PHOTOS = 'photos/LOAD_USER_PHOTOS'

// Photos Action Creators
const loadAllPhotos = (photos) => ({
    type: LOAD_ALL_PHOTOS,
    photos
})

const loadIndividualPhoto = (photo) => ({
    type: LOAD_PHOTO,
    photo
})

const createIndividualPhoto = (photo) => ({
    type: CREATE_PHOTO,
    photo
})

const editIndividualPhoto = (photo) => ({
    type: EDIT_PHOTO,
    photo
})

const deleteIndividualPhoto = (photo) => ({
    type: DELETE_PHOTO,
    photo
})

const loadUserPhotos = (photos) => ({
    type:LOAD_USER_PHOTOS,
    photos
})

// Photos Thunks
export const getAllPhotosThunk = () => async (dispatch) => {
    const res = await fetch('/api/photos')

    if (res.ok) {
        const photos = await res.json()
        dispatch(loadAllPhotos(photos))
        return photos
    }

    return res
}

export const getPhotoDetailsThunk = (photoId) => async (dispatch) => {
    const res = await fetch(`/api/photos/${photoId}`)

    if (res.ok) {
        const photo = await res.json();
        dispatch(loadIndividualPhoto(photo));
        return photo
    }

    return res;
}

export const createPhotoThunk = (photo) => async (dispatch) => {
    const res = await fetch('/api/photos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(photo)
    });

    if (res.ok) {
        const newPhoto = await res.json();
        dispatch(createIndividualPhoto(newPhoto));
        return newPhoto;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."]
    }

    return res;
}

export const editPhotoThunk = (photo, photoId) => async (dispatch) => {
    const res = await fetch(`/api/photos/${photoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(photo)
    });

    if (res.ok) {
        const editPhoto = await res.json();
        dispatch(editIndividualPhoto(editPhoto));
        return editPhoto
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."]
    }

    return res;
}

export const deletePhotoThunk = (photoId) => async (dispatch) => {
    const res = await fetch(`/api/photos/${photoId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(deleteIndividualPhoto(photoId))
    }

    return res;
}

export const loadUserPhotoThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/photos/users/${userId}`)

    if (res.ok) {
        const userPhotos = await res.json();
        dispatch(loadUserPhotos(userPhotos));
        return userPhotos;
    }

    return res;
}

const initialState = { allPhotos: {}, userPhotos: {}};

const photosReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_PHOTOS: {
            const loadAllPhotos = {allPhotos: {}, userPhotos: {}};
            action.photos.photos.forEach(photo => {
                loadAllPhotos.allPhotos[photo.id] = photo;
            })
            // console.log(action.photos.photos)
            return loadAllPhotos;
        }
        case LOAD_PHOTO: {
            const loadPhotoById = {...state};
            loadPhotoById.allPhotos[action.photo.id] = action.photo;
            return loadPhotoById;
        }
        case CREATE_PHOTO: {
            const newPhotoState = {...state};
            newPhotoState.allPhotos[action.photo.id] = action.photo;
            return newPhotoState;
        }
        case EDIT_PHOTO: {
            const editPhotoState = {...state};
            editPhotoState.allPhotos[action.photo.id] = action.photo;
            return editPhotoState;
        }
        case DELETE_PHOTO: {
            const deletePhotoState = {...state};
            delete deletePhotoState.allPhotos[action.photo.id];
            return deletePhotoState;
        }
        case LOAD_USER_PHOTOS: {
            const userObj = {...state, userPhotos: {}};
            action.photos.photos.forEach(photo => {
                userObj.userPhotos[photo.id] = photo;
            })
            return userObj
          }
        default: {
            return state;
        }
    }
}

export default photosReducer;
