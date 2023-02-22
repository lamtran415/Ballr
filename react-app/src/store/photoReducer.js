const LOAD_ALL_PHOTOS = 'photos/LOAD_ALL_PHOTOS';
const LOAD_PLANT = 'photos/LOAD_PHOTO';
const CREATE_PLANT = 'photos/CREATE_PHOTO';
const EDIT_PLANT = 'photos/EDIT_PHOTO';
const DELETE_PLANT = 'photos/DELETE_PHOTO';

// Photos Action Creators
const loadAllPhotos = (photos) => ({
    type: LOAD_ALL_PHOTOS,
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

const initialState = {}

const photosReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_PHOTOS: {
            const allPhotoState = {};
            action.photos.photos.forEach(photo => {
                allPhotoState[photo.id] = photo;
            })
            return allPhotoState;
        }
        default: {
            return state
        }
    }
}

export default photosReducer;
