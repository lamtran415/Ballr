const GET_USER_FAVORITES = 'favorites/GET_USER_FAVORITES'
const ADD_USER_FAVORITES = 'favorites/ADD_USER_FAVORITES'
const DELETE_USER_FAVORITES = 'favorites/DELETE_USER_FAVORITES'

// Action Creators
const loadFavoritesForUser = (favorites) => ({
    type: GET_USER_FAVORITES,
    favorites
})

const addNewFavorite = (favorite) => ({
    type: ADD_USER_FAVORITES,
    favorite
})

const deleteUserFavorite = (favoriteId) => ({
    type: DELETE_USER_FAVORITES,
    favoriteId
})

// Thunks
export const getUserFavoritesThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/photos/users/${userId}/favorites`);

    if (res.ok) {
        const favoritesFromUser = await res.json()
        dispatch(loadFavoritesForUser(favoritesFromUser));
        return favoritesFromUser
    }

    return res
}


const initialState = {}

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_FAVORITES: {
            const getAllFavoritesState = {};
            action.favorites.favorites.forEach(favorite => {
                getAllFavoritesState[favorite.id] = favorite
            })
            return getAllFavoritesState;
        }
        default: {
            return state;
        }
    }
}

export default favoritesReducer;
