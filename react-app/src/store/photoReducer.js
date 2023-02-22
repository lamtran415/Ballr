const LOAD_ALL_PHOTOS = 'photos/LOAD_ALL_PHOTOS';
const LOAD_PHOTO = 'photos/LOAD_PHOTO';
const CREATE_PHOTO = 'photos/CREATE_PHOTO';
const EDIT_PHOTO = 'photos/EDIT_PHOTO';
const DELETE_PHOTO = 'photos/DELETE_PHOTO';

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

const initialState = {}

const photosReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_PHOTOS: {
            const loadAllPhotos = {};
            action.photos.photos.forEach(photo => {
                loadAllPhotos[photo.id] = photo;
            })
            return loadAllPhotos;
        }
        case LOAD_PHOTO: {
            const loadPhotoById = {...state};
            loadPhotoById[action.photo.id] = action.photo;
            return loadPhotoById;
        }
        case CREATE_PHOTO: {
            const newPhotoState = {...state};
            newPhotoState[action.photo.id] = action.photo;
            console.log("FROM REDUCER =================> newPhotoState", newPhotoState)
            return newPhotoState;
        }
        default: {
            return state
        }
    }
}

export default photosReducer;
