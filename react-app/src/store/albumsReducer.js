const GET_USER_ALBUMS = 'albums/GET_USER_ALBUMS';
const LOAD_ALBUM_PHOTOS = 'albums/LOAD_ALBUM_PHOTOS';
const CREATE_NEW_ALBUM = 'albums/CREATE_NEW_ALBUM'

// Action Creators
const loadAlbumsForUser = (albums) => ({
    type: GET_USER_ALBUMS,
    albums
})

const loadAlbumsPhoto = (album) => ({
    type: LOAD_ALBUM_PHOTOS,
    album
})

const createNewAlbum = (album) => ({
    type: CREATE_NEW_ALBUM,
    album
})

// Thunks
export const getUserAlbumsThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/photos/users/${userId}/albums`);

    if (res.ok) {
        const albumsFromUser = await res.json();
        dispatch(loadAlbumsForUser(albumsFromUser));
        return albumsFromUser
    }

    return res;
}

export const getUserAlbumDetailsThunk = (userId, albumId) => async (dispatch) => {
    const res = await fetch(`/api/photos/users/${userId}/albums/${albumId}`);

    if (res.ok) {
        const albumDetails = await res.json();
        dispatch(loadAlbumsPhoto(albumDetails));
        return albumDetails
    }
    return res;
}

export const createUserAlbumThunk = (userId, albumDetails) => async (dispatch) => {
    const res = await fetch(`/api/photos/users/${userId}/albums`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(albumDetails)
    })

    if (res.ok) {
        const newAlbum = await res.json();
        dispatch(createNewAlbum(newAlbum));
        return newAlbum;
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

const initialState = {};

const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_ALBUMS: {
            const getAllAlbumsState = {};
            action.albums.albums.forEach(album => {
                getAllAlbumsState[album.id] = album
            })
            return getAllAlbumsState;
        }
        case LOAD_ALBUM_PHOTOS: {
            const loadAlbumPhotos = {...state};
            loadAlbumPhotos[action.album.id] = action.album;
            return loadAlbumPhotos;
        }
        case CREATE_NEW_ALBUM: {
            const createNewAlbum = {...state};
            createNewAlbum[action.album.id] = action.album;
            return createNewAlbum;
        }
        default: {
            return state;
        }
    }
}

export default albumsReducer;
