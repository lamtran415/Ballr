const GET_USER_ALBUMS = 'albums/GET_USER_ALBUMS';
const LOAD_ALBUM_PHOTOS = 'albums/LOAD_ALBUM_PHOTOS';

// Action Creators
const loadAlbumsForUser = (albums) => ({
    type: GET_USER_ALBUMS,
    albums
})

const loadAlbumsPhoto = (albums) => ({
    type: LOAD_ALBUM_PHOTOS,
    albums
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
            console.log("FROM REDUCER =========>", loadAlbumPhotos)
            // loadAlbumPhotos[action.album.id] = action.album;
            return loadAlbumPhotos;
        }
        default: {
            return state;
        }
    }
}

export default albumsReducer;
