// Define action types
const LOAD_ALL_PHOTOS = 'photos/LOAD_ALL_PHOTOS';
const LOAD_PHOTO = 'photos/LOAD_PHOTO';
const CREATE_PHOTO = 'photos/CREATE_PHOTO';
const EDIT_PHOTO = 'photos/EDIT_PHOTO';
const DELETE_PHOTO = 'photos/DELETE_PHOTO';
const LOAD_USER_PHOTOS = 'photos/LOAD_USER_PHOTOS'

// Photos Action Creators: Functions that create Redux action
// type field identifies the action type followed by parameter containing the data associated with the action
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

// Photos Thunks: Functions that handle asynchronous logic and dispatch actions
// Thunk for fetching all photos
export const getAllPhotosThunk = () => async (dispatch) => {
    // Make an asynchronous API request to fetch all photos
    const res = await fetch('/api/photos')

    if (res.ok) {
        // If the request is successful (status code 200), parse the response as JSON
        const photos = await res.json()
        // Dispatch the "loadAllPhotos" action with the fetched photos
        dispatch(loadAllPhotos(photos))
        // Return the fetched photos
        return photos
    }

    // If the request is not successful, return the response object
    return res
}

// Thunk for fetching details of a single photo
export const getPhotoDetailsThunk = (photoId) => async (dispatch) => {
    // Make an asynchronous API request to fetch details of a specific photo
    const res = await fetch(`/api/photos/${photoId}`)

    if (res.ok) {
        // If the request is successful (status code 200), parse the response as JSON
        const photo = await res.json()
        // Dispatch the "loadIndividualPhoto" action with the fetched photo
        dispatch(loadIndividualPhoto(photo))
        // Return the fetched photo
        return photo
    }

    // If the request is not successful, return the response object
    return res
}

// Thunk for creating a new photo
export const createPhotoThunk = (photo, url) => async (dispatch) => {
    // Make an asynchronous API request to create a new photo
    const res = await fetch('/api/photos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({...photo, url})
    });

    if (res.ok) {
        // If the request is successful (status code 200), parse the response as JSON
        const newPhoto = await res.json()
        // Dispatch the "createIndividualPhoto" action with the newly created photo
        dispatch(createIndividualPhoto(newPhoto))
        // Return the newly created photo
        return newPhoto
    } else if (res.status < 500) {
        // If the request fails with a status code less than 500 (typically client-side error), handle validation errors if present
        const data = await res.json()
        if (data.errors) {
            // Return the validation error messages
            return data.errors
        }
    } else {
        // If there is a server error (status code 500 or higher), return a generic error message
        return ["An error occurred. Please try again."]
    }

    // If none of the above conditions are met, return the response object
    return res
}

// Thunk for editing an existing photo
export const editPhotoThunk = (photo, photoId) => async (dispatch) => {
    // Make an asynchronous API request to edit an existing photo
    const res = await fetch(`/api/photos/${photoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(photo)
    });

    if (res.ok) {
        // If the request is successful (status code 200), parse the response as JSON
        const editPhoto = await res.json()
        // Dispatch the "editIndividualPhoto" action with the edited photo
        dispatch(editIndividualPhoto(editPhoto))
        // Return the edited photo
        return editPhoto
    } else if (res.status < 500) {
        // If the request fails with a status code less than 500, handle validation errors if present
        const data = await res.json()
        if (data.errors) {
            // Return the validation error messages
            return data.errors
        }
    } else {
        // If there is a server error, return a generic error message
        return ["An error occurred. Please try again."]
    }

    // If none of the above conditions are met, return the response object
    return res
}

// Thunk for deleting a photo
export const deletePhotoThunk = (photoId) => async (dispatch) => {
    // Make an asynchronous API request to delete a photo
    const res = await fetch(`/api/photos/${photoId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        // If the request is successful (status code 200), dispatch the "deleteIndividualPhoto" action
        dispatch(deleteIndividualPhoto(photoId))
    }

    // Return the response object
    return res
}

// Thunk for fetching photos specific to a user
export const loadUserPhotoThunk = (userId) => async (dispatch) => {
    // Make an asynchronous API request to fetch photos specific to a user
    const res = await fetch(`/api/photos/users/${userId}`)

    if (res.ok) {
        // If the request is successful (status code 200), parse the response as JSON
        const userPhotos = await res.json()
        // Dispatch the "loadUserPhotos" action with the fetched user-specific photos
        dispatch(loadUserPhotos(userPhotos))
        // Return the fetched user-specific photos
        return userPhotos
    }

    // If the request is not successful, return the response object
    return res
}

// Define the initial state for the photo reducer
const initialState = { allPhotos: {}, userPhotos: {}};

// Reducer: Handles how the state changes based on actions
const photosReducer = (state = initialState, action) => {
    switch (action.type) {
        // Handling different photo action types and updating the state

        case LOAD_ALL_PHOTOS: {
            // Create a new object to update the state
            const loadAllPhotos = { allPhotos: {}, userPhotos: {} };
            action.photos.photos.forEach(photo => {
                // Populate the "allPhotos" object with photos using their IDs as keys
                loadAllPhotos.allPhotos[photo.id] = photo;
            });
            // Return the updated state
            return loadAllPhotos;
        }

        case LOAD_PHOTO: {
            // Create a new object by cloning the existing state
            const loadPhotoById = { ...state };
            // Update the "allPhotos" object with the new photo using its ID as the key
            loadPhotoById.allPhotos[action.photo.id] = action.photo;
            // Return the updated state
            return loadPhotoById;
        }

        case CREATE_PHOTO: {
            // Create a new object by cloning the existing state
            const newPhotoState = { ...state };
            // Add the new photo to the "allPhotos" object using its ID as the key
            newPhotoState.allPhotos[action.photo.id] = action.photo;
            // Return the updated state
            return newPhotoState;
        }

        case EDIT_PHOTO: {
            // Create a new object by cloning the existing state
            const editPhotoState = { ...state };
            // Update the "allPhotos" object with the edited photo using its ID as the key
            editPhotoState.allPhotos[action.photo.id] = action.photo;
            // Return the updated state
            return editPhotoState;
        }

        case DELETE_PHOTO: {
            // Create a new object by cloning the existing state
            const deletePhotoState = { ...state };
            // Remove the deleted photo from the "allPhotos" object
            delete deletePhotoState.allPhotos[action.photo.id];
            // Return the updated state
            return deletePhotoState;
        }

        case LOAD_USER_PHOTOS: {
            // Create a new object by cloning the existing state, including userPhotos
            const userObj = { ...state, userPhotos: {} };
            action.photos.photos.forEach(photo => {
                // Populate the "userPhotos" object with user-specific photos using their IDs as keys
                userObj.userPhotos[photo.id] = photo;
            });
            // Return the updated state
            return userObj;
        }

        default: {
            // If the action type doesn't match any cases, return the current state
            return state;
        }
    }
}

export default photosReducer;
